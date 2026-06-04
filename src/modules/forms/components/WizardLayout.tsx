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
  /** Wrap the active step + nav in one elevated card. Defaults to false. */
  framed?: boolean;
}

export const WizardLayout = forwardRef<HTMLDivElement, WizardLayoutProps>(function WizardLayout(
  { header, progress, nav, aside, className, stepKey, onStepKeyDown, children, framed = false },
  stepRef,
) {
  const step = (
    <div ref={stepRef} onKeyDown={onStepKeyDown}>
      <div
        key={stepKey}
        className='animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out-quart'
      >
        {children}
      </div>
    </div>
  );

  const panel = framed ? (
    <div className='flex flex-col gap-8 rounded-2xl border border-border bg-card p-8 shadow-2 lg:gap-10 lg:p-10'>
      {step}
      {nav}
    </div>
  ) : (
    <>
      {step}
      {nav}
    </>
  );

  const column = (
    <div className='flex min-w-0 flex-1 flex-col gap-8'>
      {header}
      {progress}
      {panel}
    </div>
  );

  if (!aside) {
    return <div className={cn('flex flex-col gap-8', className)}>{column}</div>;
  }

  return (
    <div className={cn('flex flex-col gap-10 lg:flex-row lg:gap-16', className)}>
      <aside className='lg:w-80 lg:shrink-0'>{aside}</aside>
      {column}
    </div>
  );
});
