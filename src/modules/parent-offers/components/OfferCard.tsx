'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { OfferCardMeta } from '@/modules/parent-offers/components/OfferCardMeta';
import type { OfferCardProps } from '@/modules/parent-offers/types/parent-offers.types';

export function OfferCard({ offer }: OfferCardProps) {
  const t = useTranslations('ParentOffers');
  const childName = `${offer.student.firstName} ${offer.student.lastName}`;
  const isAccepted = offer.status === 'offer_accepted';
  const contextKey = isAccepted ? 'contextOfferAccepted' : 'contextOfferMade';
  const ctaKey = isAccepted ? 'ctaContinuePreEnrolment' : 'ctaReviewOffer';

  return (
    <SurfaceCard
      elevation='interactive'
      padding='none'
      className='flex flex-col overflow-hidden'
    >
      <span aria-hidden className='h-1 w-full bg-rausch-500' />
      <article className='flex flex-1 flex-col gap-4 p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-display text-base font-semibold tracking-tight text-ink-900'>
              {offer.school.name}
            </h2>
            <p className='flex items-center gap-1.5 text-sm text-foggy'>
              <GraduationCap className='h-4 w-4' />
              {childName}
            </p>
          </div>
          <ApplicationStatusBadge status={offer.status} />
        </div>

        <OfferCardMeta offer={offer} />

        <p className='text-sm text-foggy'>{t(contextKey)}</p>

        <Link
          href={`/parent/applications/${offer.documentId}`}
          className={cn(buttonVariants(), 'mt-auto w-full shadow-brand')}
        >
          {t(ctaKey)}
        </Link>
      </article>
    </SurfaceCard>
  );
}
