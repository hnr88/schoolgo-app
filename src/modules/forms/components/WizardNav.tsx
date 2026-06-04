'use client';

import { Loader2 } from 'lucide-react';
import { DsButton } from '@/modules/design-system';
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
    <div className='flex items-center justify-between gap-4 border-t border-border pt-8'>
      <DsButton
        type='button'
        variant='secondary'
        size='lg'
        onClick={onBack}
        disabled={isFirst || isBusy}
      >
        {labels.back}
      </DsButton>
      <DsButton
        type='button'
        variant='primary'
        size='lg'
        onClick={isLast ? onFinish : onNext}
        disabled={isBusy}
        aria-busy={isBusy}
      >
        {isBusy && <Loader2 className='size-4 animate-spin' aria-hidden='true' />}
        {isLast ? labels.finish : labels.next}
      </DsButton>
    </div>
  );
}
