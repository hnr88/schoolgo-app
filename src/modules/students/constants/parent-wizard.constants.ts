import {
  CONTACT_CHANNEL_VALUES,
  GENDER_VALUES,
  PARENT_WIZARD_STEP_IDS,
  type ParentWizardStepId,
} from '@/modules/students/schemas/parent-student.schema';

export const PARENT_WIZARD_STEP_TITLE_KEYS: Record<ParentWizardStepId, string> = {
  personal: 'stepPersonal',
  education: 'stepEducation',
  guardian: 'stepGuardian',
  media: 'stepMedia',
  review: 'stepReview',
};

export const PARENT_WIZARD_STEPS = PARENT_WIZARD_STEP_IDS;

export const PARENT_GENDER_OPTIONS = GENDER_VALUES;

export const PARENT_CONTACT_CHANNEL_OPTIONS = CONTACT_CHANNEL_VALUES;

export const PARENT_TARGET_TERM_OPTIONS = ['Term 1', 'Term 2', 'Term 3', 'Term 4'] as const;

export const PARENT_PHOTO_MAX_MB = 15;

export const PARENT_VOICE_INTRO_MAX_MB = 10;

export const DOB_MAX_DATE = new Date().toISOString().slice(0, 10);
