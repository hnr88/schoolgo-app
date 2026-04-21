import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().email(),
  password: z.string().min(6),
});

export type LoginValues = z.infer<typeof loginSchema>;
