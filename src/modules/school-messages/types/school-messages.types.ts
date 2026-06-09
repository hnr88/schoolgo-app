import type { z } from 'zod';
import type {
  conversationLastMessageSchema,
  conversationRowSchema,
  conversationSenderRoleSchema,
  conversationsMetaSchema,
  conversationsResponseSchema,
} from '@/modules/school-messages/schemas/school-conversations.schema';

export type ConversationSenderRole = z.infer<typeof conversationSenderRoleSchema>;
export type ConversationLastMessage = z.infer<typeof conversationLastMessageSchema>;
export type ConversationRow = z.infer<typeof conversationRowSchema>;
export type ConversationsMeta = z.infer<typeof conversationsMetaSchema>;
export type ConversationsResponse = z.infer<typeof conversationsResponseSchema>;
