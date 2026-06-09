import { z } from 'zod';

export const schoolNoteSchema = z.object({
  content: z.string().trim().min(1),
});

export type SchoolNoteInput = z.infer<typeof schoolNoteSchema>;

export const schoolNoteAuthorSchema = z.object({
  documentId: z.string(),
  roleTitle: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  username: z.string().nullable(),
});

export const schoolNoteItemSchema = z.object({
  documentId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  author: schoolNoteAuthorSchema.nullable(),
});

export const schoolNotesMetaSchema = z.object({
  me: z
    .object({
      staffDocumentId: z.string(),
      isAdmin: z.boolean(),
    })
    .optional(),
});

export const schoolNotesResponseSchema = z.object({
  data: z.array(schoolNoteItemSchema),
  meta: schoolNotesMetaSchema,
});

export const createSchoolNoteResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
    content: z.string(),
    createdAt: z.string(),
  }),
});

export const deleteSchoolNoteResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
  }),
});
