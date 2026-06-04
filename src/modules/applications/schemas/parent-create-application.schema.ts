import { z } from 'zod';

export const parentCreateApplicationSchema = z.object({
  student: z.string().trim().min(1, 'studentRequired'),
  school: z.string().trim().min(1, 'schoolRequired'),
});

export type ParentCreateApplicationFormValues = z.infer<typeof parentCreateApplicationSchema>;
