'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { EnrolmentStatus } from '@/modules/school-search/types/filter.types';

const STYLE_BY_STATUS: Record<EnrolmentStatus, string> = {
  open: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  limited: 'bg-amber-100 text-amber-800 ring-amber-200',
  waitlist: 'bg-rose-100 text-rose-800 ring-rose-200',
  closed: 'bg-gray-200 text-gray-700 ring-gray-300',
};

interface EnrolmentStatusBadgeProps {
  status: EnrolmentStatus;
  className?: string;
}

export function EnrolmentStatusBadge({ status, className }: EnrolmentStatusBadgeProps) {
  const t = useTranslations('SchoolSearch.spec.tile.status');
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2 py-0.5 text-caption font-semibold ring-1 ring-inset',
        STYLE_BY_STATUS[status],
        className,
      )}
    >
      {t(status)}
    </span>
  );
}
