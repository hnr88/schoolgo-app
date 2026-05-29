import type {
  SchoolStaffMember,
  SchoolStaffStatus,
} from '@/modules/school-staff/types/school-staff.types';

export function formatStaffDate(value: string | null, locale: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function resolveCurrentMember(
  members: SchoolStaffMember[],
  currentStaffDocumentId: string | null,
): SchoolStaffMember | null {
  if (!currentStaffDocumentId) return null;
  return members.find((m) => m.documentId === currentStaffDocumentId) ?? null;
}

export const STAFF_STATUS_LABEL: Record<SchoolStaffStatus, string> = {
  active: 'statusActive',
  pending_verification: 'statusInvited',
  deactivated: 'statusInactive',
};
