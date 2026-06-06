import type {
  TestCatalogMode,
  TestCatalogSkill,
} from '@/modules/test-results/types/test-catalog.types';

export const CATALOG_MODE_LABELS: Record<TestCatalogMode, string> = {
  practice_prep: 'modePracticePrep',
  placement: 'modePlacement',
};

export const CATALOG_SKILL_LABELS: Record<TestCatalogSkill, string> = {
  reading: 'skillReading',
  writing: 'skillWriting',
  listening: 'skillListening',
  speaking: 'skillSpeaking',
  integrated: 'skillIntegrated',
  maths: 'skillMaths',
  nonverbal: 'skillNonverbal',
};
