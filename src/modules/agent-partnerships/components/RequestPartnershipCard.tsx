'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { usePartnershipStatus } from '@/modules/agent-partnerships/queries/use-partnership-status.query';
import { useRequestPartnership } from '@/modules/agent-partnerships/queries/use-request-partnership.mutation';
import { PartnershipStatusBadge } from '@/modules/agent-partnerships/components/PartnershipStatusBadge';

export function RequestPartnershipCard({ schoolDocumentId }: { schoolDocumentId: string }) {
  const t = useTranslations('AgentPartnerships');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const statusQuery = usePartnershipStatus(isAuthenticated ? schoolDocumentId : undefined);
  const requestPartnership = useRequestPartnership();

  if (!isAuthenticated) return null;

  const status = statusQuery.data?.status;
  const canRequest = status === 'none' || status === 'denied' || status === 'removed';

  return (
    <section
      aria-labelledby='partnership-heading'
      className='rounded-lg border border-border bg-card p-5 shadow-1'
    >
      <h2 id='partnership-heading' className='text-xl font-semibold text-ink-900'>
        {t('cardTitle')}
      </h2>
      <p className='mt-2 text-body-sm text-foggy'>{t('cardDescription')}</p>

      <div className='mt-4 flex flex-col gap-3'>
        {statusQuery.isPending ? (
          <Skeleton className='h-9 w-full rounded-md' />
        ) : statusQuery.isError ? (
          <p className='text-sm text-foggy'>{t('statusError')}</p>
        ) : (
          <>
            {status && status !== 'none' && (
              <div>
                <PartnershipStatusBadge status={status} />
              </div>
            )}
            {canRequest && (
              <Button
                className='w-full'
                disabled={requestPartnership.isPending}
                onClick={() => requestPartnership.mutate(schoolDocumentId)}
              >
                {t('requestButton')}
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
