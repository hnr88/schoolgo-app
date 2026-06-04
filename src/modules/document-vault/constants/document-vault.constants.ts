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

import type {
  VaultDocumentType,
  VaultExpiryStatus,
  VaultSortOption,
} from '@/modules/document-vault/types/document-vault.types';

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

export const DEFAULT_VAULT_SORT: VaultSortOption = 'newest';

export const VAULT_SORT_LABEL_KEY: Record<VaultSortOption, string> = {
  newest: 'sortNewest',
  oldest: 'sortOldest',
  title_asc: 'sortTitleAsc',
  title_desc: 'sortTitleDesc',
};

export const VAULT_REJECTION_MESSAGE_KEY: Record<string, string> = {
  'file-too-large': 'dropRejectedTooLarge',
  'file-invalid-type': 'dropRejectedInvalidType',
  'too-many-files': 'dropRejectedTooMany',
};

export const VAULT_IMAGE_MIME_PREFIX = 'image/';
export const VAULT_PDF_MIME = 'application/pdf';

export const VAULT_EXPIRY_BADGE_CLASS: Record<
  Exclude<VaultExpiryStatus, 'none' | 'valid'>,
  string
> = {
  expiring_soon: 'bg-vivid-amber-soft text-arches-700',
  expired: 'bg-vivid-coral-soft text-vivid-coral-strong',
};

export const VAULT_EXPIRY_BADGE_LABEL_KEY: Record<
  Exclude<VaultExpiryStatus, 'none' | 'valid'>,
  string
> = {
  expiring_soon: 'expiryBadgeSoon',
  expired: 'expiryBadgeExpired',
};
