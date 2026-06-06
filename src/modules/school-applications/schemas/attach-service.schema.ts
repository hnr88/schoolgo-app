import { z } from 'zod';

export const attachServiceSchema = z.object({
  serviceCatalogItem: z.string().trim().min(1, 'required'),
  quantity: z.number().int().min(1).default(1),
  dueDate: z
    .string()
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      return trimmed ? trimmed : undefined;
    }),
});

export type AttachServiceFormValues = z.infer<typeof attachServiceSchema>;
