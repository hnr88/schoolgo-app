import { z } from 'zod';

export const GENDER_VALUES = ['male', 'female', 'other', 'prefer_not_to_say'] as const;
export const CONTACT_CHANNEL_VALUES = ['whatsapp', 'wechat', 'email', 'sms'] as const;

export const TARGET_YEAR_MIN = 2000;
export const TARGET_YEAR_MAX = new Date().getFullYear() + 10;
export const DOB_MIN_YEAR = 1900;

type SchemaTranslator = (key: string, values?: Record<string, string | number>) => string;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isValidDate(value: string): boolean {
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

export function createParentStudentSchema(t: SchemaTranslator) {
  const optionalEmail = (message: string) =>
    z.union([z.literal(''), z.string().email({ message })]).optional();

  const dateOfBirth = z
    .string()
    .optional()
    .or(z.literal(''))
    .superRefine((value, ctx) => {
      if (!value) return;
      if (!isValidDate(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('dobInvalid') });
        return;
      }
      if (value > todayIso()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('dobFuture') });
        return;
      }
      const year = Number(value.slice(0, 4));
      if (year < DOB_MIN_YEAR) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('dobTooOld') });
      }
    });

  const targetEntryYear = z
    .string()
    .min(1, { message: t('targetYearRequired') })
    .superRefine((value, ctx) => {
      const trimmed = value.trim();
      if (!/^\d{4}$/.test(trimmed)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('targetYearInvalid') });
        return;
      }
      const year = Number(trimmed);
      if (year < TARGET_YEAR_MIN || year > TARGET_YEAR_MAX) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('targetYearRange', { min: TARGET_YEAR_MIN, max: TARGET_YEAR_MAX }),
        });
      }
    });

  return z.object({
    firstName: z
      .string()
      .min(1, { message: t('firstNameRequired') })
      .max(100, { message: t('firstNameMax') }),
    lastName: z
      .string()
      .min(1, { message: t('lastNameRequired') })
      .max(100, { message: t('lastNameMax') }),
    email: optionalEmail(t('emailInvalid')),
    dateOfBirth,
    gender: z.enum(GENDER_VALUES).optional(),
    nationality: z
      .string()
      .min(1, { message: t('nationalityRequired') })
      .max(100, { message: t('nationalityMax') }),
    passportNumber: z
      .string()
      .max(50, { message: t('passportMax') })
      .optional()
      .or(z.literal('')),
    currentSchool: z
      .string()
      .max(255, { message: t('currentSchoolMax') })
      .optional()
      .or(z.literal('')),
    currentYearLevel: z
      .string()
      .max(20, { message: t('currentYearMax') })
      .optional()
      .or(z.literal('')),
    targetEntryYear,
    targetEntryTerm: z.string().min(1, { message: t('targetTermRequired') }).max(50),
    parentGuardianName: z
      .string()
      .min(1, { message: t('parentNameRequired') })
      .max(200, { message: t('parentNameMax') }),
    parentGuardianEmail: optionalEmail(t('parentEmailInvalid')),
    parentGuardianPhone: z
      .string()
      .min(1, { message: t('parentPhoneRequired') })
      .max(50, { message: t('parentPhoneMax') }),
    parentGuardianWechat: z
      .string()
      .max(100, { message: t('parentWechatMax') })
      .optional()
      .or(z.literal('')),
    preferredContactChannel: z.enum(CONTACT_CHANNEL_VALUES, {
      message: t('contactChannelRequired'),
    }),
    photo: z.number().int().positive().nullable().optional(),
    voiceIntro: z.number().int().positive().nullable().optional(),
  });
}

const optionalEmail = z.string().email().optional().or(z.literal(''));

export const parentStudentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: optionalEmail,
  dateOfBirth: z.string().optional().or(z.literal('')),
  gender: z.enum(GENDER_VALUES).optional(),
  nationality: z.string().min(1).max(100),
  passportNumber: z.string().max(50).optional().or(z.literal('')),
  currentSchool: z.string().max(255).optional().or(z.literal('')),
  currentYearLevel: z.string().max(20).optional().or(z.literal('')),
  targetEntryYear: z.string().min(1).max(20),
  targetEntryTerm: z.string().min(1).max(50),
  parentGuardianName: z.string().min(1).max(200),
  parentGuardianEmail: optionalEmail,
  parentGuardianPhone: z.string().min(1).max(50),
  parentGuardianWechat: z.string().max(100).optional().or(z.literal('')),
  preferredContactChannel: z.enum(CONTACT_CHANNEL_VALUES),
  photo: z.number().int().positive().nullable().optional(),
  voiceIntro: z.number().int().positive().nullable().optional(),
});

export type ParentStudentFormValues = z.infer<typeof parentStudentSchema>;

export const PARENT_WIZARD_STEP_IDS = ['personal', 'education', 'guardian', 'media', 'review'] as const;

export type ParentWizardStepId = (typeof PARENT_WIZARD_STEP_IDS)[number];

export const STEP_FIELDS: Record<ParentWizardStepId, (keyof ParentStudentFormValues)[]> = {
  personal: ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'nationality', 'passportNumber'],
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
