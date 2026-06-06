'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { BadgeCheck, ShieldCheck, UserCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import { getInitials } from '@/modules/students/lib/get-initials';
import { useAgentRepresentation } from '@/modules/students/hooks/useAgentRepresentation';
import { ShareWithAgentDialog } from '@/modules/students/components/ShareWithAgentDialog';
import { RevokeShareButton } from '@/modules/students/components/RevokeShareButton';
import type { StudentAgentShare } from '@/modules/students/types/agent-share.types';
import type { AgentRepresentationPanelProps } from '@/modules/students/types/parent-component.types';

function AgentRow({
  share,
  studentDocumentId,
}: {
  share: StudentAgentShare;
  studentDocumentId?: string;
}) {
  const t = useTranslations('AgentRepresentation');
  const format = useFormatter();
  const agent = share.agent;
  if (!agent) return null;

  const contactName = [agent.user?.firstName, agent.user?.lastName].filter(Boolean).join(' ');
  const initials = getInitials(agent.user?.firstName ?? agent.companyName, agent.user?.lastName ?? '');

  return (
    <div className='flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-5'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-12 w-12'>
          <AvatarFallback className='bg-babu-50 text-sm font-bold text-babu-700'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-col gap-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='font-display text-base font-bold tracking-tight text-ink-900'>
              {agent.companyName}
            </span>
            {agent.verified && (
              <Badge className='gap-1 bg-vivid-mint-soft text-vivid-mint'>
                <BadgeCheck className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                {t('badgeVerified')}
              </Badge>
            )}
            {agent.qeacValidationStatus === 'verified' && (
              <Badge variant='secondary' className='gap-1'>
                <ShieldCheck className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                {t('badgeQeac')}
              </Badge>
            )}
          </div>
          {contactName && <span className='text-sm text-muted-foreground'>{contactName}</span>}
          {share.sharedAt && (
            <span className='text-xs text-foggy'>
              {share.status === 'revoked' && share.revokedAt
                ? t('revokedOn', { date: format.dateTime(new Date(share.revokedAt), { dateStyle: 'medium' }) })
                : t('sharedOn', { date: format.dateTime(new Date(share.sharedAt), { dateStyle: 'medium' }) })}
            </span>
          )}
        </div>
        {studentDocumentId && (
          <RevokeShareButton
            studentDocumentId={studentDocumentId}
            shareDocumentId={share.documentId}
          />
        )}
      </div>
    </div>
  );
}

export function AgentRepresentationPanel({ studentDocumentId }: AgentRepresentationPanelProps) {
  const t = useTranslations('AgentRepresentation');
  const { activeShare, pastShares, isLoading } = useAgentRepresentation(studentDocumentId);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-5'>
      <SectionHeading
        title={t('title')}
        description={t('subtitle')}
        level={2}
        actions={!isLoading && !activeShare ? <ShareWithAgentDialog studentDocumentId={studentDocumentId} /> : undefined}
      />

      {isLoading ? (
        <Skeleton className='h-28 w-full rounded-lg' />
      ) : activeShare ? (
        <AgentRow share={activeShare} studentDocumentId={studentDocumentId} />
      ) : (
        <div className='flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-10 text-center'>
          <UserCircle2 className='h-8 w-8 text-foggy' strokeWidth={1.5} aria-hidden='true' />
          <p className='text-sm font-medium text-ink-900'>{t('emptyTitle')}</p>
          <p className='max-w-sm text-xs text-foggy'>{t('emptySubtitle')}</p>
        </div>
      )}

      {pastShares.length > 0 && (
        <div className='flex flex-col gap-3'>
          <p className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('pastTitle')}</p>
          {pastShares.map((share) => (
            <AgentRow key={share.documentId} share={share} />
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
