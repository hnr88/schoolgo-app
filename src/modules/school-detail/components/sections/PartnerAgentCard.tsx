'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { TrustBadge } from '@/modules/design-system';
import { ContactAgentDialog } from '@/modules/agent-inquiry';
import {
  getSchoolAvatarColor,
  getSchoolInitials,
} from '@/modules/design-system/lib/school-avatar';
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
  const [photoFailed, setPhotoFailed] = useState(false);
  const name = agent.displayName ?? agent.companyName ?? agent.contactName;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-2">
      <div className="flex items-start gap-4">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
          {agent.photoUrl && !photoFailed ? (
            <Image
              src={agent.photoUrl}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
              aria-hidden="true"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <span
              className={`flex h-full w-full items-center justify-center text-lg font-bold ${getSchoolAvatarColor(name)}`}
              aria-hidden="true"
            >
              {getSchoolInitials(name)}
            </span>
          )}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="line-clamp-1 text-body font-semibold text-ink-900">{name}</span>
          {agent.roleTitle && (
            <span className="line-clamp-1 text-body-sm text-foggy">{agent.roleTitle}</span>
          )}
          {agent.verified && (
            <span className="mt-1">
              <TrustBadge variant="qeac" label={verifiedLabel} />
            </span>
          )}
        </span>
      </div>

      {agent.headline && (
        <p className="line-clamp-2 text-body-sm text-foggy">{agent.headline}</p>
      )}

      {agent.countryOfOperation && (
        <p className="inline-flex items-center gap-1.5 text-caption font-medium text-foggy">
          <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {agent.countryOfOperation}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2 border-t border-divider pt-4">
        <ContactAgentDialog
          agentDocumentId={agent.documentId}
          schoolDocumentId={schoolDocumentId}
          trigger={
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-2.5 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              {talkLabel}
            </button>
          }
        />
        {agent.slug && (
          <Link
            href={`/agents/${agent.slug}`}
            className="inline-flex w-full items-center justify-center rounded-pill border border-border bg-card px-4 py-2.5 text-body-sm font-semibold text-hof transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {profileLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
