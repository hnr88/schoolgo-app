'use client';

import { useCallback, useMemo, useState } from 'react';
import type { UseWizardOptions, UseWizardReturn } from '@/modules/forms/types/wizard.types';

function clampIndex(index: number, stepCount: number): number {
  if (stepCount <= 0) return 0;
  if (index < 0) return 0;
  const lastIndex = stepCount - 1;
  return index > lastIndex ? lastIndex : index;
}

export function useWizard({
  stepCount,
  initialStep = 0,
  canAdvance,
}: UseWizardOptions): UseWizardReturn {
  const [stepIndex, setStepIndex] = useState(() => clampIndex(initialStep, stepCount));
  const [isAdvancing, setIsAdvancing] = useState(false);

  const isFirst = stepIndex <= 0;
  const isLast = stepIndex >= stepCount - 1;

  const goTo = useCallback(
    (index: number) => {
      setStepIndex((current) => {
        const next = clampIndex(index, stepCount);
        return next === current ? current : next;
      });
    },
    [stepCount],
  );

  const goBack = useCallback(() => {
    setStepIndex((current) => clampIndex(current - 1, stepCount));
  }, [stepCount]);

  const goNext = useCallback(async () => {
    if (stepIndex >= stepCount - 1) return false;

    if (canAdvance) {
      setIsAdvancing(true);
      try {
        const allowed = await canAdvance(stepIndex);
        if (!allowed) return false;
      } finally {
        setIsAdvancing(false);
      }
    }

    setStepIndex((current) => clampIndex(current + 1, stepCount));
    return true;
  }, [canAdvance, stepCount, stepIndex]);

  return useMemo(
    () => ({ stepIndex, isFirst, isLast, isAdvancing, goNext, goBack, goTo }),
    [stepIndex, isFirst, isLast, isAdvancing, goNext, goBack, goTo],
  );
}
