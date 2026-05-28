'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TERMINAL_STATUSES } from '@/modules/applications/constants/detail.constants';
import { useAcceptOffer } from '@/modules/applications/queries/use-accept-offer.mutation';
import { useWithdrawApplication } from '@/modules/applications/queries/use-withdraw-application.mutation';
import { ConfirmActionDialog } from '@/modules/applications/components/ConfirmActionDialog';
import { ContactSchoolDialog } from '@/modules/applications/components/ContactSchoolDialog';
import type { Application } from '@/modules/applications/types/application.types';

export function ApplicationActions({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const acceptOffer = useAcceptOffer(application.documentId);
  const withdraw = useWithdrawApplication(application.documentId);

  const isTerminal = TERMINAL_STATUSES.includes(application.status);
  if (isTerminal) return null;

  function handleAccept() {
    acceptOffer.mutate(undefined, {
      onSuccess: () => {
        setAcceptOpen(false);
        toast.success(t('acceptOfferSuccess'));
      },
      onError: () => toast.error(t('acceptOfferError')),
    });
  }

  function handleWithdraw() {
    withdraw.mutate(undefined, {
      onSuccess: () => {
        setWithdrawOpen(false);
        toast.success(t('withdrawSuccess'));
      },
      onError: () => toast.error(t('withdrawError')),
    });
  }

  return (
    <div className='flex justify-end gap-3'>
      <ContactSchoolDialog documentId={application.documentId} />

      {application.status === 'offer_made' && (
        <>
          <Button onClick={() => setAcceptOpen(true)}>{t('actionAcceptOffer')}</Button>
          <ConfirmActionDialog
            open={acceptOpen}
            onOpenChange={setAcceptOpen}
            title={t('acceptOfferConfirmTitle')}
            description={t('acceptOfferConfirmDescription')}
            confirmLabel={t('actionAcceptOffer')}
            isPending={acceptOffer.isPending}
            onConfirm={handleAccept}
          />
        </>
      )}

      <Button variant='destructive' onClick={() => setWithdrawOpen(true)}>
        {t('actionWithdraw')}
      </Button>
      <ConfirmActionDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        title={t('withdrawConfirmTitle')}
        description={t('withdrawConfirmDescription')}
        confirmLabel={t('actionWithdraw')}
        isPending={withdraw.isPending}
        onConfirm={handleWithdraw}
        destructive
      />
    </div>
  );
}
