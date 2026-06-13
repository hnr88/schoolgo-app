/**
 * Selectable 0-based option indices for an assessment answer. The endpoints
 * never expose the questions (they hold the answer key), so the take-assessment
 * form lets the agent pick the option letter (A-E) they believe is correct; the
 * server grades the submitted indices.
 */
export const ASSESSMENT_OPTION_INDICES = [0, 1, 2, 3, 4] as const;
