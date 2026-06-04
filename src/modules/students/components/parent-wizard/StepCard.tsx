'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/modules/design-system';

interface StepCardProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function StepCard({
  eyebrow,
  title,
  description,
  aside,
  className,
  children,
}: StepCardProps) {
  const hasHeader = Boolean(eyebrow || title || description || aside);

  return (
    <div
      className={cn(
        'flex flex-col gap-8 rounded-2xl bg-card p-8 shadow-1 lg:p-10',
        className,
      )}
    >
      {hasHeader ? (
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex min-w-0 flex-col gap-2'>
            {eyebrow ? <Eyebrow tone='brand'>{eyebrow}</Eyebrow> : null}
            {title ? (
              <h3 className='font-display text-2xl font-semibold tracking-tight text-ink-900'>
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className='max-w-prose text-sm leading-relaxed text-muted-foreground'>
                {description}
              </p>
            ) : null}
          </div>
          {aside ? <div className='shrink-0'>{aside}</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
