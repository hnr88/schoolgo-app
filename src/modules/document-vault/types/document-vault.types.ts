export const VAULT_DOCUMENT_TYPES = [
  'birth_certificate',
  'passport',
  'school_reports',
  'transcript',
  'english_test',
  'immunisation',
  'personal_statement',
  'financial_evidence',
  'photo',
  'other',
] as const;

export type VaultDocumentType = (typeof VAULT_DOCUMENT_TYPES)[number];

export const DOCUMENTS_TABS = ['vault', 'expiry'] as const;

export type DocumentsTab = (typeof DOCUMENTS_TABS)[number];

export interface VaultFile {
  id: number;
  documentId: string;
  url: string;
  name: string;
  mime: string;
  size: number;
  ext: string;
}

export interface VaultDocument {
  id: number;
  documentId: string;
  title: string;
  documentType: VaultDocumentType;
  notes: string | null;
  expiresAt: string | null;
  file: VaultFile | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type VaultExpiryStatus = 'none' | 'valid' | 'expiring_soon' | 'expired';

export interface VaultListResponse {
  data: VaultDocument[];
  meta: Record<string, unknown>;
}

export interface VaultSingleResponse {
  data: VaultDocument;
  meta: Record<string, unknown>;
}

export interface UploadVaultDocumentInput {
  title: string;
  documentType: VaultDocumentType;
  notes?: string;
  expiresAt?: string;
  file: File;
}

export const VAULT_SORT_OPTIONS = ['newest', 'oldest', 'title_asc', 'title_desc'] as const;

export type VaultSortOption = (typeof VAULT_SORT_OPTIONS)[number];

export type VaultTypeFilter = VaultDocumentType | 'all';

export type VaultPreviewKind = 'image' | 'pdf' | 'none';

export interface VaultDocumentCardProps {
  document: VaultDocument;
  onDelete: (document: VaultDocument) => void;
  onPreview: (document: VaultDocument) => void;
}

export interface VaultExpiryBadgeProps {
  status: VaultExpiryStatus;
}

export interface VaultDocumentsToolbarProps {
  totalCount: number;
  resultCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: VaultTypeFilter;
  onTypeFilterChange: (value: VaultTypeFilter) => void;
  sort: VaultSortOption;
  onSortChange: (value: VaultSortOption) => void;
  availableTypes: VaultDocumentType[];
}

export interface VaultDocumentPreviewDialogProps {
  document: VaultDocument | null;
  onOpenChange: (open: boolean) => void;
}

export interface VaultUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DeleteVaultDocumentDialogProps {
  document: VaultDocument | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}
