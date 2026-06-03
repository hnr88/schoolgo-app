'use client';

import { forwardRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WizardLayoutProps {
  header?: ReactNode;
  progress?: ReactNode;
  nav: ReactNode;
  aside?: ReactNode;
  className?: string;
  stepKey: number;
  onStepKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

export const WizardLayout = forwardRef<HTMLDivElement, WizardLayoutProps>(function WizardLayout(
  { header, progress, nav, aside, className, stepKey, onStepKeyDown, children },
  stepRef,
) {
  const column = (
    <div className='flex min-w-0 flex-1 flex-col gap-8'>
      {header}
      {progress}
      <div ref={stepRef} onKeyDown={onStepKeyDown}>
        <div
          key={stepKey}
          className='animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out-quart'
        >
          {children}
        </div>
      </div>
      {nav}
    </div>
  );

  if (!aside) {
    return <div className={cn('flex flex-col gap-8', className)}>{column}</div>;
  }

  return (
    <div className={cn('flex flex-col gap-8 lg:flex-row lg:gap-12', className)}>
      <aside className='lg:w-64 lg:shrink-0'>{aside}</aside>
      {column}
    </div>
  );
});
