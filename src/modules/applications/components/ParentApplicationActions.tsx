'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard, SectionHeading } from '@/modules/core';
import { ConfirmActionDialog } from '@/modules/applications/components/ConfirmActionDialog';
import { ParentDeclineOfferDialog } from '@/modules/applications/components/ParentDeclineOfferDialog';
import { useParentAcceptOffer } from '@/modules/applications/queries/use-parent-accept-offer.mutation';
import type { ParentApplicationActionsProps } from '@/modules/applications/types/parent-offer.types';

export function ParentApplicationActions({ application }: ParentApplicationActionsProps) {
  const t = useTranslations('ParentApplications');
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const acceptOffer = useParentAcceptOffer(application.documentId);

  if (application.status !== 'offer_made') return null;

  function handleAccept() {
    acceptOffer.mutate(undefined, {
      onSuccess: () => {
        setAcceptOpen(false);
        toast.success(t('acceptOfferSuccess'));
      },
      onError: () => toast.error(t('acceptOfferError')),
    });
  }

  return (
    <SurfaceCard padding='lg' elevation='raised' accent='brand'>
      <SectionHeading title={t('offerActionsTitle')} level={2} className='mb-3' />
      <p className='mb-4 text-sm text-foggy'>{t('offerActionsSubtitle')}</p>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Button onClick={() => setAcceptOpen(true)} className='gap-1.5'>
          <Check className='h-4 w-4' aria-hidden='true' />
          {t('actionAcceptOffer')}
        </Button>
        <Button variant='outline' onClick={() => setDeclineOpen(true)} className='gap-1.5'>
          <X className='h-4 w-4' aria-hidden='true' />
          {t('actionDeclineOffer')}
        </Button>
      </div>

      <ConfirmActionDialog
        open={acceptOpen}
        onOpenChange={setAcceptOpen}
        title={t('acceptOfferConfirmTitle')}
        description={t('acceptOfferConfirmDescription')}
        confirmLabel={t('actionAcceptOffer')}
        isPending={acceptOffer.isPending}
        onConfirm={handleAccept}
      />

      <ParentDeclineOfferDialog
        open={declineOpen}
        onOpenChange={setDeclineOpen}
        applicationDocumentId={application.documentId}
      />
    </SurfaceCard>
  );
}
