import { z } from 'zod';

export const schoolDeleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required to delete your account'),
});

export type SchoolDeleteAccountValues = z.infer<typeof schoolDeleteAccountSchema>;
