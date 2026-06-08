import { z } from 'zod';
import {
  PARENT_CONTACT_METHOD_OPTIONS,
  PARENT_RELATIONSHIP_OPTIONS,
  PHONE_PATTERN,
} from '@/modules/parent-settings/constants/parent-settings.constants';

const relationshipValues = PARENT_RELATIONSHIP_OPTIONS as readonly string[];
const contactMethodValues = PARENT_CONTACT_METHOD_OPTIONS as readonly string[];

const requiredPhone = z
  .string()
  .trim()
  .min(1, 'phoneRequired')
  .max(50)
  .refine((value) => PHONE_PATTERN.test(value), 'phoneInvalid');

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'firstNameRequired').max(100),
  lastName: z.string().trim().min(1, 'lastNameRequired').max(100),
  relationshipToStudent: z
    .string()
    .refine((value) => relationshipValues.includes(value), 'relationshipRequired'),
  occupation: z.string().trim().max(120),
  phone: requiredPhone,
  secondaryPhone: z
    .string()
    .trim()
    .max(50)
    .refine((value) => value === '' || PHONE_PATTERN.test(value), 'phoneInvalid'),
  preferredContactMethod: z
    .string()
    .refine((value) => contactMethodValues.includes(value), 'contactMethodRequired'),
  addressLine: z.string().trim().min(1, 'addressRequired').max(255),
  city: z.string().trim().min(1, 'cityRequired').max(120),
  stateRegion: z.string().trim().max(120),
  postalCode: z.string().trim().max(32),
  countryOfResidence: z.string().trim().min(1, 'countryRequired').max(2),
  emergencyContactName: z.string().trim().min(1, 'emergencyNameRequired').max(120),
  emergencyContactPhone: requiredPhone,
  emergencyContactRelationship: z.string().trim().max(80),
});

export type ProfileValues = z.infer<typeof profileSchema>;
