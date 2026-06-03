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
  file: VaultFile | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

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
  file: File;
}

export interface VaultDocumentCardProps {
  document: VaultDocument;
  onDelete: (document: VaultDocument) => void;
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
