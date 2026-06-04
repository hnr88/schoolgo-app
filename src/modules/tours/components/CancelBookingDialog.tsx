'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { CancelBookingDialogProps } from '@/modules/tours/types/tours.types';

export function CancelBookingDialog({
  booking,
  onOpenChange,
  onConfirm,
  isPending,
}: CancelBookingDialogProps) {
  const t = useTranslations('Tours');

  return (
    <Dialog
      open={!!booking}
      onOpenChange={(open) => {
        if (!open) onOpenChange(false);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('cancelTitle')}</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-foggy'>
          {t('cancelConfirm', { title: booking?.tour?.title ?? '' })}
        </p>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('keepBooking')}
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('cancelButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
