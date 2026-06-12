import type { OrderedItem } from '@/modules/agent-detail/types/agent-detail.types';

/**
 * Stable ascending comparator for repeatable component items by their `order`
 * integer. Items without an `order` sort last (treated as +Infinity), keeping
 * the backend-provided sequence deterministic across every profile section.
 */
export function byOrder(a: OrderedItem, b: OrderedItem): number {
  const left = a.order ?? Number.POSITIVE_INFINITY;
  const right = b.order ?? Number.POSITIVE_INFINITY;
  return left - right;
}

/** Whether a Strapi media item is a video (by mime) so the FE can pick a player. */
export function isVideoMedia(mime?: string | null): boolean {
  return typeof mime === 'string' && mime.startsWith('video/');
}

/** Clamp a star rating to the 0–5 range and round to a whole number of stars. */
export function clampStars(value?: number | null): number {
  if (value == null || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(5, Math.round(value)));
}
