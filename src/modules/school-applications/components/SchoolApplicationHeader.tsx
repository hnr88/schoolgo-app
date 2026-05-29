'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { SchoolStatusBadge } from '@/modules/school-applications/components/SchoolStatusBadge';
import {
  daysColorClass,
  studentDisplayName,
} from '@/modules/school-applications/lib/school-application';
import type { SchoolApplicationDetail } from '@/modules/school-applications/types/school-applications.types';

function StatusProgress({ application }: { application: SchoolApplicationDetail }) {
  return (
    <ol className='flex flex-wrap items-center gap-2' aria-label='status progress'>
      {application.statusProgress.map((step, idx) => {
        const done = step.status === 'completed';
        const active = step.status === 'active';
        return (
          <li key={step.milestone} className='flex items-center gap-2'>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                done
                  ? 'bg-babu-500 text-white'
                  : active
                    ? 'bg-babu-50 text-babu-600 ring-2 ring-babu-500'
                    : 'bg-muted text-foggy'
              }`}
            >
              {done ? <Check className='h-3.5 w-3.5' /> : idx + 1}
            </span>
            <span className={`text-xs ${active ? 'font-semibold text-ink-900' : 'text-foggy'}`}>
              {step.milestone}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function SchoolApplicationHeader({ application }: { application: SchoolApplicationDetail }) {
  const t = useTranslations('SchoolApplications');
  const studentName = studentDisplayName(application.student);

  return (
    <div className='flex flex-col gap-5 rounded-xl border border-border bg-card p-6'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-semibold text-ink-900'>{studentName}</h1>
          <p className='text-sm text-foggy'>
            {application.targetYearLevel ?? '—'} · {application.targetIntake ?? '—'}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <SchoolStatusBadge status={application.status} />
          <span className={`text-sm font-medium ${daysColorClass(application.daysInStatusColor)}`}>
            {t('daysInStatus', { count: application.daysInStatus })}
          </span>
        </div>
      </div>

      <StatusProgress application={application} />
    </div>
  );
}
