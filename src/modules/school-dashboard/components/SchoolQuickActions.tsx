'use client';

import { ArrowRight, Building2, ClipboardCheck, Handshake } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { SectionHeading, surfaceCardVariants } from '@/modules/core';
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
      <SectionHeading title={t('quickActionsTitle')} level={2} />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.labelKey}
              href={action.href}
              className={cn(
                surfaceCardVariants({ elevation: 'interactive', padding: 'none' }),
                'group flex items-center gap-3 px-5 py-4 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              )}
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-arches-50 text-arches-700'>
                <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1 text-sm font-medium text-ink-900 group-hover:text-primary-strong'>
                {t(action.labelKey)}
              </span>
              <ArrowRight
                className='h-4 w-4 -translate-x-1 shrink-0 text-foggy opacity-0 transition duration-200 ease-out-quart group-hover:translate-x-0 group-hover:opacity-100'
                strokeWidth={2}
                aria-hidden='true'
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
