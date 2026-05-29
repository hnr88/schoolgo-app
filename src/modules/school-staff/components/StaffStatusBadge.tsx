'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import { STAFF_STATUS_LABEL } from '@/modules/school-staff/lib/staff';
import type { SchoolStaffStatus } from '@/modules/school-staff/types/school-staff.types';

type Tone = NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>;

const STATUS_TONE: Record<SchoolStaffStatus, Tone> = {
  active: 'accepted',
  pending_verification: 'featured',
  deactivated: 'muted',
};

export function StaffStatusBadge({ status }: { status: SchoolStaffStatus }) {
  const t = useTranslations('SchoolStaff');
  return <StatusBadge tone={STATUS_TONE[status]}>{t(STAFF_STATUS_LABEL[status])}</StatusBadge>;
}
