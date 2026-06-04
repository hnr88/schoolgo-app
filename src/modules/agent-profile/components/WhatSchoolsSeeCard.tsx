'use client';

import { useTranslations } from 'next-intl';
import { BadgeCheck, Globe, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import type { AgentPublicPreview } from '@/modules/agent-profile/types/agent-profile.types';

interface WhatSchoolsSeeCardProps {
  preview: AgentPublicPreview;
}

function getInitials(name: string, fallback: string): string {
  const source = name.trim() || fallback;
  return source
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function WhatSchoolsSeeCard({ preview }: WhatSchoolsSeeCardProps) {
  const t = useTranslations('AgentProfile');
  const initials = getInitials(preview.fullName, preview.companyName);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-5'>
      <SectionHeading title={t('previewTitle')} description={t('previewSubtitle')} level={2} />

      <div className='flex flex-col gap-4 rounded-lg border border-border bg-muted/40 p-5'>
        <div className='flex items-start gap-4'>
          <Avatar className='h-14 w-14'>
            <AvatarFallback className='bg-babu-50 text-sm font-bold text-babu-700'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-col gap-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='font-display text-base font-bold tracking-tight text-ink-900'>
                {preview.fullName || t('previewNoName')}
              </span>
              {preview.verified && (
                <Badge className='gap-1 bg-vivid-mint-soft text-vivid-mint'>
                  <BadgeCheck className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                  {t('badgeVerified')}
                </Badge>
              )}
              {preview.qeacValidationStatus === 'verified' && (
                <Badge variant='secondary'>{t('badgeQeac')}</Badge>
              )}
            </div>
            <span className='text-sm text-muted-foreground'>
              {[preview.roleTitle, preview.companyName].filter(Boolean).join(' · ') ||
                preview.companyName}
            </span>
          </div>
        </div>

        <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-900'>
          {preview.countryOfOperation && (
            <span className='flex items-center gap-1.5'>
              <MapPin className='h-4 w-4 text-foggy' strokeWidth={1.5} aria-hidden='true' />
              {preview.countryOfOperation}
            </span>
          )}
          {preview.website && (
            <span className='flex items-center gap-1.5'>
              <Globe className='h-4 w-4 text-foggy' strokeWidth={1.5} aria-hidden='true' />
              <a
                href={preview.website}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-sm font-medium text-babu-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                {preview.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {preview.qeacNumber && (
            <span className='flex items-center gap-1.5'>
              <BadgeCheck className='h-4 w-4 text-foggy' strokeWidth={1.5} aria-hidden='true' />
              {preview.qeacNumber}
            </span>
          )}
        </div>

        {preview.bio ? (
          <p className='text-sm leading-relaxed text-ink-900/80'>{preview.bio}</p>
        ) : (
          <p className='text-sm italic text-muted-foreground'>{t('previewNoBio')}</p>
        )}
      </div>
    </SurfaceCard>
  );
}
