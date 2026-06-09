'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteTourDialogProps {
  open: boolean;
  tourTitle: string | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteTourDialog({
  open,
  tourTitle,
  isPending,
  onOpenChange,
  onConfirm,
}: DeleteTourDialogProps) {
  const t = useTranslations('SchoolTours');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {tourTitle ? `${tourTitle} — ${t('deleteDescription')}` : t('deleteDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t('deleteCancel')}</AlertDialogCancel>
          <AlertDialogAction variant='destructive' disabled={isPending} onClick={onConfirm}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('deleteConfirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
