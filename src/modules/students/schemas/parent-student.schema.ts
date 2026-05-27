import { z } from 'zod';

export const GENDER_VALUES = ['male', 'female', 'other', 'prefer_not_to_say'] as const;
export const CONTACT_CHANNEL_VALUES = ['whatsapp', 'wechat', 'email', 'sms'] as const;

const optionalEmail = z.string().email().optional().or(z.literal(''));

export const parentStudentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: optionalEmail,
  dateOfBirth: z.string().optional().or(z.literal('')),
  gender: z.enum(GENDER_VALUES).optional(),
  nationality: z.string().min(1).max(100),
  currentSchool: z.string().max(255).optional().or(z.literal('')),
  currentYearLevel: z.string().max(20).optional().or(z.literal('')),
  targetEntryYear: z.string().min(1).max(20),
  targetEntryTerm: z.string().min(1).max(50),
  parentGuardianName: z.string().min(1).max(200),
  parentGuardianEmail: optionalEmail,
  parentGuardianPhone: z.string().min(1).max(50),
  parentGuardianWechat: z.string().max(100).optional().or(z.literal('')),
  preferredContactChannel: z.enum(CONTACT_CHANNEL_VALUES),
  photo: z.number().int().positive().optional(),
  voiceIntro: z.number().int().positive().optional(),
});

export type ParentStudentFormValues = z.infer<typeof parentStudentSchema>;

export const PARENT_WIZARD_STEP_IDS = ['personal', 'education', 'guardian', 'media', 'review'] as const;

export type ParentWizardStepId = (typeof PARENT_WIZARD_STEP_IDS)[number];

export const STEP_FIELDS: Record<ParentWizardStepId, (keyof ParentStudentFormValues)[]> = {
  personal: ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'nationality'],
  education: ['currentSchool', 'currentYearLevel', 'targetEntryYear', 'targetEntryTerm'],
  guardian: [
    'parentGuardianName',
    'parentGuardianPhone',
    'parentGuardianEmail',
    'parentGuardianWechat',
    'preferredContactChannel',
  ],
  media: ['photo', 'voiceIntro'],
  review: [],
};
