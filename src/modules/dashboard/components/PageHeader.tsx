import type { ReactNode } from 'react';
import { Eyebrow } from '@/modules/design-system';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className='flex min-w-0 flex-col gap-2'>
        {eyebrow && <Eyebrow tone='brand'>{eyebrow}</Eyebrow>}
        <h1 className='font-display text-display-h1 font-bold tracking-tight text-ink-900'>
          {title}
        </h1>
        {description && (
          <p className='max-w-2xl text-sm leading-relaxed text-foggy'>{description}</p>
        )}
      </div>
      {actions && (
        <div className='flex shrink-0 flex-wrap items-center gap-2'>{actions}</div>
      )}
    </header>
  );
}
