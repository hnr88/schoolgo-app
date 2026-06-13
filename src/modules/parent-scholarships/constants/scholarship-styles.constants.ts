/** StatusBadge style maps: keys are the scholarship `type` enum values. */
export const SCHOLARSHIP_TYPE_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  merit: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  need: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber' },
  sibling: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  regional: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};

export const ELIGIBILITY_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  eligible: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  ineligible: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};
