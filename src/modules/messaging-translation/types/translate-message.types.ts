import type { z } from 'zod';
import type {
  translateMessageResponseSchema,
  translateMessageResultSchema,
} from '@/modules/messaging-translation/schemas/translate-message.schema';

export type TranslateMessageResult = z.infer<typeof translateMessageResultSchema>;

export type TranslateMessageResponse = z.infer<typeof translateMessageResponseSchema>;

export interface TranslateMessageButtonProps {
  messageDocumentId: string;
  content: string;
}
