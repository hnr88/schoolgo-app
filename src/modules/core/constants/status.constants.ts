export const FALLBACK_STYLES = {
  dot: 'bg-foggy/50',
  bg: 'bg-muted',
  text: 'text-foggy',
};

/**
 * Canonical semantic status → color map (§2.5). All bg/ink pairs are
 * pre-verified AA in the token comments.
 */
export const STATUS_TONE_STYLES = {
  neutral: 'bg-gray-100 text-foggy',
  'in-progress': 'bg-babu-50 text-babu-700',
  action: 'bg-arches-50 text-arches-700',
  success: 'bg-vivid-mint-soft text-vivid-mint-strong',
  urgent: 'bg-rausch-50 text-primary-strong',
} as const;

