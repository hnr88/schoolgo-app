import type { ComponentType } from 'react';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  RepeatablePayloadKey,
  RepeatableSectionEntry,
} from '@/modules/agent-profile/types/builder-sections.types';
import { CredentialsEditor } from '@/modules/agent-profile/components/editors/CredentialsEditor';
import { OfficesEditor } from '@/modules/agent-profile/components/editors/OfficesEditor';
import { ChannelsEditor } from '@/modules/agent-profile/components/editors/ChannelsEditor';
import { LanguagesEditor } from '@/modules/agent-profile/components/editors/LanguagesEditor';
import { ServicesEditor } from '@/modules/agent-profile/components/editors/ServicesEditor';
import { WelfareEditor } from '@/modules/agent-profile/components/editors/WelfareEditor';
import { CounsellorsEditor } from '@/modules/agent-profile/components/editors/CounsellorsEditor';
import { TestimonialsEditor } from '@/modules/agent-profile/components/editors/TestimonialsEditor';
import { SuccessStoriesEditor } from '@/modules/agent-profile/components/editors/SuccessStoriesEditor';
import { ExperienceEditor } from '@/modules/agent-profile/components/editors/ExperienceEditor';
import { MembershipsEditor } from '@/modules/agent-profile/components/editors/MembershipsEditor';
import { AwardsEditor } from '@/modules/agent-profile/components/editors/AwardsEditor';
import { MarketsEditor } from '@/modules/agent-profile/components/editors/MarketsEditor';
import { DestinationsEditor } from '@/modules/agent-profile/components/editors/DestinationsEditor';
import { ProcessEditor } from '@/modules/agent-profile/components/editors/ProcessEditor';
import { MediaEditor } from '@/modules/agent-profile/components/editors/MediaEditor';
import { PressEditor } from '@/modules/agent-profile/components/editors/PressEditor';
import { FaqEditor } from '@/modules/agent-profile/components/editors/FaqEditor';
import { CustomSectionsEditor } from '@/modules/agent-profile/components/editors/CustomSectionsEditor';
import {
  hydrateChannels,
  hydrateCounsellors,
  hydrateCredentials,
  hydrateLanguages,
  hydrateOffices,
  hydrateServices,
  hydrateTestimonials,
  hydrateWelfare,
} from '@/modules/agent-profile/lib/builder-hydrate-tier1';
import {
  hydrateAwards,
  hydrateCustomSections,
  hydrateDestinations,
  hydrateExperience,
  hydrateFaqs,
  hydrateMarkets,
  hydrateMedia,
  hydrateMemberships,
  hydratePress,
  hydrateProcess,
  hydrateSuccessStories,
} from '@/modules/agent-profile/lib/builder-hydrate-tier2';

function section<T>(
  tabId: string,
  payloadKey: RepeatablePayloadKey,
  editor: ComponentType<RepeatableEditorProps<T>>,
  hydrate: (raw: unknown) => T[],
): RepeatableSectionEntry {
  return {
    tabId,
    payloadKey,
    editor: editor as ComponentType<RepeatableEditorProps<unknown>>,
    hydrate: hydrate as (raw: unknown) => unknown[],
  };
}

/**
 * Registry of every repeatable builder tab — the shell iterates it to mount the
 * right editor in each tab, hydrating from the matching `sections` projection key
 * and saving via `payloadKey` (replace-array `updateMe`). `tabId` matches an
 * `AGENT_BUILDER_SECTIONS` id; `marketsAndDestinations` hosts two editors so it
 * is wired separately in the shell, not here.
 */
export const BUILDER_REPEATABLE_SECTIONS: Readonly<
  Partial<Record<string, RepeatableSectionEntry>>
> = {
  credentials: section('credentials', 'credentials', CredentialsEditor, hydrateCredentials),
  offices: section('offices', 'officeLocations', OfficesEditor, hydrateOffices),
  contactChannels: section('contactChannels', 'contactChannels', ChannelsEditor, hydrateChannels),
  languages: section('languages', 'spokenLanguages', LanguagesEditor, hydrateLanguages),
  counsellors: section('counsellors', 'counsellors', CounsellorsEditor, hydrateCounsellors),
  services: section('services', 'services', ServicesEditor, hydrateServices),
  welfareServices: section('welfareServices', 'welfareCapabilities', WelfareEditor, hydrateWelfare),
  testimonials: section('testimonials', 'testimonials', TestimonialsEditor, hydrateTestimonials),
  successStories: section('successStories', 'successStories', SuccessStoriesEditor, hydrateSuccessStories),
  experienceTimeline: section('experienceTimeline', 'experienceEntries', ExperienceEditor, hydrateExperience),
  memberships: section('memberships', 'professionalMemberships', MembershipsEditor, hydrateMemberships),
  awards: section('awards', 'awards', AwardsEditor, hydrateAwards),
  processSteps: section('processSteps', 'processSteps', ProcessEditor, hydrateProcess),
  mediaGallery: section('mediaGallery', 'mediaItems', MediaEditor, hydrateMedia),
  pressAndPartners: section('pressAndPartners', 'pressItems', PressEditor, hydratePress),
  faqs: section('faqs', 'faqs', FaqEditor, hydrateFaqs),
  customSections: section('customSections', 'customSections', CustomSectionsEditor, hydrateCustomSections),
};

/** Markets + destinations share the `marketsAndDestinations` tab (two editors). */
export const MARKETS_SECTION = section('markets', 'marketsServed', MarketsEditor, hydrateMarkets);
export const DESTINATIONS_SECTION = section(
  'destinations',
  'destinations',
  DestinationsEditor,
  hydrateDestinations,
);
