'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CalendarClock, GraduationCap, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { SurfaceCard } from '@/modules/core';
import { useAcceptOffer } from '@/modules/applications/queries/use-accept-offer.mutation';
import { useAgentOfferDetail } from '@/modules/applications/queries/use-agent-offer-detail.query';
import { ConfirmActionDialog } from '@/modules/applications/components/ConfirmActionDialog';
import { formatDate, formatOfferFee } from '@/modules/applications/lib/parent-format';
import {
  OFFER_URGENCY_BADGE,
  daysUntilDeadline,
  offerDeadlineUrgency,
} from '@/modules/agent-offers/lib/offer-deadline';
import type { Application } from '@/modules/applications/types/application.types';

export function OfferCard({ application }: { application: Application }) {
  const t = useTranslations('AgentOffers');
  const locale = useLocale();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { data: detail, isLoading } = useAgentOfferDetail(application.documentId);
  const acceptOffer = useAcceptOffer(application.documentId);

  const deadline = detail?.offerDeadline ?? null;
  const urgency = offerDeadlineUrgency(deadline);
  const days = daysUntilDeadline(deadline);
  const studentName = `${application.student.firstName} ${application.student.lastName}`;

  function handleAccept() {
    acceptOffer.mutate(undefined, {
      onSuccess: () => {
        setConfirmOpen(false);
        toast.success(t('acceptSuccess'));
        queryClient.invalidateQueries({ queryKey: ['agent', 'offers', 'offer_made'] });
        queryClient.invalidateQueries({ queryKey: ['agent', 'post-offer-applications'] });
      },
      onError: () => toast.error(t('acceptError')),
    });
  }

  return (
    <SurfaceCard elevation='interactive' padding='lg' className='flex flex-col gap-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-display text-base font-semibold tracking-tight text-ink-900'>{application.school.name}</h3>
          <span className='flex items-center gap-1.5 text-sm text-foggy'>
            <GraduationCap className='h-4 w-4' />
            {studentName}
          </span>
        </div>
        {deadline && (
          <span
            className={cn(
              'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
              OFFER_URGENCY_BADGE[urgency],
            )}
          >
            {urgency === 'expired'
              ? t('deadlineExpired')
              : days === 0
                ? t('deadlineToday')
                : t('deadlineInDays', { count: days ?? 0 })}
          </span>
        )}
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 p-3'>
          <span className='flex items-center gap-1.5 text-xs font-medium text-foggy'>
            <Wallet className='h-3.5 w-3.5' />
            {t('annualFee')}
          </span>
          {isLoading ? (
            <Skeleton className='h-6 w-24' />
          ) : (
            <span className='font-display text-base font-bold tracking-tight text-ink-900 tabular-nums'>
              {formatOfferFee(detail?.offerAnnualFee ?? null, locale) ?? t('notProvided')}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 p-3'>
          <span className='flex items-center gap-1.5 text-xs font-medium text-foggy'>
            <CalendarClock className='h-3.5 w-3.5' />
            {t('offerDeadline')}
          </span>
          {isLoading ? (
            <Skeleton className='h-6 w-24' />
          ) : (
            <span className='font-display text-base font-bold tracking-tight text-ink-900 tabular-nums'>
              {formatDate(deadline, locale) ?? t('notProvided')}
            </span>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between gap-3 border-t border-border/60 pt-4'>
        <Link
          href={`/dashboard/applications/${application.documentId}`}
          className='rounded-md text-sm font-semibold text-babu-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          {t('viewApplication')}
        </Link>
        <Button onClick={() => setConfirmOpen(true)} disabled={acceptOffer.isPending}>
          {t('acceptOffer')}
        </Button>
      </div>

      <ConfirmActionDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={t('acceptConfirmTitle')}
        description={t('acceptConfirmDescription', { school: application.school.name })}
        confirmLabel={t('acceptOffer')}
        isPending={acceptOffer.isPending}
        onConfirm={handleAccept}
      />
    </SurfaceCard>
  );
}
