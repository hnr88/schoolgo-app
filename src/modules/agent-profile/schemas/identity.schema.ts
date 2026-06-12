import { z } from 'zod';

const optionalText = (max: number, maxKey: string) =>
  z.string().trim().max(max, maxKey).optional().or(z.literal(''));

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Identity & basics editor schema (Task 087). Validates the displayName +
 * branding + legal-identity scalar slice the agent edits in the builder.
 * `yearEstablished` stays a string field (number input) and is range-checked;
 * empty is allowed. Error messages are i18n keys resolved under the
 * `AgentProfileBuilder` namespace.
 */
export const identitySchema = z.object({
  displayName: z.string().trim().min(1, 'displayNameRequired').max(255, 'displayNameMax'),
  headline: optionalText(160, 'headlineMax'),
  tagline: optionalText(160, 'taglineMax'),
  publicSummary: z.string().trim().max(2000, 'publicSummaryMax').optional().or(z.literal('')),
  legalEntityName: optionalText(255, 'legalEntityNameMax'),
  tradingName: optionalText(255, 'tradingNameMax'),
  directorName: optionalText(255, 'directorNameMax'),
  countryOfRegistration: optionalText(100, 'countryOfRegistrationMax'),
  yearEstablished: z
    .string()
    .trim()
    .regex(/^\d{4}$/, 'yearEstablishedInvalid')
    .refine((value) => Number(value) >= 1800 && Number(value) <= CURRENT_YEAR, 'yearEstablishedRange')
    .optional()
    .or(z.literal('')),
  website: optionalText(255, 'websiteMax'),
  phone: optionalText(50, 'phoneMax'),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;
