import type { ConversationSummary } from '@/modules/applications/types/conversation.types';

export function filterConversations(
  conversations: ConversationSummary[],
  search: string,
): ConversationSummary[] {
  const query = search.trim().toLowerCase();
  if (!query) return conversations;

  return conversations.filter((conversation) => {
    const haystack = [
      conversation.schoolName ?? '',
      conversation.studentName ?? '',
      conversation.lastMessage.preview,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
}
