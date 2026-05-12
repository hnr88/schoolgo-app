'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { EnrolmentStatus } from '@/modules/school-search/types/filter.types';

const STYLE_BY_STATUS: Record<EnrolmentStatus, string> = {
  open: 'bg-green-100 text-green-800 ring-green-200',
  limited: 'bg-amber-100 text-amber-800 ring-amber-200',
  waitlist: 'bg-red-100 text-red-800 ring-red-200',
  closed: 'bg-gray-100 text-gray-700 ring-gray-200',
};

interface EnrolmentStatusBadgeProps {
  status: EnrolmentStatus;
  className?: string;
}

export function EnrolmentStatusBadge({ status, className }: EnrolmentStatusBadgeProps) {
  const t = useTranslations('SchoolSearch.spec.tileCard.status');
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
