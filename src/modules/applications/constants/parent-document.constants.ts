import type { DocumentType } from '@/modules/students';
import type { DocumentRequestStatus } from '@/modules/applications/types/parent-document.types';

export const PARENT_DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
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
];

export const PARENT_DOCUMENT_REQUEST_STATUS_BADGE: Record<DocumentRequestStatus, string> = {
  pending: 'bg-muted text-foggy',
  partially_fulfilled: 'bg-vivid-amber-soft text-vivid-amber',
  fulfilled: 'bg-vivid-mint-soft text-vivid-mint',
};

export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export const DOCUMENT_FILE_ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.doc,.docx';
