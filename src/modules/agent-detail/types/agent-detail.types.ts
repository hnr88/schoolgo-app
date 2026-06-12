// Public agent profile — mirrors the backend hand-built projection returned by
// `GET /api/agents/public/:slug` (Strapi service buildPublicAgentProjection).
// FE and BE MUST stay in sync: any field here exists in that projection.

/** Sort-ordered repeatable component item (every section item carries `order`). */
export interface OrderedItem {
  order?: number | null;
}

export interface AgentCredential extends OrderedItem {
  credentialType?: string | null;
  issuingBody?: string | null;
  registrationNumber?: string | null;
  holderName?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  scope?: string | null;
  verificationUrl?: string | null;
  verificationStatus?: string | null;
  badgeImage?: { url?: string | null; name?: string | null } | null;
}

export interface OfficeLocation extends OrderedItem {
  label?: string | null;
  streetAddress?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  regionGrouping?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: string | null;
  timezone?: string | null;
  isHeadOffice?: boolean | null;
  inPersonConsultation?: boolean | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ContactChannel extends OrderedItem {
  channelType?: string | null;
  handleOrUrl?: string | null;
  displayLabel?: string | null;
  isPrimary?: boolean | null;
}

export interface SpokenLanguage extends OrderedItem {
  language?: string | null;
  proficiency?: string | null;
  canCounselInThisLanguage?: boolean | null;
}

export interface Counsellor extends OrderedItem {
  fullName?: string | null;
  localScriptName?: string | null;
  photo?: { url?: string | null } | null;
  roleTitle?: string | null;
  qeacNumber?: string | null;
  maraNumber?: string | null;
  qualifications?: string | null;
  yearsExperience?: number | null;
  languages?: unknown;
  specialisations?: string | null;
  bio?: string | null;
  email?: string | null;
  officeCity?: string | null;
  bookingUrl?: string | null;
}

export interface AgentService extends OrderedItem {
  serviceName?: string | null;
  description?: string | null;
  category?: string | null;
  isFree?: boolean | null;
  icon?: string | null;
}

export interface WelfareCapability extends OrderedItem {
  capability?: string | null;
  description?: string | null;
  framing?: string | null;
}

export interface Testimonial extends OrderedItem {
  reviewerName?: string | null;
  reviewerType?: string | null;
  reviewerCountry?: string | null;
  ratingStars?: number | null;
  quote?: string | null;
  schoolPlacedAt?: string | null;
  year?: number | null;
  photo?: { url?: string | null } | null;
  verifiedPlacement?: boolean | null;
  sourcePlatform?: string | null;
}

export interface SuccessStory extends OrderedItem {
  title?: string | null;
  studentInitials?: string | null;
  studentHomeCountry?: string | null;
  schoolPlacedAt?: string | null;
  yearLevel?: string | null;
  narrative?: string | null;
  outcomeHighlights?: string | null;
  media?: { url?: string | null; mime?: string | null; name?: string | null }[] | null;
  consentObtained?: boolean | null;
}

export interface ExperienceEntry extends OrderedItem {
  roleTitle?: string | null;
  organisation?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  description?: string | null;
  studentCohortFocus?: string | null;
}

export interface ProfessionalMembership extends OrderedItem {
  organisation?: string | null;
  membershipLevel?: string | null;
  memberSince?: string | null;
  memberId?: string | null;
  verificationUrl?: string | null;
  logo?: { url?: string | null } | null;
}

export interface Award extends OrderedItem {
  awardName?: string | null;
  awardingBody?: string | null;
  year?: number | null;
  recipientType?: string | null;
  recipientName?: string | null;
  url?: string | null;
  logo?: { url?: string | null } | null;
}

export interface MarketServed extends OrderedItem {
  sourceCountry?: string | null;
  countryFlag?: string | null;
  regions?: string | null;
  isPrimary?: boolean | null;
}

export interface Destination extends OrderedItem {
  country?: string | null;
  countryFlag?: string | null;
  australianStates?: string | null;
  schoolLevels?: unknown;
  isPrimaryDestination?: boolean | null;
}

export interface ProcessStep extends OrderedItem {
  stepNumber?: number | null;
  title?: string | null;
  description?: string | null;
}

export interface MediaItem extends OrderedItem {
  mediaType?: string | null;
  media?: { url?: string | null; mime?: string | null; name?: string | null } | null;
  videoUrl?: string | null;
  caption?: string | null;
  category?: string | null;
}

export interface PressItem extends OrderedItem {
  itemType?: string | null;
  title?: string | null;
  organisation?: string | null;
  date?: string | null;
  url?: string | null;
  logo?: { url?: string | null } | null;
}

export interface Faq extends OrderedItem {
  question?: string | null;
  answer?: string | null;
  topicTag?: string | null;
}

export interface CustomSection extends OrderedItem {
  title?: string | null;
  sectionType?: string | null;
  body?: string | null;
  media?: { url?: string | null; mime?: string | null; name?: string | null }[] | null;
  url?: string | null;
  fileAttachment?: { url?: string | null; name?: string | null; mime?: string | null } | null;
  isVisible?: boolean | null;
}

/** Active partner school (visibility-gated; computed from agent-partnership). */
export interface PartnerSchool {
  schoolDocumentId: string;
  slug: string | null;
  name: string;
  suburb: string | null;
  state: string | null;
  logoUrl: string | null;
}

/** Grouped scalar blocks — present only when their visibility toggle is on. */
export interface LegalIdentitySection {
  legalEntityName: string | null;
  tradingName: string | null;
  directorName: string | null;
  countryOfRegistration: string | null;
  businessRegistration: string | null;
  yearEstablished: number | null;
}

export interface SuccessMetricsSection {
  studentsPlacedTotal: number | null;
  studentsPlacedAsOfYear: number | null;
  studentsPlacedPlatformVerified: number | null;
  partnerSchoolsCount: number | null;
  visaSuccessRateAU: number | null;
  placementsLast12Months: number | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  externalReviewUrl: string | null;
}

export interface FeeTransparencySection {
  feeModel: string | null;
  feeTransparencyStatement: string | null;
  writtenAgreementOffered: boolean;
}

export interface EthicsCommitmentsSection {
  agentCodeOfEthicsSigned: boolean;
  protectsMinorsCommitment: boolean;
  noGuaranteeStatement: boolean;
  handlesUnder18: boolean;
}

export interface ResponsivenessSection {
  medianResponseTimeHours: number | null;
  responseRate: number | null;
  availabilityStatus: string | null;
}

/**
 * The `sections` object on the projection. Every key is optional — the backend
 * includes a key only when its per-section visibility toggle is on (and, for
 * component arrays, only when non-empty).
 */
export interface AgentDetailSections {
  legalIdentity?: LegalIdentitySection;
  successMetrics?: SuccessMetricsSection;
  feeTransparency?: FeeTransparencySection;
  ethicsCommitments?: EthicsCommitmentsSection;
  responsiveness?: ResponsivenessSection;
  credentials?: AgentCredential[];
  officeLocations?: OfficeLocation[];
  contactChannels?: ContactChannel[];
  spokenLanguages?: SpokenLanguage[];
  counsellors?: Counsellor[];
  services?: AgentService[];
  welfareCapabilities?: WelfareCapability[];
  testimonials?: Testimonial[];
  successStories?: SuccessStory[];
  experienceEntries?: ExperienceEntry[];
  professionalMemberships?: ProfessionalMembership[];
  awards?: Award[];
  marketsServed?: MarketServed[];
  destinations?: Destination[];
  processSteps?: ProcessStep[];
  mediaItems?: MediaItem[];
  pressItems?: PressItem[];
  faqs?: Faq[];
  customSections?: CustomSection[];
  partnerSchools?: PartnerSchool[];
}

/**
 * Identity + optional school context the "Talk to this agent" CTA carries to the
 * ContactAgentDialog (the agent-detail ContactAgentCard renders the dialog with it).
 */
export interface AgentContactContext {
  agentDocumentId: string;
  agentSlug: string | null;
  agentName: string;
  schoolDocumentId?: string | null;
  schoolName?: string | null;
}

/**
 * Full public agent profile — the `data` payload of `GET /api/agents/public/:slug`.
 * Top-level scalars are always present on a published profile; section blocks
 * live under `sections` and are visibility-gated.
 */
export interface AgentDetail {
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
  completenessScore: number;
  trustTier: string;
  qeacValidationStatus: string;
  maraValidationStatus: string;
  qeacNumber: string | null;
  maraNumber: string | null;
  platformAuthorisedBadge: boolean;
  esosPrismsRecorded: boolean;
  sections: AgentDetailSections;
}
