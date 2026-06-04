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

interface RemovePartnershipDialogProps {
  open: boolean;
  agentName: string | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RemovePartnershipDialog({
  open,
  agentName,
  isPending,
  onOpenChange,
  onConfirm,
}: RemovePartnershipDialogProps) {
  const t = useTranslations('SchoolPartnerships');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('removeTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {agentName ? `${agentName} — ${t('removeDescription')}` : t('removeDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t('removeCancel')}</AlertDialogCancel>
          <AlertDialogAction variant='destructive' disabled={isPending} onClick={onConfirm}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('removeConfirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
