'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import { ConfirmActionDialog } from '@/modules/applications/components/ConfirmActionDialog';
import { MakeOfferDialog } from '@/modules/school-applications/components/dialogs/MakeOfferDialog';
import { DeclineDialog } from '@/modules/school-applications/components/dialogs/DeclineDialog';
import { FieldDialog } from '@/modules/school-applications/components/dialogs/FieldDialog';
import { AttachServiceDialog } from '@/modules/school-applications/components/dialogs/AttachServiceDialog';
import { useSchoolApplicationAction } from '@/modules/school-applications/queries/use-school-application-action.mutation';
import {
  ACTION_LABEL_KEY,
  availableActions,
} from '@/modules/school-applications/lib/school-application';
import { FIELD_DIALOG_CONFIG } from '@/modules/school-applications/lib/dialog-fields';
import type {
  SchoolActionKey,
  SchoolApplicationStatus,
} from '@/modules/school-applications/types/school-applications.types';

const SIMPLE_ACTIONS: SchoolActionKey[] = [
  'receive',
  'review',
  'waitlist',
  'require-assessment',
  'enroll',
  'withdraw-offer',
];

function SimpleAction({
  documentId,
  action,
}: {
  documentId: string;
  action: SchoolActionKey;
}) {
  const t = useTranslations('SchoolApplications');
  const [open, setOpen] = useState(false);
  const mutation = useSchoolApplicationAction(documentId, action);
  const destructive = action === 'withdraw-offer';

  function handleConfirm() {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(t('actionSuccess'));
        setOpen(false);
      },
      onError: () => toast.error(t('actionError')),
    });
  }

  return (
    <>
      <Button variant={destructive ? 'destructive' : 'outline'} onClick={() => setOpen(true)}>
        {t(ACTION_LABEL_KEY[action])}
      </Button>
      <ConfirmActionDialog
        open={open}
        onOpenChange={setOpen}
        title={t(ACTION_LABEL_KEY[action])}
        description={t('confirmDescription')}
        confirmLabel={t('confirmConfirm')}
        isPending={mutation.isPending}
        onConfirm={handleConfirm}
        destructive={destructive}
      />
    </>
  );
}

function ComplexAction({
  documentId,
  action,
}: {
  documentId: string;
  action: SchoolActionKey;
}) {
  const t = useTranslations('SchoolApplications');
  const [open, setOpen] = useState(false);

  if (action === 'make-offer' || action === 'extend-offer') {
    return (
      <>
        <Button onClick={() => setOpen(true)}>{t(ACTION_LABEL_KEY[action])}</Button>
        <MakeOfferDialog documentId={documentId} open={open} onOpenChange={setOpen} mode={action} />
      </>
    );
  }

  if (action === 'decline') {
    return (
      <>
        <Button variant='destructive' onClick={() => setOpen(true)}>
          {t(ACTION_LABEL_KEY[action])}
        </Button>
        <DeclineDialog documentId={documentId} open={open} onOpenChange={setOpen} />
      </>
    );
  }

  const config = FIELD_DIALOG_CONFIG[action];
  if (!config) return null;

  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>
        {t(ACTION_LABEL_KEY[action])}
      </Button>
      <FieldDialog
        documentId={documentId}
        action={action}
        titleKey={config.titleKey}
        fields={config.fields}
        transform={config.transform}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

function AttachServiceAction({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>
        {t('actionAttachService')}
      </Button>
      <AttachServiceDialog documentId={documentId} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function SchoolApplicationActions({
  documentId,
  status,
}: {
  documentId: string;
  status: SchoolApplicationStatus;
}) {
  const t = useTranslations('SchoolApplications');
  const actions = availableActions(status);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-3'>
      <SectionHeading title={t('actionsTitle')} level={3} />
      <div className='flex flex-wrap gap-3'>
        {actions.map((action) =>
          SIMPLE_ACTIONS.includes(action) ? (
            <SimpleAction key={action} documentId={documentId} action={action} />
          ) : (
            <ComplexAction key={action} documentId={documentId} action={action} />
          ),
        )}
        <AttachServiceAction documentId={documentId} />
      </div>
    </SurfaceCard>
  );
}
