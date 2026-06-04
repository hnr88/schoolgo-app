import { z } from 'zod';
import { PARENT_DECLINE_NOTE_MAX_LENGTH } from '@/modules/applications/constants/parent-offer.constants';

export const parentDeclineOfferSchema = z.object({
  declineNote: z
    .string()
    .trim()
    .max(PARENT_DECLINE_NOTE_MAX_LENGTH, 'declineNoteTooLong')
    .optional(),
});

export type ParentDeclineOfferFormValues = z.infer<typeof parentDeclineOfferSchema>;
