import type { ParentApplicationSortField } from '@/modules/applications/types/parent-component.types';

export const PARENT_APPLICATION_SORT_FIELD_TO_API: Record<ParentApplicationSortField, string> = {
  student: 'student.firstName',
  school: 'school.name',
  status: 'status',
  submittedAt: 'submittedAt',
};

export const PARENT_APPLICATION_POPULATE: Record<string, string> = {
  'populate[student][fields][0]': 'firstName',
  'populate[student][fields][1]': 'lastName',
  'populate[student][fields][2]': 'documentId',
  'populate[school][fields][0]': 'name',
  'populate[school][fields][1]': 'documentId',
};

export const PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE = 10;

export const PARENT_APPLICATION_STATUS_FILTERS = [
  { value: 'all', labelKey: 'allStatuses' as const },
  { value: 'submitted', labelKey: 'statusSubmitted' as const },
  { value: 'under_review', labelKey: 'statusUnderReview' as const },
  { value: 'documents_requested', labelKey: 'statusDocumentsRequested' as const },
  { value: 'offer_made', labelKey: 'statusOfferMade' as const },
  { value: 'offer_accepted', labelKey: 'statusOfferAccepted' as const },
  { value: 'enrolled', labelKey: 'statusEnrolled' as const },
  { value: 'withdrawn', labelKey: 'statusWithdrawn' as const },
  { value: 'declined', labelKey: 'statusDeclined' as const },
] as const;
