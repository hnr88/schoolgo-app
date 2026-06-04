'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { DeleteAgentDocumentDialogProps } from '@/modules/agent-documents/types/component.types';

export function DeleteAgentDocumentDialog({
  document,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteAgentDocumentDialogProps) {
  const t = useTranslations('AgentDocuments');

  return (
    <Dialog open={!!document} onOpenChange={(open) => { if (!open) onOpenChange(false); }}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('deleteTitle')}</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-foggy'>{t('deleteConfirm')}</p>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isPending}>
            {t('deleteButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
