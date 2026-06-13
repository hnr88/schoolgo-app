import { COMPLETENESS_CHECKLIST } from '@/modules/agent-profile/constants/agent-builder.constants';
import type {
  AgentPublicProfilePreview,
  CompletenessSuggestion,
} from '@/modules/agent-profile/types/agent-profile.types';

function sectionLength(preview: AgentPublicProfilePreview, field: string): number {
  const value = preview.editorSections[field];
  return Array.isArray(value) ? value.length : 0;
}

function hasFeeTransparency(preview: AgentPublicProfilePreview): boolean {
  const fee = preview.editorSections.feeTransparency as
    | { feeModel?: unknown; feeTransparencyStatement?: unknown }
    | undefined;
  return Boolean(fee?.feeModel && fee?.feeTransparencyStatement);
}

function hasEthics(preview: AgentPublicProfilePreview): boolean {
  const ethics = preview.editorSections.ethicsCommitments as
    | { agentCodeOfEthicsSigned?: boolean; protectsMinorsCommitment?: boolean }
    | undefined;
  return Boolean(ethics?.agentCodeOfEthicsSigned && ethics?.protectsMinorsCommitment);
}

function hasExternalRating(preview: AgentPublicProfilePreview): boolean {
  const metrics = preview.editorSections.successMetrics as
    | { googleRating?: unknown; externalReviewUrl?: unknown }
    | undefined;
  return Boolean(metrics?.googleRating || metrics?.externalReviewUrl);
}

/**
 * Whether each weighted completeness bucket is satisfied by the current preview.
 * Mirrors AGENT-PROFILE-MODEL.json `trustAndCompleteness` thresholds. Component
 * buckets read the ungated `editorSections` arrays, so completeness reflects the
 * agent's real saved data regardless of each section's visibility toggle; scalar
 * buckets read always-exposed top-level fields.
 */
function isBucketMet(preview: AgentPublicProfilePreview, key: string): boolean {
  switch (key) {
    case 'verifiedCredential':
      return (
        preview.qeacValidationStatus === 'verified' ||
        preview.maraValidationStatus === 'verified'
      );
    case 'schoolAuthorisation':
      return sectionLength(preview, 'partnerSchools') >= 1;
    case 'photo':
      return Boolean(preview.photoUrl);
    case 'feeTransparency':
      return hasFeeTransparency(preview);
    case 'bio':
      return (preview.bio ?? preview.publicSummary ?? '').trim().length >= 120;
    case 'languages':
      return sectionLength(preview, 'spokenLanguages') >= 2;
    case 'contactChannel':
      return sectionLength(preview, 'contactChannels') >= 1;
    case 'office':
      return sectionLength(preview, 'officeLocations') >= 1;
    case 'ethics':
      return hasEthics(preview);
    case 'testimonials':
      return sectionLength(preview, 'testimonials') >= 3;
    case 'counsellor':
      return sectionLength(preview, 'counsellors') >= 1;
    case 'successStory':
      return sectionLength(preview, 'successStories') >= 1;
    case 'externalRating':
      return hasExternalRating(preview);
    default:
      return false;
  }
}

/**
 * The single highest-impact missing item to surface in the completeness ring as
 * the "next best action" — the first unmet bucket in weight-desc order. Returns
 * null when every bucket is satisfied.
 */
export function getNextBestAction(
  preview: AgentPublicProfilePreview,
): CompletenessSuggestion | null {
  for (const item of COMPLETENESS_CHECKLIST) {
    if (!isBucketMet(preview, item.key)) return item;
  }
  return null;
}
