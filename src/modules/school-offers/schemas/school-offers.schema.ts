import { z } from 'zod';
import { schoolApplicationListItemSchema } from '@/modules/school-applications';

export const schoolOffersListResponseSchema = z.object({
  data: z.array(schoolApplicationListItemSchema),
});
