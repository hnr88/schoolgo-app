import type {
  ReadinessGroup,
  ReadinessItem,
} from '@/modules/parent-enrolment-readiness/types/enrolment-readiness.types';

function fullName(
  student: { firstName?: string | null; lastName?: string | null } | null | undefined,
): string | null {
  if (!student) return null;
  return [student.firstName, student.lastName].filter(Boolean).join(' ') || null;
}

/** Groups readiness items by application, preserving the API's item order. */
export function groupReadinessItems(items: ReadinessItem[]): ReadinessGroup[] {
  const groups = new Map<string, ReadinessGroup>();

  for (const item of items) {
    const application = item.application;
    if (!application) continue;

    let group = groups.get(application.documentId);
    if (!group) {
      group = {
        applicationDocumentId: application.documentId,
        schoolName: application.school?.name ?? null,
        studentName: fullName(application.student),
        items: [],
        approved: 0,
        total: 0,
      };
      groups.set(application.documentId, group);
    }

    group.items.push(item);
    group.total += 1;
    if (item.status === 'approved') group.approved += 1;
  }

  return [...groups.values()];
}
