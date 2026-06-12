'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ContactAgentDialog } from '@/modules/agent-inquiry';
import { TrustBadge } from '@/modules/design-system/components/TrustBadge';
import {
  getSchoolAvatarColor,
  getSchoolInitials,
} from '@/modules/design-system/lib/school-avatar';
import type { AgentCardProps } from '@/modules/design-system/types/design-system.types';

export function AgentCard({
  name,
  href,
  photoUrl,
  headline,
  roleTitle,
  countries = [],
  verified = false,
  verifiedLabel,
  partnerSchoolsCount = 0,
  partnerSchoolsLabel,
  completenessLabel,
  className,
  actionSlot,
  agentDocumentId,
  schoolDocumentId,
  talkLabel,
}: AgentCardProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const visibleCountries = countries.slice(0, 3);
  const extraCountries = countries.length - visibleCountries.length;

  return (
    <article
      className={cn(
        'group flex flex-col gap-4 rounded-lg transition-shadow duration-300 ease-out-quart hover:shadow-2 motion-reduce:transition-none',
        className,
      )}
    >
      <Link
        href={href}
        aria-label={name}
        className='flex items-start gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      >
        <span className='relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted'>
          {photoUrl && !photoFailed ? (
            <Image
              src={photoUrl}
              alt=''
              fill
              sizes='64px'
              className='object-cover'
              aria-hidden='true'
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <span
              className={cn(
                'flex h-full w-full items-center justify-center text-lg font-bold',
                getSchoolAvatarColor(name),
              )}
              aria-hidden='true'
            >
              {getSchoolInitials(name)}
            </span>
          )}
        </span>

        <span className='flex min-w-0 flex-1 flex-col gap-1'>
          <span className='line-clamp-1 text-body font-semibold text-ink-900'>{name}</span>
          {roleTitle && (
            <span className='line-clamp-1 text-body-sm text-foggy'>{roleTitle}</span>
          )}
          {verified && verifiedLabel && (
            <span className='mt-1'>
              <TrustBadge variant='qeac' label={verifiedLabel} />
            </span>
          )}
        </span>
      </Link>

      {headline && (
        <p className='line-clamp-2 text-body-sm text-foggy'>{headline}</p>
      )}

      {visibleCountries.length > 0 && (
        <div className='flex flex-wrap gap-1.5'>
          {visibleCountries.map((country) => (
            <span
              key={country}
              className='inline-flex items-center rounded-pill bg-muted px-2.5 py-1 text-caption font-semibold text-hof'
            >
              {country}
            </span>
          ))}
          {extraCountries > 0 && (
            <span className='inline-flex items-center rounded-pill bg-muted px-2.5 py-1 text-caption font-semibold text-foggy'>
              +{extraCountries}
            </span>
          )}
        </div>
      )}

      {(partnerSchoolsCount > 0 || completenessLabel) && (
        <div className='mt-auto flex items-center justify-between gap-3 border-t border-divider pt-3'>
          {partnerSchoolsCount > 0 && (
            <span className='inline-flex items-center gap-1.5 text-caption font-medium text-foggy'>
              <Building2 className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
              {partnerSchoolsLabel ?? partnerSchoolsCount}
            </span>
          )}
          {completenessLabel && (
            <span className='text-caption font-medium text-babu-700'>{completenessLabel}</span>
          )}
        </div>
      )}

      {(actionSlot || (agentDocumentId && talkLabel)) && (
        <div className='mt-auto flex flex-col gap-2'>
          {actionSlot}
          {agentDocumentId && talkLabel && (
            <ContactAgentDialog
              agentDocumentId={agentDocumentId}
              schoolDocumentId={schoolDocumentId}
              trigger={
                <button
                  type='button'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-2.5 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                >
                  <MessageSquare className='h-4 w-4' aria-hidden='true' />
                  {talkLabel}
                </button>
              }
            />
          )}
        </div>
      )}
    </article>
  );
}
