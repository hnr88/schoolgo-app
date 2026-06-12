import { Link } from '@/i18n/navigation';
import { AgentCard } from '@/modules/design-system';
import type { SchoolPartnerAgent } from '@/modules/school-detail/types/school-partner-agents.types';

interface PartnerAgentCardProps {
  agent: SchoolPartnerAgent;
  schoolDocumentId: string;
  verifiedLabel: string;
  profileLabel: string;
  talkLabel: string;
}

export function PartnerAgentCard({
  agent,
  schoolDocumentId,
  verifiedLabel,
  profileLabel,
  talkLabel,
}: PartnerAgentCardProps) {
  const name = agent.displayName ?? agent.companyName ?? agent.contactName;

  return (
    <AgentCard
      name={name}
      href={agent.slug ? `/agents/${agent.slug}` : '#'}
      photoUrl={agent.photoUrl}
      headline={agent.headline}
      roleTitle={agent.roleTitle}
      countries={agent.countryOfOperation ? [agent.countryOfOperation] : []}
      verified={agent.verified}
      verifiedLabel={verifiedLabel}
      agentDocumentId={agent.documentId}
      schoolDocumentId={schoolDocumentId}
      talkLabel={talkLabel}
      actionSlot={
        agent.slug ? (
          <Link
            href={`/agents/${agent.slug}`}
            className='inline-flex w-full items-center justify-center rounded-pill border border-border bg-card px-4 py-2.5 text-body-sm font-semibold text-hof transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            {profileLabel}
          </Link>
        ) : undefined
      }
    />
  );
}
