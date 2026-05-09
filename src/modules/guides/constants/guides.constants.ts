export const GUIDE_SLUGS = [
  'accommodation',
  'choose-a-school',
  'english-requirements',
  'health-cover',
  'high-school-preparation',
  'school-fees',
  'school-types',
  'student-visa',
  'student-welfare',
  'term-dates-intakes',
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];
