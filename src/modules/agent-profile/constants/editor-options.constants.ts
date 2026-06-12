import type {
  AwardRecipientType,
  CustomSectionType,
  MediaItemCategory,
  MediaItemType,
  PressItemType,
  SchoolLevel,
} from '@/modules/agent-profile/types/editor-items.types';

/**
 * Enum option lists for the repeatable per-section editors (Tasks 093-095).
 * Values mirror the Strapi component enums in AGENT-PROFILE-MODEL.json; the
 * `optionXxx` i18n keys (AgentProfileBuilder namespace) render the labels.
 */

export const AWARD_RECIPIENT_TYPES: readonly AwardRecipientType[] = [
  'agency',
  'individual',
] as const;

export const SCHOOL_LEVELS: readonly SchoolLevel[] = ['primary', 'secondary'] as const;

export const MEDIA_ITEM_TYPES: readonly MediaItemType[] = [
  'photo',
  'video_url',
  'video_file',
] as const;

export const MEDIA_ITEM_CATEGORIES: readonly MediaItemCategory[] = [
  'office',
  'team',
  'event',
  'intro_video',
] as const;

export const PRESS_ITEM_TYPES: readonly PressItemType[] = [
  'press',
  'partner_logo',
  'recognition',
] as const;

export const CUSTOM_SECTION_TYPES: readonly CustomSectionType[] = [
  'rich_text',
  'stat',
  'link',
  'file',
  'media',
  'list',
] as const;
