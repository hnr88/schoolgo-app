import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().max(100).optional(),
  currentSchool: z.string().max(255).optional(),
  currentYearLevel: z.string().max(20).optional(),
  targetEntryYear: z.string().max(20).optional(),
  targetEntryTerm: z.string().max(50).optional(),
  parentGuardianName: z.string().max(200).optional(),
  parentGuardianEmail: z.string().email().optional().or(z.literal('')),
  parentGuardianPhone: z.string().max(50).optional(),
  parentGuardianWechat: z.string().max(100).optional(),
  agentNotes: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
