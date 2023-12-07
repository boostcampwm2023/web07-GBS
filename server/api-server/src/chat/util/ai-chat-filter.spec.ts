import { AIChatFilter } from './ai-chat-filter';

describe('AIChatFilter', () => {
  let aiChatFilter: AIChatFilter;

  beforeEach(async () => {
    aiChatFilter = new AIChatFilter();
  });

  it('filter() Test', async () => {
    const message = '니가 뭘 안다고 그따위로 얘기해?';

    const result = await aiChatFilter.filter(message);

    expect(result.filteredByAI).toBe(true);
  });
});
