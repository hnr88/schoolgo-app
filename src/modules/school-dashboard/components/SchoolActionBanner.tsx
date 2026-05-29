'use client';

import { CheckCircle2, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { SchoolDashboardActionRequired } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolActionBanner({
  actionRequired,
}: {
  actionRequired: SchoolDashboardActionRequired;
}) {
  const t = useTranslations('SchoolDashboard');
  const hasActions =
    actionRequired.newApplications > 0 || actionRequired.expiringOffers > 0;

  if (!hasActions) {
    return (
      <div className='flex items-center gap-3 rounded-xl border border-babu-100 bg-babu-50 p-6'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-babu-100 text-babu-600'>
          <CheckCircle2 className='h-4 w-4' strokeWidth={2} />
        </span>
        <span className='text-sm font-medium text-ink-900'>{t('actionAllClear')}</span>
      </div>
    );
  }

  return (
    <div className='flex items-start gap-3 rounded-xl border border-babu-100 bg-babu-50 p-6'>
      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-babu-100 text-babu-600'>
        <Info className='h-4 w-4' strokeWidth={2} />
      </span>
      <div className='flex flex-col gap-2'>
        <span className='text-xs font-bold uppercase tracking-wide text-babu-700'>
          {t('actionRequiredTitle')}
        </span>
        <ul className='flex flex-col gap-1.5'>
          {actionRequired.newApplications > 0 && (
            <li>
              <Link
                href='/dashboard/applications?status=submitted'
                className='text-sm text-ink-900 no-underline hover:underline'
              >
                {t('actionNewApplications', { count: actionRequired.newApplications })}
              </Link>
            </li>
          )}
          {actionRequired.expiringOffers > 0 && (
            <li>
              <Link
                href='/dashboard/applications?status=offer_made'
                className='text-sm text-ink-900 no-underline hover:underline'
              >
                {t('actionExpiringOffers', { count: actionRequired.expiringOffers })}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
