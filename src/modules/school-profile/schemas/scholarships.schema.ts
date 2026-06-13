import { z } from 'zod';

export function createScholarshipsSchema() {
  return z.object({
    scholarshipAvailable: z.boolean(),
  });
}

export type ScholarshipsValues = z.infer<ReturnType<typeof createScholarshipsSchema>>;
