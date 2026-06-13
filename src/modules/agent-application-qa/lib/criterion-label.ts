// The fixed set of criterion keys the readiness service can emit. Anything
// outside this set falls back to the raw criterion string so the UI never
// crashes on an unmapped i18n key.
const KNOWN_CRITERIA = ['documents', 'docExpiry', 'nameMatch', 'age', 'englishTest'] as const;

type KnownCriterion = (typeof KNOWN_CRITERIA)[number];

function isKnownCriterion(criterion: string): criterion is KnownCriterion {
  return (KNOWN_CRITERIA as readonly string[]).includes(criterion);
}

export function criterionLabel(criterion: string, t: (key: string) => string): string {
  return isKnownCriterion(criterion) ? t(`criterion_${criterion}`) : criterion;
}
