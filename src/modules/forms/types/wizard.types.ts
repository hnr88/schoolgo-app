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
  goTo: (index: number) => void,
) => ReactNode;

export type WizardChrome = (state: WizardChromeState) => ReactNode;

export interface WizardChromeState {
  stepIndex: number;
  stepCount: number;
  activeStep: WizardStepConfig;
  steps: WizardStepConfig[];
  goTo: (index: number) => void;
  backLabel?: string;
}

export interface WizardProps {
  steps: WizardStepConfig[];
  children: WizardStepRenderer;
  labels: WizardLabels;
  onFinish: () => void | Promise<void>;
  canAdvance?: WizardCanAdvance;
  initialStep?: number;
  isSubmitting?: boolean;
  className?: string;
  /** Optional content rendered above the active step (title, step counter). */
  header?: WizardChrome;
  /** Optional rail rendered alongside the step on lg+ (stepper, summary). */
  aside?: WizardChrome;
  /** Hide the default inline horizontal stepper (use when `aside` renders one). */
  hideProgress?: boolean;
}

export interface WizardStepProps {
  step: WizardStepConfig;
  children: ReactNode;
  className?: string;
}

export interface WizardProgressProps {
  steps: WizardStepConfig[];
  activeIndex: number;
  onStepSelect?: (index: number) => void;
  backLabel?: string;
  orientation?: 'horizontal' | 'vertical';
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
