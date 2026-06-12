import type { LucideIcon } from 'lucide-react';
import type { UploadedMedia } from '@/modules/forms';

export type AgentVerificationStep =
  | 'email_verified'
  | 'profile_completed'
  | 'document_uploaded'
  | 'admin_review';

export type AgentAdminReviewStatus =
  | 'pending_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

export interface AgentVerificationChecklistItem {
  step: AgentVerificationStep;
  done: boolean;
  status?: AgentAdminReviewStatus;
}

export interface AgentVerificationStatus {
  emailVerified: boolean;
  profileCompleted: boolean;
  documentUploaded: boolean;
  adminReview: AgentAdminReviewStatus;
  verified: boolean;
  qeacCertified: boolean;
  checklist: AgentVerificationChecklistItem[];
}

export type AgentOnboardingStepKey =
  | 'email_verified'
  | 'profile_completed'
  | 'document_uploaded'
  | 'verification_submitted'
  | 'first_student_added'
  | 'first_application_created';

export interface AgentOnboardingStep {
  key: AgentOnboardingStepKey;
  completed: boolean;
}

export interface AgentOnboarding {
  steps: AgentOnboardingStep[];
  completedCount: number;
  totalCount: number;
  allComplete: boolean;
}

export interface AgentOnboardingStepConfig {
  key: AgentOnboardingStepKey;
  labelKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
}

export interface AgentPublicPreview {
  documentId: string;
  companyName: string;
  roleTitle: string | null;
  countryOfOperation: string | null;
  website: string | null;
  bio: string | null;
  qeacNumber: string | null;
  qeacValidationStatus: 'none' | 'pending' | 'verified';
  verified: boolean;
  profilePhoto: { url: string } | null;
  fullName: string;
}

export interface UpdatePublicProfilePayload {
  companyName?: string;
  roleTitle?: string;
  countryOfOperation?: string;
  qeacNumber?: string;
  phone?: string;
  website?: string;
  bio?: string;
}

// --- Profile builder (Task 085) ---------------------------------------------

/**
 * Per-section visibility map the agent edits in the builder. Mirrors the
 * backend `sectionVisibility` json (AGENT-PROFILE-MODEL.json visibilityToggles).
 * Every key is optional; an absent/false toggle means the public page hides
 * that section.
 */
export type AgentSectionVisibility = Partial<Record<AgentBuilderSectionKey, boolean>>;

export type AgentBuilderSectionKey =
  | 'showCredentials'
  | 'showSchoolAuthorisations'
  | 'showLegalIdentity'
  | 'showOffices'
  | 'showContactChannels'
  | 'showLanguages'
  | 'showCounsellors'
  | 'showServices'
  | 'showWelfareServices'
  | 'showSuccessMetrics'
  | 'showFeeTransparency'
  | 'showEthicsCommitments'
  | 'showTestimonials'
  | 'showSuccessStories'
  | 'showExperienceTimeline'
  | 'showMemberships'
  | 'showAwards'
  | 'showMarketsAndDestinations'
  | 'showProcessSteps'
  | 'showMediaGallery'
  | 'showPressAndPartners'
  | 'showFaqs'
  | 'showResponsiveness'
  | 'showCustomSections';

/**
 * The shape `GET /api/agents/me/public-preview` returns (transformResponse →
 * `{ data, meta }`). It is the public projection (scalars + `sections` map +
 * `partnerSchools`) PLUS the self-only builder context: visibility map, live
 * `completeness`, the stored `completenessScore`, `publicProfileEnabled`, and
 * `status`. The projection's `sections` is intentionally loose — round 2 builds
 * the typed per-section editors that read it.
 */
