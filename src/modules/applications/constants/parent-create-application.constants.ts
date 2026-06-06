import {
  PARENT_TARGET_INTAKES,
  PARENT_TARGET_YEAR_LEVELS,
} from '@/modules/applications/schemas/parent-create-application.schema';
import type {
  ParentTargetIntake,
  ParentTargetYearLevel,
} from '@/modules/applications/types/parent-create-application.types';

export const PARENT_TARGET_YEAR_LEVEL_LABEL_KEYS: Record<ParentTargetYearLevel, string> = {
  gr4: 'yearLevel_gr4',
  gr5: 'yearLevel_gr5',
  gr6: 'yearLevel_gr6',
  yr7: 'yearLevel_yr7',
  yr8: 'yearLevel_yr8',
  yr9: 'yearLevel_yr9',
  yr10: 'yearLevel_yr10',
  yr11: 'yearLevel_yr11',
  yr12: 'yearLevel_yr12',
};

export const PARENT_TARGET_INTAKE_LABEL_KEYS: Record<ParentTargetIntake, string> = {
  term1: 'intake_term1',
  term2: 'intake_term2',
  term3: 'intake_term3',
  term4: 'intake_term4',
};

export const PARENT_TARGET_YEAR_LEVEL_OPTIONS: readonly ParentTargetYearLevel[] =
  PARENT_TARGET_YEAR_LEVELS;

export const PARENT_TARGET_INTAKE_OPTIONS: readonly ParentTargetIntake[] = PARENT_TARGET_INTAKES;
