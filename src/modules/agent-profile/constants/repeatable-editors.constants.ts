import type {
  ContactChannelType,
  LanguageProficiency,
  ServiceCategory,
  TestimonialReviewerType,
  WelfareCapabilityType,
  WelfareFraming,
} from '@/modules/agent-profile/types/repeatable-item.types';

/**
 * Enum option lists for the repeatable per-section editors. Values mirror the
 * `shared.<name>` component enums in AGENT-PROFILE-MODEL.json exactly; the FE
 * renders each as a `<Select>` and the BE replace-array `updateMe` persists the
 * raw value. Labels are i18n keys resolved under the `AgentProfileBuilder`
 * namespace (e.g. `channelType_wechat`).
 */

export const CONTACT_CHANNEL_TYPES: readonly ContactChannelType[] = [
  'wechat',
  'wechat_official',
  'xiaohongshu',
  'douyin',
  'kakaotalk',
  'zalo',
  'line',
  'whatsapp',
  'facebook',
  'instagram',
  'tiktok',
  'linkedin',
  'youtube',
  'phone',
  'email',
  'booking_link',
] as const;

export const LANGUAGE_PROFICIENCIES: readonly LanguageProficiency[] = [
  'native',
  'fluent',
  'professional',
  'conversational',
] as const;

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  'counselling',
  'application',
  'visa',
  'scholarship',
  'english_prep',
  'accommodation',
  'under18_welfare',
  'post_arrival',
] as const;

export const WELFARE_CAPABILITIES: readonly WelfareCapabilityType[] = [
  'guardianship',
  'homestay',
  'caaw_coordination',
  'airport_pickup',
  'oshc_setup',
  'pre_departure',
  'settlement_aftercare',
  'welfare_checkins',
] as const;

export const WELFARE_FRAMINGS: readonly WelfareFraming[] = [
  'we_arrange',
  'we_coordinate',
  'we_refer',
] as const;

export const TESTIMONIAL_REVIEWER_TYPES: readonly TestimonialReviewerType[] = [
  'parent',
  'student',
] as const;