export interface AgentPublicProfilePreview {
  documentId: string;
  slug: string | null;
  displayName: string | null;
  companyName: string | null;
  tradingName: string | null;
  roleTitle: string | null;
  headline: string | null;
  tagline: string | null;
  publicSummary: string | null;
  bio: string | null;
  website: string | null;
  countryOfOperation: string | null;
  photoUrl: string | null;
  coverPhotoUrl: string | null;
  contactName: string;
  availabilityStatus: string | null;
  handlesUnder18: boolean;
  verified: boolean;
  trustTier: string;
  qeacValidationStatus: string;
  maraValidationStatus: string;
  qeacNumber: string | null;
  maraNumber: string | null;
  platformAuthorisedBadge: boolean;
  esosPrismsRecorded: boolean;
  sections: Record<string, unknown>;
  // self-only builder context
  publicProfileEnabled: boolean;
  status: string;
  visibility: AgentSectionVisibility;
  completeness: number;
  completenessScore: number;
}

/**
 * Editable fields accepted by `PUT /api/agents/me` (updateMe). Mirrors the BE
 * ALLOWED_PROFILE_FIELDS set: scalars + repeatable component arrays (replace
 * semantics). Repeatable component values stay loosely typed here — round 2's
 * per-section editors own their item shapes.
 */
export interface UpdateAgentProfilePayload {
  // legacy editable scalars
  companyName?: string;
  roleTitle?: string;
  phone?: string;
  website?: string;
  bio?: string;
  profilePhoto?: number | null;
  countryOfOperation?: string;
  qeacNumber?: string;
  businessRegistration?: string;
  // identity / branding
  displayName?: string;
  headline?: string;
  tagline?: string;
  publicSummary?: string;
  tradingName?: string;
  legalEntityName?: string;
  directorName?: string;
  countryOfRegistration?: string;
  yearEstablished?: number;
  logo?: number | null;
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
  // credentials fast-path
  maraNumber?: string;
  // metrics (self-reported)
  studentsPlacedTotal?: number;
  studentsPlacedAsOfYear?: number;
  partnerSchoolsCount?: number;
  visaSuccessRateAU?: number;
  googleRating?: number;
  googleReviewCount?: number;
  externalReviewUrl?: string;
  // fee / ethics / welfare commitments
  feeModel?: string;
  feeTransparencyStatement?: string;
  writtenAgreementOffered?: boolean;
  noGuaranteeStatement?: boolean;
  agentCodeOfEthicsSigned?: boolean;
  protectsMinorsCommitment?: boolean;
  handlesUnder18?: boolean;
  esosPrismsRecorded?: boolean;
  // availability + public toggles
  availabilityStatus?: string;
  publicProfileEnabled?: boolean;
  sectionVisibility?: AgentSectionVisibility;
  // slug (handled specially by the BE: shape + uniqueness checked)
  slug?: string;
  // repeatable component arrays — replace-array semantics
  credentials?: unknown[];
  officeLocations?: unknown[];
  contactChannels?: unknown[];
  spokenLanguages?: unknown[];
  counsellors?: unknown[];
  services?: unknown[];
  welfareCapabilities?: unknown[];
  testimonials?: unknown[];
  successStories?: unknown[];
  experienceEntries?: unknown[];
  professionalMemberships?: unknown[];
  awards?: unknown[];
  marketsServed?: unknown[];
  destinations?: unknown[];
  processSteps?: unknown[];
  mediaItems?: unknown[];
  pressItems?: unknown[];
  faqs?: unknown[];
  customSections?: unknown[];
}

/**
 * The single highest-impact missing item the completeness ring suggests next.
 * `weight` is the points the agent gains by completing it (drives ordering).
 */
export interface CompletenessSuggestion {
  key: string;
  labelKey: string;
  weight: number;
}

// --- Identity & basics editor (Task 087) ------------------------------------

/**
 * The identity/branding scalar slice the IdentityEditor edits. A flat subset of
 * UpdateAgentProfilePayload kept controlled by the form; `yearEstablished` stays
 * a string in the form (number input) and is coerced on save. Media uploads
 * (logo/cover/photo) are handled separately and sent as numeric relation ids.
 */
export interface AgentIdentityValues {
  displayName: string;
  headline: string;
  tagline: string;
  publicSummary: string;
  legalEntityName: string;
  tradingName: string;
  directorName: string;
  countryOfRegistration: string;
  yearEstablished: string;
  website: string;
  phone: string;
}

// --- Credentials editor (Task 088) ------------------------------------------

