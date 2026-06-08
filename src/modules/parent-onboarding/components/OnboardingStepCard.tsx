import type { ReactNode } from 'react';

interface OnboardingStepCardProps {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

export function OnboardingStepCard({ title, description, children }: OnboardingStepCardProps) {
  const hasHeader = Boolean(title || description);

  return (
    <div className='flex flex-col gap-8 rounded-xl border border-gray-100 bg-card p-8 shadow-1 lg:p-10'>
      {hasHeader ? (
        <div className='flex flex-col gap-2'>
          {title ? (
            <h2 className='font-display text-2xl font-semibold tracking-tight text-ink-900'>
              {title}
            </h2>
          ) : null}
          {description ? <p className='text-sm text-muted-foreground'>{description}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
