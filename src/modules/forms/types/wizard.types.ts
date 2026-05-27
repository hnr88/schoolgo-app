import type { ReactNode } from 'react';

export interface WizardStepConfig {
  id: string;
  title: string;
}

export type WizardCanAdvance = (
  stepIndex: number,
) => boolean | Promise<boolean>;

export interface UseWizardOptions {
  stepCount: number;
  initialStep?: number;
  canAdvance?: WizardCanAdvance;
}

export interface UseWizardReturn {
  stepIndex: number;
  isFirst: boolean;
  isLast: boolean;
  isAdvancing: boolean;
  goNext: () => Promise<boolean>;
  goBack: () => void;
  goTo: (index: number) => void;
}

export interface WizardLabels {
  back: string;
  next: string;
  finish: string;
}

export type WizardStepRenderer = (
  activeStep: WizardStepConfig,
  index: number,
) => ReactNode;

export interface WizardProps {
  steps: WizardStepConfig[];
  children: WizardStepRenderer;
  labels: WizardLabels;
  onFinish: () => void | Promise<void>;
  canAdvance?: WizardCanAdvance;
  initialStep?: number;
  isSubmitting?: boolean;
  className?: string;
}

export interface WizardStepProps {
  step: WizardStepConfig;
  children: ReactNode;
  className?: string;
}

export interface WizardProgressProps {
  steps: WizardStepConfig[];
  activeIndex: number;
  className?: string;
}

export interface WizardNavProps {
  labels: WizardLabels;
  isFirst: boolean;
  isLast: boolean;
  isBusy: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
}
