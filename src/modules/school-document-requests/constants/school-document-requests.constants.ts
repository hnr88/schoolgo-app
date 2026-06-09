import type { DocumentRequestStatus } from '@/modules/school-document-requests/types/school-document-requests.types';

// Mirrors the backend student-document `documentType` enum.
export const REQUESTABLE_DOCUMENT_TYPES = [
  'passport',
  'school_reports',
  'english_test',
  'birth_certificate',
  'parent_passport',
  'immunisation',
  'personal_statement',
  'guardian_nomination',
  'current_visa',
  'welfare_docs',
  'financial_evidence',
  'oshc',
  'written_agreement',
  'conditions_of_entry',
  'offer_acceptance',
  'coe',
  'caaw_letter',
  'photo',
  'other',
] as const;

export const DOCUMENT_REQUEST_STATUS_STYLES: Record<
  DocumentRequestStatus,
  { dot: string; bg: string; text: string }
> = {
  pending: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
  partially_fulfilled: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  fulfilled: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
};

export const DOCUMENT_REQUEST_STATUS_LABEL_KEY: Record<DocumentRequestStatus, string> = {
  pending: 'statusPending',
  partially_fulfilled: 'statusPartiallyFulfilled',
  fulfilled: 'statusFulfilled',
};
