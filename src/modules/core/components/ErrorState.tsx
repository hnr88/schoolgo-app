'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ErrorStateProps } from '@/modules/core/types/component.types';

export function ErrorState({ message, onRetry, retryLabel, framed }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        framed
          ? 'rounded-lg border border-dashed border-destructive/30 bg-card px-6 py-12'
          : 'py-12',
      )}
    >
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10'>
        <AlertCircle className='h-6 w-6 text-destructive' />
      </div>
      <p className={cn('mt-4 font-semibold', framed ? 'text-base text-ink-900' : 'text-sm text-foreground')}>
        {message}
      </p>
      {onRetry && (
        <div className='mt-5'>
          <Button variant='outline' onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
