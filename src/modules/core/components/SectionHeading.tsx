import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  level?: 1 | 2 | 3;
  icon?: ComponentType<{ className?: string }>;
  actions?: ReactNode;
  className?: string;
  id?: string;
}

const TITLE_STYLES: Record<1 | 2 | 3, string> = {
  1: 'font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl',
  2: 'font-display text-lg font-bold tracking-tight text-ink-900',
  3: 'text-base font-semibold text-ink-900',
};

export function SectionHeading({
  title,
  description,
  level = 2,
  icon: Icon,
  actions,
  className,
  id,
}: SectionHeadingProps) {
  const Tag = (`h${level}` as 'h1' | 'h2' | 'h3');

  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
      <div className='flex items-start gap-3'>
        {Icon ? (
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rausch-50 text-primary-strong'>
            <Icon className='h-5 w-5' aria-hidden='true' />
          </span>
        ) : null}
        <div className='flex flex-col gap-1'>
          <Tag id={id} className={TITLE_STYLES[level]}>
            {title}
          </Tag>
          {description ? (
            <p className='text-sm text-foggy'>{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className='flex shrink-0 items-center gap-2'>{actions}</div> : null}
    </div>
  );
}
