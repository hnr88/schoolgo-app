import type {
  ParentPreEnrolmentItem,
  PreEnrolmentSummary,
} from '@/modules/applications/types/parent-pre-enrolment.types';

export function computePreEnrolmentSummary(
  items: ParentPreEnrolmentItem[],
): PreEnrolmentSummary {
  const total = items.length;
  let approved = 0;
  let pending = 0;
  let submitted = 0;
  let rejected = 0;

  for (const item of items) {
    switch (item.status) {
      case 'approved':
        approved += 1;
        break;
      case 'pending':
        pending += 1;
        break;
      case 'submitted':
        submitted += 1;
        break;
      case 'rejected':
        rejected += 1;
        break;
    }
  }

  return {
    total,
    approved,
    pending,
    submitted,
    rejected,
    allComplete: total > 0 && approved === total,
  };
}
