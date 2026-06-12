'use client';

import { useTranslations } from 'next-intl';
import { IdentityEditor } from '@/modules/agent-profile/components/editors/IdentityEditor';
import { RepeatableEditorTab } from '@/modules/agent-profile/components/editors/RepeatableEditorTab';
import { ComplianceTab } from '@/modules/agent-profile/components/editors/ComplianceTab';
import { MarketsDestinationsTab } from '@/modules/agent-profile/components/editors/MarketsDestinationsTab';
import { BuilderSectionPlaceholder } from '@/modules/agent-profile/components/BuilderSectionPlaceholder';
import { BUILDER_REPEATABLE_SECTIONS } from '@/modules/agent-profile/constants/builder-registry.constants';
import type { AgentPublicProfilePreview } from '@/modules/agent-profile/types/agent-profile.types';

interface BuilderTabContentProps {
  tabId: string;
  label: string;
  preview: AgentPublicProfilePreview;
}

const COMPLIANCE_TABS = new Set(['feeTransparency', 'ethicsCommitments']);
const MANAGED_ELSEWHERE = new Set(['legalIdentity', 'schoolAuthorisations', 'successMetrics']);

/**
 * Resolves which editor mounts in a builder tab. `basics` hosts the identity
 * form (which also covers the legal-identity scalars), fee/ethics tabs host the
 * shared compliance editor, markets+destinations is a dual-editor tab, every
 * other repeatable section comes from the registry, and the remaining
 * computed/elsewhere-managed sections render an explanatory placeholder.
 */
export function BuilderTabContent({ tabId, label, preview }: BuilderTabContentProps) {
  const t = useTranslations('AgentProfileBuilder');

  if (tabId === 'basics') return <IdentityEditor preview={preview} />;

  if (COMPLIANCE_TABS.has(tabId)) return <ComplianceTab preview={preview} />;

  if (tabId === 'marketsAndDestinations') {
    return (
      <MarketsDestinationsTab
        marketsRaw={preview.sections.marketsServed}
        destinationsRaw={preview.sections.destinations}
      />
    );
  }

  const entry = BUILDER_REPEATABLE_SECTIONS[tabId];
  if (entry) return <RepeatableEditorTab entry={entry} raw={preview.sections[entry.payloadKey]} />;

  if (MANAGED_ELSEWHERE.has(tabId)) {
    return <BuilderSectionPlaceholder title={label} note={t(`${tabId}Note`)} />;
  }

  return <BuilderSectionPlaceholder title={label} note={t('comingSoon')} />;
}
