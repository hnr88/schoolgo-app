'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MessageComposer } from '@/modules/applications/components/MessageComposer';

export function ContactSchoolDialog({ documentId }: { documentId: string }) {
  const t = useTranslations('Applications');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant='outline'>{t('actionContactSchool')}</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('contactSchoolTitle')}</DialogTitle>
          <DialogDescription>{t('contactSchoolDescription')}</DialogDescription>
        </DialogHeader>
        <MessageComposer
          applicationDocumentId={documentId}
          autoFocus
          onSent={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
