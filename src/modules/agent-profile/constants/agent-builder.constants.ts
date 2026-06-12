import {
  Award,
  BadgeCheck,
  Building2,
  CalendarClock,
  Contact,
  FileBadge,
  Gauge,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Image as ImageIcon,
  Languages,
  ListChecks,
  MapPin,
  MessageSquareQuote,
  Newspaper,
  PanelsTopLeft,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import type {
  AgentAvailabilityStatus,
  AgentBuilderSectionConfig,
  AgentFeeModel,
  AgentVisibilitySectionConfig,
  CompletenessSuggestion,
} from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Ordered tabs of the profile builder shell — one per editable section. Round 2
 * builds the per-section editors that mount inside each tab; round 3 wires them.
 * `id` doubles as the Tabs value. Tier-1 (highest trust/conversion) first.
 */
export const AGENT_BUILDER_SECTIONS: readonly AgentBuilderSectionConfig[] = [
  { id: 'basics', labelKey: 'sectionBasics', icon: PanelsTopLeft },
  { id: 'credentials', labelKey: 'sectionCredentials', icon: FileBadge },
  { id: 'schoolAuthorisations', labelKey: 'sectionSchoolAuthorisations', icon: GraduationCap },
  { id: 'legalIdentity', labelKey: 'sectionLegalIdentity', icon: Scale },
  { id: 'offices', labelKey: 'sectionOffices', icon: MapPin },
  { id: 'contactChannels', labelKey: 'sectionContactChannels', icon: Contact },
  { id: 'languages', labelKey: 'sectionLanguages', icon: Languages },
  { id: 'counsellors', labelKey: 'sectionCounsellors', icon: Users },
  { id: 'services', labelKey: 'sectionServices', icon: ListChecks },
  { id: 'welfareServices', labelKey: 'sectionWelfareServices', icon: HeartHandshake },
  { id: 'feeTransparency', labelKey: 'sectionFeeTransparency', icon: Wallet },
  { id: 'ethicsCommitments', labelKey: 'sectionEthicsCommitments', icon: ShieldCheck },
  { id: 'successMetrics', labelKey: 'sectionSuccessMetrics', icon: Gauge },
  { id: 'testimonials', labelKey: 'sectionTestimonials', icon: Quote },
  { id: 'successStories', labelKey: 'sectionSuccessStories', icon: MessageSquareQuote },
  { id: 'experienceTimeline', labelKey: 'sectionExperienceTimeline', icon: CalendarClock },
  { id: 'memberships', labelKey: 'sectionMemberships', icon: BadgeCheck },
  { id: 'awards', labelKey: 'sectionAwards', icon: Award },
  { id: 'marketsAndDestinations', labelKey: 'sectionMarketsAndDestinations', icon: Building2 },
  { id: 'processSteps', labelKey: 'sectionProcessSteps', icon: Handshake },
  { id: 'mediaGallery', labelKey: 'sectionMediaGallery', icon: ImageIcon },
  { id: 'pressAndPartners', labelKey: 'sectionPressAndPartners', icon: Newspaper },
  { id: 'faqs', labelKey: 'sectionFaqs', icon: ListChecks },
  { id: 'customSections', labelKey: 'sectionCustomSections', icon: Sparkles },
] as const;

export const DEFAULT_BUILDER_SECTION = 'basics' as const;

/**
 * Weighted completeness checklist mirroring AGENT-PROFILE-MODEL.json
 * `trustAndCompleteness`. `weight` is the points the bucket contributes (and
 * caps at). `met` reads the live preview projection; the highest-weight unmet
 * item becomes the ring's "next best action". Ordered by weight desc.
 */
export const COMPLETENESS_CHECKLIST: readonly CompletenessSuggestion[] = [
  { key: 'verifiedCredential', labelKey: 'suggestionVerifiedCredential', weight: 18 },
  { key: 'schoolAuthorisation', labelKey: 'suggestionSchoolAuthorisation', weight: 16 },
  { key: 'photo', labelKey: 'suggestionPhoto', weight: 10 },
  { key: 'feeTransparency', labelKey: 'suggestionFeeTransparency', weight: 8 },
  { key: 'bio', labelKey: 'suggestionBio', weight: 8 },
  { key: 'languages', labelKey: 'suggestionLanguages', weight: 6 },
  { key: 'contactChannel', labelKey: 'suggestionContactChannel', weight: 6 },
  { key: 'office', labelKey: 'suggestionOffice', weight: 6 },
  { key: 'ethics', labelKey: 'suggestionEthics', weight: 6 },
  { key: 'testimonials', labelKey: 'suggestionTestimonials', weight: 6 },
  { key: 'counsellor', labelKey: 'suggestionCounsellor', weight: 4 },
  { key: 'successStory', labelKey: 'suggestionSuccessStory', weight: 4 },
  { key: 'externalRating', labelKey: 'suggestionExternalRating', weight: 2 },
] as const;

export const COMPLETENESS_COMPLETE_THRESHOLD = 100 as const;

// --- Compliance / fee / availability (Task 097) -----------------------------

/** `feeModel` options for ComplianceEditor; values mirror the BE enumeration. */
export const AGENT_FEE_MODELS: readonly Exclude<AgentFeeModel, ''>[] = [
  'free_to_family_school_commission',
  'family_paid_advisory',
  'hybrid',
] as const;

/** `availabilityStatus` options for ComplianceEditor. */
export const AGENT_AVAILABILITY_STATUSES: readonly Exclude<AgentAvailabilityStatus, ''>[] = [
  'accepting',
  'limited',
  'closed',
] as const;

/**
 * The boolean ethics/commitment scalars rendered as one switch each in the
 * ComplianceEditor. `key` is the UpdateAgentProfilePayload field; `labelKey` and
 * `descriptionKey` resolve in the AgentProfileBuilder namespace.
 */
export const AGENT_COMPLIANCE_FLAGS = [
  {
    key: 'writtenAgreementOffered',
    labelKey: 'complianceWrittenAgreementLabel',
    descriptionKey: 'complianceWrittenAgreementHint',
  },
  {
    key: 'noGuaranteeStatement',
    labelKey: 'complianceNoGuaranteeLabel',
    descriptionKey: 'complianceNoGuaranteeHint',
  },
  {
    key: 'agentCodeOfEthicsSigned',
    labelKey: 'complianceCodeOfEthicsLabel',
    descriptionKey: 'complianceCodeOfEthicsHint',
  },
  {
    key: 'protectsMinorsCommitment',
    labelKey: 'complianceProtectsMinorsLabel',
    descriptionKey: 'complianceProtectsMinorsHint',
  },
  {
    key: 'handlesUnder18',
    labelKey: 'complianceHandlesUnder18Label',
    descriptionKey: 'complianceHandlesUnder18Hint',
  },
] as const;

/**
 * One toggle row per public section in the VisibilityPanel. `key` is the
 * `sectionVisibility` json flag; `labelKey` reuses the builder section labels so
 * the panel reads as the same section names the agent edits. `showCustomSections`
 * is intentionally omitted — custom-section visibility is per-item via each
 * entry's own `isVisible` switch (Task 096), not a single panel toggle.
 */
export const AGENT_VISIBILITY_SECTIONS: readonly AgentVisibilitySectionConfig[] = [
  { key: 'showCredentials', labelKey: 'sectionCredentials' },
  { key: 'showSchoolAuthorisations', labelKey: 'sectionSchoolAuthorisations' },
  { key: 'showLegalIdentity', labelKey: 'sectionLegalIdentity' },
  { key: 'showOffices', labelKey: 'sectionOffices' },
  { key: 'showContactChannels', labelKey: 'sectionContactChannels' },
  { key: 'showLanguages', labelKey: 'sectionLanguages' },
  { key: 'showCounsellors', labelKey: 'sectionCounsellors' },
  { key: 'showServices', labelKey: 'sectionServices' },
  { key: 'showWelfareServices', labelKey: 'sectionWelfareServices' },
  { key: 'showSuccessMetrics', labelKey: 'sectionSuccessMetrics' },
  { key: 'showFeeTransparency', labelKey: 'sectionFeeTransparency' },
  { key: 'showEthicsCommitments', labelKey: 'sectionEthicsCommitments' },
  { key: 'showTestimonials', labelKey: 'sectionTestimonials' },
  { key: 'showSuccessStories', labelKey: 'sectionSuccessStories' },
  { key: 'showExperienceTimeline', labelKey: 'sectionExperienceTimeline' },
  { key: 'showMemberships', labelKey: 'sectionMemberships' },
  { key: 'showAwards', labelKey: 'sectionAwards' },
  { key: 'showMarketsAndDestinations', labelKey: 'sectionMarketsAndDestinations' },
  { key: 'showProcessSteps', labelKey: 'sectionProcessSteps' },
  { key: 'showMediaGallery', labelKey: 'sectionMediaGallery' },
  { key: 'showPressAndPartners', labelKey: 'sectionPressAndPartners' },
  { key: 'showFaqs', labelKey: 'sectionFaqs' },
  { key: 'showResponsiveness', labelKey: 'sectionResponsiveness' },
] as const;
