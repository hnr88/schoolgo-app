import type { z } from 'zod';
import type {
  schoolNoteAuthorSchema,
  schoolNoteItemSchema,
  schoolNotesMetaSchema,
  schoolNotesResponseSchema,
} from '@/modules/school-notes/schemas/school-note.schema';

export type SchoolNoteAuthor = z.infer<typeof schoolNoteAuthorSchema>;

export type SchoolNote = z.infer<typeof schoolNoteItemSchema>;

export type SchoolNotesMeta = z.infer<typeof schoolNotesMetaSchema>;

export type SchoolNotesResponse = z.infer<typeof schoolNotesResponseSchema>;
