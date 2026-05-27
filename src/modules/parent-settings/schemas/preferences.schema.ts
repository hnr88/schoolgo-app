import { z } from 'zod';
import { SETTINGS_LOCALES } from '@/modules/parent-settings/constants/parent-settings.constants';

export const preferencesSchema = z.object({
  language: z.enum(SETTINGS_LOCALES),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
  }),
});

export type PreferencesValues = z.infer<typeof preferencesSchema>;
