import type { DocumentType, DocumentStatus } from '@/modules/students/types/document.types';

export const DOCUMENT_TYPE_ICON_MAP: Record<DocumentType, string> = {
  passport: 'BookOpen',
  school_reports: 'FileText',
  english_test: 'Languages',
  birth_certificate: 'FileCheck',
  parent_passport: 'BookOpen',
  immunisation: 'Syringe',
  personal_statement: 'PenLine',
  guardian_nomination: 'UserCheck',
  current_visa: 'Stamp',
  welfare_docs: 'ShieldCheck',
  financial_evidence: 'Wallet',
  oshc: 'HeartPulse',
  written_agreement: 'FileSignature',
  conditions_of_entry: 'ScrollText',
  offer_acceptance: 'CheckCircle',
  coe: 'Award',
  caaw_letter: 'Mail',
  photo: 'Camera',
  other: 'File',
};

export const DOCUMENT_STATUS_VARIANT: Record<DocumentStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  replaced: 'secondary',
  archived: 'outline',
};

export const ACCEPTED_FILE_TYPES: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
