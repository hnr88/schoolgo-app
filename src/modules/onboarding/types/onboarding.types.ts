import type { LucideIcon } from 'lucide-react';

export type OnboardingStepKey =
  | 'completeProfile'
  | 'addChild'
  | 'saveSchools'
  | 'firstApplication';

export interface OnboardingStepConfig {
  key: OnboardingStepKey;
  labelKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
}

export interface OnboardingStepSignals {
  hasProfile: boolean;
  hasChild: boolean;
  hasSavedSchool: boolean;
  hasApplication: boolean;
}

export interface OnboardingStepState {
  key: OnboardingStepKey;
  done: boolean;
}

export interface OnboardingProgress {
  steps: OnboardingStepState[];
  completedCount: number;
  total: number;
  percent: number;
}
