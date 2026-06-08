import type { ProfileValues } from '@/modules/parent-settings';
import type { OnboardingStepId } from '@/modules/parent-onboarding/types/parent-onboarding.types';

export const ONBOARDING_STEP_IDS = ['identity', 'contact', 'address', 'emergency'] as const;

export const STEP_FIELDS: Record<OnboardingStepId, (keyof ProfileValues)[]> = {
  identity: ['firstName', 'lastName', 'relationshipToStudent', 'occupation'],
  contact: ['phone', 'secondaryPhone', 'preferredContactMethod'],
  address: ['addressLine', 'city', 'stateRegion', 'postalCode', 'countryOfResidence'],
  emergency: ['emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelationship'],
};

export const STEP_TITLE_KEYS: Record<OnboardingStepId, string> = {
  identity: 'stepIdentityTitle',
  contact: 'stepContactTitle',
  address: 'stepAddressTitle',
  emergency: 'stepEmergencyTitle',
};

export const STEP_DESCRIPTION_KEYS: Record<OnboardingStepId, string> = {
  identity: 'stepIdentityDescription',
  contact: 'stepContactDescription',
  address: 'stepAddressDescription',
  emergency: 'stepEmergencyDescription',
};
