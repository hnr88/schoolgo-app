'use client';

import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function ChangeEmailButton() {
  const t = useTranslations('ParentSettings');

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type='button' variant='outline' size='sm' />}>
        <Mail className='mr-2 h-4 w-4' aria-hidden='true' />
        {t('changeEmailButton')}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('changeEmailButton')}</AlertDialogTitle>
          <AlertDialogDescription>{t('changeEmailUnavailable')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('closeButton')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
