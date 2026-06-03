'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import { isSingleLineFormControl } from '@/modules/forms/lib/wizard-keyboard';
import { focusFirstInvalid } from '@/modules/forms/lib/wizard-focus';
import type { WizardCanAdvance } from '@/modules/forms/types/wizard.types';

interface UseWizardNavigationOptions {
  stepIndex: number;
  isLast: boolean;
  goNext: () => Promise<boolean>;
  onFinish: () => void | Promise<void>;
  canAdvance?: WizardCanAdvance;
}

interface UseWizardNavigationReturn {
  stepContainerRef: RefObject<HTMLDivElement | null>;
  isFinishing: boolean;
  handleNext: () => Promise<void>;
  handleFinish: () => Promise<void>;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export function useWizardNavigation({
  stepIndex,
  isLast,
  goNext,
  onFinish,
  canAdvance,
}: UseWizardNavigationOptions): UseWizardNavigationReturn {
  const [isFinishing, setIsFinishing] = useState(false);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  function focusInvalidSoon() {
    if (typeof requestAnimationFrame === 'undefined') {
      focusFirstInvalid(stepContainerRef.current);
      return;
    }
    requestAnimationFrame(() => focusFirstInvalid(stepContainerRef.current));
  }

  async function handleNext() {
    const advanced = await goNext();
    if (!advanced) focusInvalidSoon();
  }

  async function handleFinish() {
    if (canAdvance && !(await canAdvance(stepIndex))) {
      focusInvalidSoon();
      return;
    }
    setIsFinishing(true);
    try {
      await onFinish();
    } finally {
      setIsFinishing(false);
    }
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const container = stepContainerRef.current;
    if (!container) return;
    const focusable = container.querySelector<HTMLElement>(
      'input:not([type="hidden"]), select, textarea, button, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [stepIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter') return;
    if (!isSingleLineFormControl(event.target)) return;
    event.preventDefault();
    if (isLast) {
      void handleFinish();
      return;
    }
    void handleNext();
  }

  return { stepContainerRef, isFinishing, handleNext, handleFinish, handleKeyDown };
}
