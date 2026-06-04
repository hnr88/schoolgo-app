import {
  VAULT_IMAGE_MIME_PREFIX,
  VAULT_PDF_MIME,
} from '@/modules/document-vault/constants/document-vault.constants';
import type {
  VaultFile,
  VaultPreviewKind,
} from '@/modules/document-vault/types/document-vault.types';

export function getVaultPreviewKind(file: VaultFile | null): VaultPreviewKind {
  if (!file?.url) return 'none';
  if (file.mime?.startsWith(VAULT_IMAGE_MIME_PREFIX)) return 'image';
  if (file.mime === VAULT_PDF_MIME) return 'pdf';
  return 'none';
}

export function isVaultImage(file: VaultFile | null): boolean {
  return getVaultPreviewKind(file) === 'image';
}
