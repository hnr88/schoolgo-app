import {
  BookOpen,
  Camera,
  FileBadge,
  FileCheck,
  FileText,
  GraduationCap,
  Languages,
  PenLine,
  Syringe,
  Wallet,
} from 'lucide-react';

import type { VaultDocumentType } from '@/modules/document-vault/types/document-vault.types';

export const VAULT_DOCUMENT_TYPE_ICON: Record<VaultDocumentType, typeof FileText> = {
  birth_certificate: FileCheck,
  passport: BookOpen,
  school_reports: FileText,
  transcript: GraduationCap,
  english_test: Languages,
  immunisation: Syringe,
  personal_statement: PenLine,
  financial_evidence: Wallet,
  photo: Camera,
  other: FileBadge,
};

export const ACCEPTED_VAULT_FILE_TYPES: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

export const MAX_VAULT_FILE_SIZE = 10 * 1024 * 1024;
