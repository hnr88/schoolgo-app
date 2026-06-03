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
import type { DeleteVaultDocumentDialogProps } from '@/modules/document-vault/types/document-vault.types';

export function DeleteVaultDocumentDialog({
  document,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteVaultDocumentDialogProps) {
  const t = useTranslations('DocumentVault');

  return (
    <Dialog open={!!document} onOpenChange={(open) => { if (!open) onOpenChange(false); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('deleteTitle')}</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-foggy'>{t('deleteConfirm', { title: document?.title ?? '' })}</p>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('deleteButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
