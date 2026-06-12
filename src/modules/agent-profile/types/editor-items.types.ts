import type { UploadedMedia } from '@/modules/forms';

// Single source of truth lives in editor.types.ts; re-exported here so editors
// can import their props alongside their item shape from one module.
export type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

/**
 * Item shapes for the repeatable per-section editors (Tasks 093-095). Each
 * mirrors a Strapi `shared.<name>` repeatable component in AGENT-PROFILE-MODEL.json.
 * `order` is re-stamped by `useRepeatableSection` on every mutation. `media`
 * fields hold the editor's local `UploadedMedia` (its `id` is what the save layer
 * persists as the component's media relation); the BE replace-array mapping is
 * owned by the wiring layer (round 3), consistent with `UpdateAgentProfilePayload`
 * keeping these arrays loosely typed.
 */

// --- 093: success stories + experience -------------------------------------

export interface SuccessStoryItem {
  title: string;
  studentInitials: string;
  studentHomeCountry: string;
  schoolPlacedAt: string;
  yearLevel: string;
  narrative: string;
  outcomeHighlights: string;
  media: UploadedMedia[];
  consentObtained: boolean;
  order: number;
}

export interface ExperienceEntryItem {
  roleTitle: string;
  organisation: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  studentCohortFocus: string;
  order: number;
}

// --- 094: memberships + awards + markets + destinations --------------------

export interface ProfessionalMembershipItem {
  organisation: string;
  membershipLevel: string;
  memberSince: string;
  memberId: string;
  verificationUrl: string;
  logo: UploadedMedia | null;
  order: number;
}

export type AwardRecipientType = 'agency' | 'individual';

export interface AwardItem {
  awardName: string;
  awardingBody: string;
  year: string;
  recipientType: AwardRecipientType;
  recipientName: string;
  url: string;
  logo: UploadedMedia | null;
  order: number;
}

export interface MarketServedItem {
  sourceCountry: string;
  countryFlag: string;
  regions: string;
  isPrimary: boolean;
  order: number;
}

export type SchoolLevel = 'primary' | 'secondary';

export interface DestinationItem {
  country: string;
  countryFlag: string;
  australianStates: string;
  schoolLevels: SchoolLevel[];
  isPrimaryDestination: boolean;
  order: number;
}

// --- 095: process + media + press + faq ------------------------------------

export interface ProcessStepItem {
  stepNumber: string;
  title: string;
  description: string;
  order: number;
}

export type MediaItemType = 'photo' | 'video_url' | 'video_file';
export type MediaItemCategory = 'office' | 'team' | 'event' | 'intro_video';

export interface MediaItem {
  mediaType: MediaItemType;
  media: UploadedMedia | null;
  videoUrl: string;
  caption: string;
  category: MediaItemCategory;
  order: number;
}

export type PressItemType = 'press' | 'partner_logo' | 'recognition';

export interface PressItem {
  itemType: PressItemType;
  title: string;
  organisation: string;
  date: string;
  url: string;
  logo: UploadedMedia | null;
  order: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  topicTag: string;
  order: number;
}

// --- 096: custom sections (escape hatch) -----------------------------------

export type CustomSectionType = 'rich_text' | 'stat' | 'link' | 'file' | 'media' | 'list';

/**
 * `shared.custom-section` — the escape hatch delivering "endless info in any
 * format". `sectionType` swaps which format input is shown (rich-text/stat/list
 * → body, link → url, file → fileAttachment, media → media gallery). All fields
 * persist so switching type never drops data; each row carries its own
 * `isVisible` toggle (custom sections are not gated by the visibility panel).
 */
export interface CustomSectionItem {
  title: string;
  sectionType: CustomSectionType;
  body: string;
  media: UploadedMedia[];
  url: string;
  fileAttachment: UploadedMedia | null;
  isVisible: boolean;
  order: number;
}
