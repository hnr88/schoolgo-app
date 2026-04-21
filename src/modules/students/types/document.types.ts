export const DOCUMENT_TYPES = [
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

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const DOCUMENT_STATUSES = ['active', 'replaced', 'archived'] as const;

export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  url: string;
  mime: string;
  size: number;
  ext: string;
  width?: number;
  height?: number;
}

export interface StudentDocument {
  id: number;
  documentId: string;
  documentType: DocumentType;
  file: StrapiMedia | null;
  fileName: string | null;
  status: DocumentStatus;
  expiresAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
