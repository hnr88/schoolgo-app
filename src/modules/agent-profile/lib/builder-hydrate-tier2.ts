import type {
  AwardItem,
  AwardRecipientType,
  CustomSectionItem,
  CustomSectionType,
  DestinationItem,
  ExperienceEntryItem,
  FaqItem,
  MarketServedItem,
  MediaItem,
  MediaItemCategory,
  MediaItemType,
  PressItem,
  PressItemType,
  ProcessStepItem,
  ProfessionalMembershipItem,
  SchoolLevel,
  SuccessStoryItem,
} from '@/modules/agent-profile/types/editor-items.types';
import {
  hydrateArray,
  pickBool,
  pickEnumOr,
  pickList,
  pickNum,
  pickNumStr,
  pickStr,
} from '@/modules/agent-profile/lib/builder-hydrate-fields';

function pickSchoolLevels(value: unknown): SchoolLevel[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is SchoolLevel => v === 'primary' || v === 'secondary');
}

export function hydrateSuccessStories(raw: unknown): SuccessStoryItem[] {
  return hydrateArray(raw, (r, i) => ({
    title: pickStr(r, 'title'),
    studentInitials: pickStr(r, 'studentInitials'),
    studentHomeCountry: pickStr(r, 'studentHomeCountry'),
    schoolPlacedAt: pickStr(r, 'schoolPlacedAt'),
    yearLevel: pickStr(r, 'yearLevel'),
    narrative: pickStr(r, 'narrative'),
    outcomeHighlights: pickStr(r, 'outcomeHighlights'),
    media: [],
    consentObtained: pickBool(r, 'consentObtained'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateExperience(raw: unknown): ExperienceEntryItem[] {
  return hydrateArray(raw, (r, i) => ({
    roleTitle: pickStr(r, 'roleTitle'),
    organisation: pickStr(r, 'organisation'),
    startDate: pickStr(r, 'startDate'),
    endDate: pickStr(r, 'endDate'),
    location: pickStr(r, 'location'),
    description: pickStr(r, 'description'),
    studentCohortFocus: pickStr(r, 'studentCohortFocus'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateMemberships(raw: unknown): ProfessionalMembershipItem[] {
  return hydrateArray(raw, (r, i) => ({
    organisation: pickStr(r, 'organisation'),
    membershipLevel: pickStr(r, 'membershipLevel'),
    memberSince: pickStr(r, 'memberSince'),
    memberId: pickStr(r, 'memberId'),
    verificationUrl: pickStr(r, 'verificationUrl'),
    logo: null,
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateAwards(raw: unknown): AwardItem[] {
  return hydrateArray(raw, (r, i) => ({
    awardName: pickStr(r, 'awardName'),
    awardingBody: pickStr(r, 'awardingBody'),
    year: pickNumStr(r, 'year'),
    recipientType: pickEnumOr<AwardRecipientType>(r, 'recipientType', 'agency'),
    recipientName: pickStr(r, 'recipientName'),
    url: pickStr(r, 'url'),
    logo: null,
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateMarkets(raw: unknown): MarketServedItem[] {
  return hydrateArray(raw, (r, i) => ({
    sourceCountry: pickStr(r, 'sourceCountry'),
    countryFlag: pickStr(r, 'countryFlag'),
    regions: pickList(r, 'regions'),
    isPrimary: pickBool(r, 'isPrimary'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateDestinations(raw: unknown): DestinationItem[] {
  return hydrateArray(raw, (r, i) => ({
    country: pickStr(r, 'country'),
    countryFlag: pickStr(r, 'countryFlag'),
    australianStates: pickList(r, 'australianStates'),
    schoolLevels: pickSchoolLevels(r.schoolLevels),
    isPrimaryDestination: pickBool(r, 'isPrimaryDestination'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateProcess(raw: unknown): ProcessStepItem[] {
  return hydrateArray(raw, (r, i) => ({
    stepNumber: pickNumStr(r, 'stepNumber'),
    title: pickStr(r, 'title'),
    description: pickStr(r, 'description'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateMedia(raw: unknown): MediaItem[] {
  return hydrateArray(raw, (r, i) => ({
    mediaType: pickEnumOr<MediaItemType>(r, 'mediaType', 'photo'),
    media: null,
    videoUrl: pickStr(r, 'videoUrl'),
    caption: pickStr(r, 'caption'),
    category: pickEnumOr<MediaItemCategory>(r, 'category', 'office'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydratePress(raw: unknown): PressItem[] {
  return hydrateArray(raw, (r, i) => ({
    itemType: pickEnumOr<PressItemType>(r, 'itemType', 'press'),
    title: pickStr(r, 'title'),
    organisation: pickStr(r, 'organisation'),
    date: pickStr(r, 'date'),
    url: pickStr(r, 'url'),
    logo: null,
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateFaqs(raw: unknown): FaqItem[] {
  return hydrateArray(raw, (r, i) => ({
    question: pickStr(r, 'question'),
    answer: pickStr(r, 'answer'),
    topicTag: pickStr(r, 'topicTag'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateCustomSections(raw: unknown): CustomSectionItem[] {
  return hydrateArray(raw, (r, i) => ({
    title: pickStr(r, 'title'),
    sectionType: pickEnumOr<CustomSectionType>(r, 'sectionType', 'rich_text'),
    body: pickStr(r, 'body'),
    media: [],
    url: pickStr(r, 'url'),
    fileAttachment: null,
    isVisible: pickBool(r, 'isVisible'),
    order: pickNum(r, 'order') || i,
  }));
}
