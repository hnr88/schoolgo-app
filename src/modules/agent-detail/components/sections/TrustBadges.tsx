import { getTranslations } from 'next-intl/server';
import { BadgeCheck, ShieldCheck, FileCheck, Baby } from 'lucide-react';
import { StatusBadge } from '@/modules/design-system';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

type IconComponent = typeof ShieldCheck;

interface TrustBadgesProps {
  agent: AgentDetail;
}

interface BadgeEntry {
  key: string;
  label: string;
  Icon: IconComponent;
}

// Discrete, independently-earned trust badges (not a single rolled-up number).
// Each is platform/3rd-party verifiable per the trust model in AGENT-PROFILE-MODEL.
export async function TrustBadges({ agent }: TrustBadgesProps) {
  const t = await getTranslations('AgentDetail.hero.badge');

  const tTier = await getTranslations('AgentDetail.hero.trustTier');
  const tierLabel = tTier.has(agent.trustTier) ? tTier(agent.trustTier) : null;

  const badges: BadgeEntry[] = [];
  if (agent.platformAuthorisedBadge) {
    badges.push({ key: 'platform', label: t('platformAuthorised'), Icon: ShieldCheck });
  }
  if (agent.qeacValidationStatus === 'verified') {
    badges.push({ key: 'qeac', label: t('qeacVerified'), Icon: BadgeCheck });
  }
  if (agent.maraValidationStatus === 'verified') {
    badges.push({ key: 'mara', label: t('maraRegistered'), Icon: BadgeCheck });
  }
  if (agent.esosPrismsRecorded) {
    badges.push({ key: 'esos', label: t('esosRecorded'), Icon: FileCheck });
  }
  if (agent.handlesUnder18) {
    badges.push({ key: 'under18', label: t('handlesUnder18'), Icon: Baby });
  }

  if (!tierLabel && badges.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tierLabel && (
        <StatusBadge tone="trust" size="md">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
          {tierLabel}
        </StatusBadge>
      )}
      {badges.map(({ key, label, Icon }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 rounded-pill bg-babu-50 px-2.5 py-1 text-xs font-semibold text-babu-700"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
          {label}
        </span>
      ))}
    </div>
  );
}
