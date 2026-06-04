import { z } from 'zod';
import { PARENT_MESSAGE_MAX_LENGTH } from '@/modules/applications/constants/parent-message.constants';

export const parentMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'composerRequired')
    .max(PARENT_MESSAGE_MAX_LENGTH, 'charCountExceeded'),
});

export type ParentMessageFormValues = z.infer<typeof parentMessageSchema>;
