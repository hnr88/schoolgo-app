'use client';

import { Building2, ClipboardCheck, Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { IconComponent } from '@/modules/design-system';

interface QuickAction {
  labelKey: string;
  href: string;
  icon: IconComponent;
}

const ACTIONS: QuickAction[] = [
  {
    labelKey: 'quickActionReviewApplications',
    href: '/dashboard/applications',
    icon: ClipboardCheck,
  },
  {
    labelKey: 'quickActionInviteAgent',
    href: '/dashboard/partnerships',
    icon: Handshake,
  },
  {
    labelKey: 'quickActionEditProfile',
    href: '/dashboard/profile',
    icon: Building2,
  },
];

export function SchoolQuickActions() {
  const t = useTranslations('SchoolDashboard');

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-base font-bold text-ink-900'>{t('quickActionsTitle')}</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.labelKey}
              href={action.href}
              className='flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 no-underline shadow-1 transition-colors hover:border-primary/30'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-ink-900'>
                <Icon className='h-5 w-5' strokeWidth={1.75} />
              </span>
              <span className='text-sm font-medium text-ink-900'>{t(action.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
