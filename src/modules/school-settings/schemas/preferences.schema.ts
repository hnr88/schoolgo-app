import { z } from 'zod';
import { SCHOOL_SETTINGS_LOCALES } from '@/modules/school-settings/constants/school-settings.constants';

export const schoolPreferencesSchema = z.object({
  language: z.enum(SCHOOL_SETTINGS_LOCALES),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
  }),
});

export type SchoolPreferencesValues = z.infer<typeof schoolPreferencesSchema>;
