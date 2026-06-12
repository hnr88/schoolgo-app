import type {
  AgentCredentialItem,
  AgentCredentialType,
  AgentCredentialVerificationStatus,
  AgentOfficeLocationItem,
} from '@/modules/agent-profile/types/agent-profile.types';
import type {
  ContactChannelItem,
  ContactChannelType,
  CounsellorItem,
  LanguageProficiency,
  ServiceCategory,
  ServiceItem,
  SpokenLanguageItem,
  TestimonialItem,
  TestimonialReviewerType,
  WelfareCapabilityItem,
  WelfareCapabilityType,
  WelfareFraming,
} from '@/modules/agent-profile/types/repeatable-item.types';
import {
  hydrateArray,
  pickBool,
  pickEnum,
  pickEnumOr,
  pickList,
  pickNum,
  pickNumOrNull,
  pickStr,
} from '@/modules/agent-profile/lib/builder-hydrate-fields';

export function hydrateCredentials(raw: unknown): AgentCredentialItem[] {
  return hydrateArray(raw, (r, i) => ({
    credentialType: pickEnumOr<AgentCredentialType>(r, 'credentialType', 'qeac'),
    issuingBody: pickStr(r, 'issuingBody'),
    registrationNumber: pickStr(r, 'registrationNumber'),
    holderName: pickStr(r, 'holderName'),
    issueDate: pickStr(r, 'issueDate'),
    expiryDate: pickStr(r, 'expiryDate'),
    scope: pickStr(r, 'scope'),
    verificationUrl: pickStr(r, 'verificationUrl'),
    verificationStatus: pickEnumOr<AgentCredentialVerificationStatus>(r, 'verificationStatus', 'unverified'),
    badgeImage: null,
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateOffices(raw: unknown): AgentOfficeLocationItem[] {
  return hydrateArray(raw, (r, i) => ({
    label: pickStr(r, 'label'),
    streetAddress: pickStr(r, 'streetAddress'),
    suburb: pickStr(r, 'suburb'),
    city: pickStr(r, 'city'),
    state: pickStr(r, 'state'),
    country: pickStr(r, 'country'),
    regionGrouping: pickStr(r, 'regionGrouping'),
    phone: pickStr(r, 'phone'),
    email: pickStr(r, 'email'),
    openingHours: pickStr(r, 'openingHours'),
    timezone: pickStr(r, 'timezone'),
    isHeadOffice: pickBool(r, 'isHeadOffice'),
    inPersonConsultation: pickBool(r, 'inPersonConsultation'),
    latitude: typeof r.latitude === 'number' ? String(r.latitude) : '',
    longitude: typeof r.longitude === 'number' ? String(r.longitude) : '',
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateChannels(raw: unknown): ContactChannelItem[] {
  return hydrateArray(raw, (r, i) => ({
    channelType: pickEnum<ContactChannelType>(r, 'channelType'),
    handleOrUrl: pickStr(r, 'handleOrUrl'),
    displayLabel: pickStr(r, 'displayLabel'),
    isPrimary: pickBool(r, 'isPrimary'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateLanguages(raw: unknown): SpokenLanguageItem[] {
  return hydrateArray(raw, (r, i) => ({
    language: pickStr(r, 'language'),
    proficiency: pickEnum<LanguageProficiency>(r, 'proficiency'),
    canCounselInThisLanguage: pickBool(r, 'canCounselInThisLanguage'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateServices(raw: unknown): ServiceItem[] {
  return hydrateArray(raw, (r, i) => ({
    serviceName: pickStr(r, 'serviceName'),
    description: pickStr(r, 'description'),
    category: pickEnum<ServiceCategory>(r, 'category'),
    isFree: pickBool(r, 'isFree'),
    icon: pickStr(r, 'icon'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateWelfare(raw: unknown): WelfareCapabilityItem[] {
  return hydrateArray(raw, (r, i) => ({
    capability: pickEnum<WelfareCapabilityType>(r, 'capability'),
    description: pickStr(r, 'description'),
    framing: pickEnum<WelfareFraming>(r, 'framing'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateCounsellors(raw: unknown): CounsellorItem[] {
  return hydrateArray(raw, (r, i) => ({
    fullName: pickStr(r, 'fullName'),
    localScriptName: pickStr(r, 'localScriptName'),
    photo: null,
    roleTitle: pickStr(r, 'roleTitle'),
    qeacNumber: pickStr(r, 'qeacNumber'),
    maraNumber: pickStr(r, 'maraNumber'),
    qualifications: pickStr(r, 'qualifications'),
    yearsExperience: pickNumOrNull(r, 'yearsExperience'),
    languages: pickList(r, 'languages'),
    specialisations: pickStr(r, 'specialisations'),
    bio: pickStr(r, 'bio'),
    email: pickStr(r, 'email'),
    officeCity: pickStr(r, 'officeCity'),
    bookingUrl: pickStr(r, 'bookingUrl'),
    order: pickNum(r, 'order') || i,
  }));
}

export function hydrateTestimonials(raw: unknown): TestimonialItem[] {
  return hydrateArray(raw, (r, i) => ({
    reviewerName: pickStr(r, 'reviewerName'),
    reviewerType: pickEnum<TestimonialReviewerType>(r, 'reviewerType'),
    reviewerCountry: pickStr(r, 'reviewerCountry'),
    ratingStars: pickNumOrNull(r, 'ratingStars'),
    quote: pickStr(r, 'quote'),
    schoolPlacedAt: pickStr(r, 'schoolPlacedAt'),
    year: pickNumOrNull(r, 'year'),
    photo: null,
    verifiedPlacement: pickBool(r, 'verifiedPlacement'),
    sourcePlatform: pickStr(r, 'sourcePlatform'),
    order: pickNum(r, 'order') || i,
  }));
}
