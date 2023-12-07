import { Injectable } from '@nestjs/common';
import { AIChatPayload } from '../dto/ai-chat-payload.dto';
import axios from 'axios';

const REQUEST_CONFIG = {
  headers: {
    'X-NCP-CLOVASTUDIO-API-KEY': process.env.AI_CHAT_FILTER_API_KEY,
    'X-NCP-APIGW-API-KEY': process.env.AI_CHAT_FILTER_GATEWAY_KEY,
    'X-NCP-CLOVASTUDIO-REQUEST-ID': process.env.AI_CHAT_FILTER_REQUEST_ID,
    'Content-Type': 'application/json',
  },
};
const PRESET_TEXT =
  '주어진 원문장을 순화하시오.\n\n원문장: 저 놈 말을 더럽게 안들어\n순화된 문장: 저 사람은 남의 말을 안 들어.\n###\n원문장: 밤에 별빛 개이쁘더라.\n순화된 문장: 밤에 별빛이 아름답네요.\n###\n원문장: ';
const getRequestData = (message: string) => ({
  text: PRESET_TEXT + message + '\n',
  start: '\n순화된 문장:',
  restart: '###\n원문장:',
  includeTokens: true,
  topP: 0.8,
  topK: 0,
  maxTokens: 100,
  temperature: 0.3,
  repeatPenalty: 5.0,
  stopBefore: ['###', '원문장:', '순화된 문장:', '###'],
  includeAiFilters: true,
});

@Injectable()
export class AIChatFilter {
  async filter(message: string): Promise<AIChatPayload> {
    const result = await axios.post(
      process.env.AI_CHAT_FILTER_URL,
      getRequestData(message),
      REQUEST_CONFIG,
    );

    if (result?.data?.status.code !== '20000') {
      return {
        filteredByAI: false,
        successfullyFiltered: false,
        message,
      };
    }

    if (result.data.result.aiFilter.some(({ score }) => score === '0')) {
      return {
        filteredByAI: true,
        successfullyFiltered: false,
        message: '부적절한 채팅으로 숨겨졌습니다.',
      };
    }

    return {
      filteredByAI: true,
      successfullyFiltered: true,
      message: result.data.result.outputTokens
        .join('')
        .replace('\n###', '')
        .trim(),
    };
  }
}
