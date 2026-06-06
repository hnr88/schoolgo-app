import { z } from 'zod';

export const reminderFormSchema = z.object({
  title: z.string().trim().min(1, 'required').max(120, 'tooLong'),
  date: z.string().min(1, 'required'),
  time: z.string().optional(),
  note: z.string().max(500, 'tooLong').optional(),
});

export type ReminderFormValues = z.infer<typeof reminderFormSchema>;
