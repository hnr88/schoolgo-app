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
import { AskSchoolForm } from '@/modules/parent-ask-school/components/AskSchoolForm';

export function AskSchoolDialog() {
  const t = useTranslations('AskSchool');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type='button' className='gap-1.5' />}>
        <MessageCircleQuestion className='h-4 w-4' />
        {t('askCta')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('askTitle')}</DialogTitle>
          <DialogDescription>{t('askDescription')}</DialogDescription>
        </DialogHeader>
        {open && <AskSchoolForm onClose={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}
