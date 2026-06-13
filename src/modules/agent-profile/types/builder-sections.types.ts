import type { ComponentType } from 'react';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

/**
 * The `UpdateAgentProfilePayload` keys whose value is a repeatable component
 * array (replace-array semantics). Each maps 1:1 to an `editorSections` key the
 * builder hydrates from `GET /api/agents/me/public-preview` (the ungated mirror
 * of `sections`, so hidden-but-filled sections still load to edit).
 */
export type RepeatablePayloadKey =
  | 'credentials'
  | 'officeLocations'
  | 'contactChannels'
  | 'spokenLanguages'
  | 'services'
  | 'welfareCapabilities'
  | 'counsellors'
  | 'testimonials'
  | 'successStories'
  | 'experienceEntries'
  | 'professionalMemberships'
  | 'awards'
  | 'marketsServed'
  | 'destinations'
  | 'processSteps'
  | 'mediaItems'
  | 'pressItems'
  | 'faqs'
  | 'customSections';

/**
 * One repeatable-section entry in the builder registry. The shell renders the
 * `editor` in its tab, hydrating the read-side projection array via `hydrate`
 * into the editor's typed item shape, and saves via the `payloadKey` (the array
 * sent to `updateMe`). `tabId` matches an `AGENT_BUILDER_SECTIONS` id.
 */
export interface RepeatableSectionEntry<T = unknown> {
  tabId: string;
  payloadKey: RepeatablePayloadKey;
  editor: ComponentType<RepeatableEditorProps<T>>;
  hydrate: (raw: unknown) => T[];
}
