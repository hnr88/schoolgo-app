import type { UploadedMedia } from '@/modules/forms';

/**
 * Working item shapes for the repeatable per-section editors. Each mirrors a
 * `shared.<name>` Strapi component in AGENT-PROFILE-MODEL.json and carries an
 * `order` integer the logic hook re-stamps. Media fields hold the editor's
 * `UploadedMedia | null` (the `id` is what `updateMe` persists as the relation).
 */

export type ContactChannelType =
  | 'wechat'
  | 'wechat_official'
  | 'xiaohongshu'
  | 'douyin'
  | 'kakaotalk'
  | 'zalo'
  | 'line'
  | 'whatsapp'
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'youtube'
  | 'phone'
  | 'email'
  | 'booking_link';

export interface ContactChannelItem {
  channelType: ContactChannelType | '';
  handleOrUrl: string;
  displayLabel: string;
  isPrimary: boolean;
  order: number;
}

export type LanguageProficiency = 'native' | 'fluent' | 'professional' | 'conversational';

export interface SpokenLanguageItem {
  language: string;
  proficiency: LanguageProficiency | '';
  canCounselInThisLanguage: boolean;
  order: number;
}

export type ServiceCategory =
  | 'counselling'
  | 'application'
  | 'visa'
  | 'scholarship'
  | 'english_prep'
  | 'accommodation'
  | 'under18_welfare'
  | 'post_arrival';

export interface ServiceItem {
  serviceName: string;
  description: string;
  category: ServiceCategory | '';
  isFree: boolean;
  icon: string;
  order: number;
}

export type WelfareCapabilityType =
  | 'guardianship'
  | 'homestay'
  | 'caaw_coordination'
  | 'airport_pickup'
  | 'oshc_setup'
  | 'pre_departure'
  | 'settlement_aftercare'
  | 'welfare_checkins';

export type WelfareFraming = 'we_arrange' | 'we_coordinate' | 'we_refer';

export interface WelfareCapabilityItem {
  capability: WelfareCapabilityType | '';
  description: string;
  framing: WelfareFraming | '';
  order: number;
}

export interface CounsellorItem {
  fullName: string;
  localScriptName: string;
  photo: UploadedMedia | null;
  roleTitle: string;
  qeacNumber: string;
  maraNumber: string;
  qualifications: string;
  yearsExperience: number | null;
  languages: string;
  specialisations: string;
  bio: string;
  email: string;
  officeCity: string;
  bookingUrl: string;
  order: number;
}

export type TestimonialReviewerType = 'parent' | 'student';

export interface TestimonialItem {
  reviewerName: string;
  reviewerType: TestimonialReviewerType | '';
  reviewerCountry: string;
  ratingStars: number | null;
  quote: string;
  schoolPlacedAt: string;
  year: number | null;
  photo: UploadedMedia | null;
  verifiedPlacement: boolean;
  sourcePlatform: string;
  order: number;
}
