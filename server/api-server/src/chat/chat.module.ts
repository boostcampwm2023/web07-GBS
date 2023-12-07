import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { AIChatFilter } from './util/ai-chat-filter';

@Module({
  imports: [UsersModule],
  providers: [ChatGateway, AIChatFilter],
  exports: [ChatGateway],
})
export class ChatModule {}
