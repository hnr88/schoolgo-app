import { z } from 'zod';

export const SAVE_SEARCH_NAME_MAX = 100;

export interface SaveSearchMessages {
  required: string;
  tooLong: string;
}

export function buildSaveSearchFormSchema(messages: SaveSearchMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: messages.required })
      .max(SAVE_SEARCH_NAME_MAX, { message: messages.tooLong }),
  });
}

export type SaveSearchFormValues = z.infer<ReturnType<typeof buildSaveSearchFormSchema>>;