/** Credential type. Mirrors the `shared.agent-credential` credentialType enum. */
export type AgentCredentialType =
  | 'qeac'
  | 'qeacs'
  | 'mara_omara'
  | 'icef_agency_status'
  | 'itac'
  | 'nz_adviser'
  | 'other';

/** Per-credential verification state. Mirrors the component verificationStatus enum. */
export type AgentCredentialVerificationStatus = 'verified' | 'pending' | 'unverified';

/**
 * One `shared.agent-credential` row as edited in the builder. Mirrors the BE
 * component fields. `badgeImage` holds the uploaded-media object the editor
 * carries before persist normalises it to a numeric relation id (the read-side
 * preview returns a populated media object, so the id is not round-tripped from
 * the projection). Empty strings are normalised to undefined on save.
 */
export interface AgentCredentialItem {
  credentialType: AgentCredentialType;
  issuingBody: string;
  registrationNumber: string;
  holderName: string;
  issueDate: string;
  expiryDate: string;
  scope: string;
  verificationUrl: string;
  verificationStatus: AgentCredentialVerificationStatus;
  badgeImage: UploadedMedia | null;
  order: number;
}

// --- Offices editor (Task 089) ----------------------------------------------

/**
 * One `shared.office-location` row as edited in the builder. Mirrors the BE
 * component fields including the geo coordinates that power map/proximity
 * search. `latitude`/`longitude` are kept as strings in the form (number inputs)
 * and coerced to numbers on save.
 */
export interface AgentOfficeLocationItem {
  label: string;
  streetAddress: string;
  suburb: string;
  city: string;
  state: string;
  country: string;
  regionGrouping: string;
  phone: string;
  email: string;
  openingHours: string;
  timezone: string;
  isHeadOffice: boolean;
  inPersonConsultation: boolean;
  latitude: string;
  longitude: string;
  order: number;
}

// --- Compliance / fee / ethics scalars (Task 097) ---------------------------

/** Who pays the agent. Mirrors the `feeModel` enumeration. */
export type AgentFeeModel =
  | ''
  | 'free_to_family_school_commission'
  | 'family_paid_advisory'
  | 'hybrid';

/** Current capacity to take new families. Mirrors `availabilityStatus`. */
export type AgentAvailabilityStatus = '' | 'accepting' | 'limited' | 'closed';

/**
 * The fee/ethics/availability scalar slice the ComplianceEditor edits. A flat
 * subset of UpdateAgentProfilePayload kept controlled by the builder; the editor
 * emits a partial patch on every change (replace semantics per field).
 */
export interface AgentComplianceValues {
  feeModel: AgentFeeModel;
  feeTransparencyStatement: string;
  writtenAgreementOffered: boolean;
  noGuaranteeStatement: boolean;
  agentCodeOfEthicsSigned: boolean;
  protectsMinorsCommitment: boolean;
  handlesUnder18: boolean;
  availabilityStatus: AgentAvailabilityStatus;
}

/**
 * Controlled props for the ComplianceEditor. `values` is the current scalar
 * slice; `onChange` returns a partial patch (one or more changed fields) the
 * builder merges and persists via `updateMe`. `disabled` mirrors saving state.
 */
export interface AgentComplianceEditorProps {
  values: AgentComplianceValues;
  onChange: (patch: Partial<AgentComplianceValues>) => void;
  disabled?: boolean;
}

/** Config for one toggle row in the VisibilityPanel (Task 097). */
export interface AgentVisibilitySectionConfig {
  key: AgentBuilderSectionKey;
  labelKey: string;
}

/**
 * Controlled props for the VisibilityPanel. `visibility` is the current
 * `sectionVisibility` map; `onChange` returns a partial patch (the single
 * toggled key) the builder merges into the map and persists via `updateMe`.
 */
export interface AgentVisibilityPanelProps {
  visibility: AgentSectionVisibility;
  onChange: (patch: AgentSectionVisibility) => void;
  disabled?: boolean;
}

/** Config describing one tab/section of the builder shell. */
export interface AgentBuilderSectionConfig {
  id: string;
  labelKey: string;
  icon: LucideIcon;
}
