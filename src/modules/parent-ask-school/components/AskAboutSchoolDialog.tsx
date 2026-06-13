'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircleQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AskAboutSchoolForm } from '@/modules/parent-ask-school/components/AskAboutSchoolForm';

interface AskAboutSchoolDialogProps {
  schoolDocumentId: string;
}

export function AskAboutSchoolDialog({ schoolDocumentId }: AskAboutSchoolDialogProps) {
  const t = useTranslations('AskSchool');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" className="gap-2" />}>
        <MessageCircleQuestion className="size-4" strokeWidth={1.75} aria-hidden="true" />
        {t('askCta')}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('askTitle')}</DialogTitle>
          <DialogDescription>{t('askDescription')}</DialogDescription>
        </DialogHeader>
        {open && <AskAboutSchoolForm schoolDocumentId={schoolDocumentId} onClose={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
