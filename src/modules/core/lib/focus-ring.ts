/**
 * One focus signal (§3.12): 3px ring in `--ring`, 2px offset against the page.
 * Apply to every interactive element so the focus treatment never drifts.
 */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * Inset variant for layout-constrained interactives (e.g. table rows) where an
 * outset ring would be clipped. Same color/width, drawn inside the element.
 */
export const FOCUS_RING_INSET =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50';
