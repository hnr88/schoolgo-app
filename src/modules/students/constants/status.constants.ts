export const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  active: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  archived: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  enrolled: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
};

export const TEST_VERIFICATION_TONE: Record<string, 'accepted' | 'featured' | 'muted' | 'danger'> = {
  issuer_verified: 'accepted',
  direct_delivered: 'accepted',
  verifying: 'featured',
  unverified: 'muted',
  revoked: 'danger',
};

export const STATUS_OPTIONS = [
  { value: 'all', labelKey: 'allStatuses' as const },
  { value: 'active', labelKey: 'statusActive' as const },
  { value: 'archived', labelKey: 'statusArchived' as const },
  { value: 'enrolled', labelKey: 'statusEnrolled' as const },
];
