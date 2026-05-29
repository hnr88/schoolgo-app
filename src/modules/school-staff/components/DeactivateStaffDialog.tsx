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

interface DeactivateStaffDialogProps {
  open: boolean;
  staffName: string | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeactivateStaffDialog({
  open,
  staffName,
  isPending,
  onOpenChange,
  onConfirm,
}: DeactivateStaffDialogProps) {
  const t = useTranslations('SchoolStaff');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deactivateTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {staffName ? `${staffName} — ${t('deactivateDescription')}` : t('deactivateDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t('deactivateCancel')}</AlertDialogCancel>
          <AlertDialogAction variant='destructive' disabled={isPending} onClick={onConfirm}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('deactivateConfirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
