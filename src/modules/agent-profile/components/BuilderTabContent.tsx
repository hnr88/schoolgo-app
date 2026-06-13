'use client';

import { useTranslations } from 'next-intl';
import { IdentityEditor } from '@/modules/agent-profile/components/editors/IdentityEditor';
import { RepeatableEditorTab } from '@/modules/agent-profile/components/editors/RepeatableEditorTab';
import { ComplianceTab } from '@/modules/agent-profile/components/editors/ComplianceTab';
import { MarketsDestinationsTab } from '@/modules/agent-profile/components/editors/MarketsDestinationsTab';
import { SuccessMetricsTab } from '@/modules/agent-profile/components/editors/SuccessMetricsTab';
import { BuilderSectionPlaceholder } from '@/modules/agent-profile/components/BuilderSectionPlaceholder';
import { BUILDER_REPEATABLE_SECTIONS } from '@/modules/agent-profile/constants/builder-registry.constants';
import type { AgentPublicProfilePreview } from '@/modules/agent-profile/types/agent-profile.types';

interface BuilderTabContentProps {
  tabId: string;
  label: string;
  preview: AgentPublicProfilePreview;
}

const COMPLIANCE_TABS = new Set(['feeTransparency', 'ethicsCommitments']);
// `schoolAuthorisations` is the only genuinely elsewhere-managed section: partner
// schools are computed server-side from active agent-partnership rows and have no
// agent-writable field on `updateMe`. `legalIdentity` is now edited in the basics
// tab (IdentityEditor covers the legal scalars) and `successMetrics` renders the
// read-only analytics display, so neither needs a placeholder.
const MANAGED_ELSEWHERE = new Set(['schoolAuthorisations']);

/**
 * Resolves which editor mounts in a builder tab. `basics` hosts the identity
 * form (which also covers the legal-identity scalars), fee/ethics tabs host the
 * shared compliance editor, markets+destinations is a dual-editor tab,
 * `successMetrics` renders the read-only analytics display, every other
 * repeatable section comes from the registry, and the remaining
 * elsewhere-managed sections render an explanatory placeholder.
 */
export function BuilderTabContent({ tabId, label, preview }: BuilderTabContentProps) {
  const t = useTranslations('AgentProfileBuilder');

  if (tabId === 'basics') return <IdentityEditor preview={preview} />;

  if (COMPLIANCE_TABS.has(tabId)) return <ComplianceTab preview={preview} />;

  if (tabId === 'marketsAndDestinations') {
    return (
      <MarketsDestinationsTab
        marketsRaw={preview.editorSections.marketsServed}
        destinationsRaw={preview.editorSections.destinations}
      />
    );
  }

  if (tabId === 'successMetrics') return <SuccessMetricsTab />;

  const entry = BUILDER_REPEATABLE_SECTIONS[tabId];
  if (entry)
    return <RepeatableEditorTab entry={entry} raw={preview.editorSections[entry.payloadKey]} />;

  if (MANAGED_ELSEWHERE.has(tabId)) {
    return <BuilderSectionPlaceholder title={label} note={t(`${tabId}Note`)} />;
  }

  return <BuilderSectionPlaceholder title={label} note={t('comingSoon')} />;
}
