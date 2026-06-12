'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface AgentLockedOverlayProps {
  locked: boolean;
  children: ReactNode;
  className?: string;
}

export function AgentLockedOverlay({ locked, children, className }: AgentLockedOverlayProps) {
  const t = useTranslations('AgentSearch.locked');

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative', className)}>
      <div inert aria-hidden='true' className='pointer-events-none select-none opacity-40'>
        {children}
      </div>
      <div
        className='absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg bg-background/95 px-2 pb-4 pt-2'
        aria-label={t('title')}
      >
        <Lock className='size-4 text-muted-foreground' aria-hidden='true' />
        <p className='max-w-xs text-center text-caption text-muted-foreground'>{t('description')}</p>
        <Link
          href='/sign-in'
          className='inline-flex items-center rounded-pill border border-primary px-2 py-0.5 text-caption font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
