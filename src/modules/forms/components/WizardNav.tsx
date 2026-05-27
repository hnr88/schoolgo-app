'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WizardNavProps } from '@/modules/forms/types/wizard.types';

export function WizardNav({
  labels,
  isFirst,
  isLast,
  isBusy,
  onBack,
  onNext,
  onFinish,
}: WizardNavProps) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <Button
        type='button'
        variant='outline'
        onClick={onBack}
        disabled={isFirst || isBusy}
      >
        {labels.back}
      </Button>
      <Button
        type='button'
        onClick={isLast ? onFinish : onNext}
        disabled={isBusy}
        aria-busy={isBusy}
      >
        {isBusy && <Loader2 className='size-4 animate-spin' aria-hidden='true' />}
        {isLast ? labels.finish : labels.next}
      </Button>
    </div>
  );
}
