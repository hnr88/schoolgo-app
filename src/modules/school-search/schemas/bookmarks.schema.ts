import { z } from 'zod';

export const createBookmarkSchema = z.object({
  schoolId: z.string().regex(/^[a-z0-9]{1,32}$/i, 'invalid schoolId'),
});

export type CreateBookmarkInputDto = z.infer<typeof createBookmarkSchema>;
