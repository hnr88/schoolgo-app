import { z } from 'zod';

export const schoolNoteSchema = z.object({
  content: z.string().trim().min(1),
});

export type SchoolNoteInput = z.infer<typeof schoolNoteSchema>;
