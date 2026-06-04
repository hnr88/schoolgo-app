import { differenceInCalendarDays } from 'date-fns';

import type { VaultExpiryStatus } from '@/modules/document-vault/types/document-vault.types';

export const VAULT_EXPIRY_SOON_DAYS = 30;

export function getVaultExpiryStatus(
  expiresAt: string | null,
  now: Date = new Date(),
): VaultExpiryStatus {
  if (!expiresAt) return 'none';

  const expiryDate = new Date(expiresAt);
  if (Number.isNaN(expiryDate.getTime())) return 'none';

  const daysUntilExpiry = differenceInCalendarDays(expiryDate, now);

  if (daysUntilExpiry < 0) return 'expired';
  if (daysUntilExpiry <= VAULT_EXPIRY_SOON_DAYS) return 'expiring_soon';
  return 'valid';
}
