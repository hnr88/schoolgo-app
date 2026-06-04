import { z } from 'zod';
import { SCHOOL_MESSAGE_MAX_LENGTH } from '@/modules/school-applications/constants/school-message.constants';

export const schoolMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'composerRequired')
    .max(SCHOOL_MESSAGE_MAX_LENGTH, 'charCountExceeded'),
});

export type SchoolMessageFormValues = z.infer<typeof schoolMessageSchema>;
