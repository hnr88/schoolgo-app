import type { FileRejection } from 'react-dropzone';

import { VAULT_REJECTION_MESSAGE_KEY } from '@/modules/document-vault/constants/document-vault.constants';

export interface VaultRejectionMessage {
  key: string;
  values: Record<string, string>;
}

export function resolveVaultRejection(
  rejections: readonly FileRejection[],
): VaultRejectionMessage | null {
  const rejection = rejections[0];
  if (!rejection) return null;

  const code = rejection.errors[0]?.code;
  const key =
    (typeof code === 'string' && VAULT_REJECTION_MESSAGE_KEY[code]) || 'dropRejectedGeneric';

  return { key, values: { name: rejection.file.name } };
}
