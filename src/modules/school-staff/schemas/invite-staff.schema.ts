import { z } from 'zod';

export const inviteStaffSchema = z.object({
  email: z.string().trim().min(1).email(),
  permissionLevel: z.enum(['admin', 'staff']),
});

export type InviteStaffFormValues = z.infer<typeof inviteStaffSchema>;
