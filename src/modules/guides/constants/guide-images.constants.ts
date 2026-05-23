import { generateGradientPlaceholder } from '@/lib/schools/generate-school-placeholder';

export const GUIDE_IMAGES = {
  'choose-a-school': {
    hero: generateGradientPlaceholder('guide-choose-a-school-hero'),
    sections: [
      generateGradientPlaceholder('guide-choose-a-school-s1'),
      generateGradientPlaceholder('guide-choose-a-school-s2'),
    ],
    card: generateGradientPlaceholder('guide-choose-a-school-card'),
  },
  'accommodation': {
    hero: generateGradientPlaceholder('guide-accommodation-hero'),
    sections: [
      generateGradientPlaceholder('guide-accommodation-s1'),
      generateGradientPlaceholder('guide-accommodation-s2'),
    ],
    card: generateGradientPlaceholder('guide-accommodation-card'),
  },
  'english-requirements': {
    hero: generateGradientPlaceholder('guide-english-requirements-hero'),
    sections: [
      generateGradientPlaceholder('guide-english-requirements-s1'),
      generateGradientPlaceholder('guide-english-requirements-s2'),
    ],
    card: generateGradientPlaceholder('guide-english-requirements-card'),
  },
  'health-cover': {
    hero: generateGradientPlaceholder('guide-health-cover-hero'),
    sections: [
      generateGradientPlaceholder('guide-health-cover-s1'),
      generateGradientPlaceholder('guide-health-cover-s2'),
    ],
    card: generateGradientPlaceholder('guide-health-cover-card'),
  },
  'high-school-preparation': {
    hero: generateGradientPlaceholder('guide-high-school-preparation-hero'),
    sections: [
      generateGradientPlaceholder('guide-high-school-preparation-s1'),
      generateGradientPlaceholder('guide-high-school-preparation-s2'),
    ],
    card: generateGradientPlaceholder('guide-high-school-preparation-card'),
  },
  'school-fees': {
    hero: generateGradientPlaceholder('guide-school-fees-hero'),
    sections: [
      generateGradientPlaceholder('guide-school-fees-s1'),
      generateGradientPlaceholder('guide-school-fees-s2'),
    ],
    card: generateGradientPlaceholder('guide-school-fees-card'),
  },
  'school-types': {
    hero: generateGradientPlaceholder('guide-school-types-hero'),
    sections: [
      generateGradientPlaceholder('guide-school-types-s1'),
      generateGradientPlaceholder('guide-school-types-s2'),
    ],
    card: generateGradientPlaceholder('guide-school-types-card'),
  },
  'student-visa': {
    hero: generateGradientPlaceholder('guide-student-visa-hero'),
    sections: [
      generateGradientPlaceholder('guide-student-visa-s1'),
      generateGradientPlaceholder('guide-student-visa-s2'),
    ],
    card: generateGradientPlaceholder('guide-student-visa-card'),
  },
  'student-welfare': {
    hero: generateGradientPlaceholder('guide-student-welfare-hero'),
    sections: [
      generateGradientPlaceholder('guide-student-welfare-s1'),
      generateGradientPlaceholder('guide-student-welfare-s2'),
    ],
    card: generateGradientPlaceholder('guide-student-welfare-card'),
  },
  'term-dates-intakes': {
    hero: generateGradientPlaceholder('guide-term-dates-intakes-hero'),
    sections: [
      generateGradientPlaceholder('guide-term-dates-intakes-s1'),
      generateGradientPlaceholder('guide-term-dates-intakes-s2'),
    ],
    card: generateGradientPlaceholder('guide-term-dates-intakes-card'),
  },
} as const;
