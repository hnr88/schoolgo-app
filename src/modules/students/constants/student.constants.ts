export const STUDENT_STATUS_OPTIONS = ['active', 'archived', 'enrolled'] as const;

export const GENDER_OPTIONS = ['male', 'female', 'other', 'prefer_not_to_say'] as const;

export const GENDER_LABEL_KEYS: Record<(typeof GENDER_OPTIONS)[number], string> = {
  male: 'genderMale',
  female: 'genderFemale',
  other: 'genderOther',
  prefer_not_to_say: 'genderPreferNotToSay',
};

export const YEAR_LEVEL_OPTIONS = [
  'Prep', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12',
] as const;
