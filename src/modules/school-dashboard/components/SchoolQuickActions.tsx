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
              className='group flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 no-underline shadow-1 transition-transform duration-200 ease-out-quart hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-ink-900'>
                <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <span className='text-sm font-medium text-ink-900 group-hover:text-primary-strong'>
                {t(action.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
