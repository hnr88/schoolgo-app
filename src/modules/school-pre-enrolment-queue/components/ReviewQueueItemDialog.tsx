'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReviewQueueItem } from '@/modules/school-pre-enrolment-queue/queries/use-review-queue-item.mutation';
import type { PreEnrolmentQueueItem } from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

export interface PendingReview {
  item: PreEnrolmentQueueItem;
  action: 'approved' | 'rejected';
}

interface ReviewQueueItemDialogProps {
  pending: PendingReview | null;
  onClose: () => void;
}

export function ReviewQueueItemDialog({ pending, onClose }: ReviewQueueItemDialogProps) {
  const t = useTranslations('SchoolPreEnrolmentQueue');
  const [note, setNote] = useState('');
  const review = useReviewQueueItem();

  function handleOpenChange(open: boolean) {
    if (!open && !review.isPending) {
      setNote('');
      onClose();
    }
  }

  function handleConfirm() {
    if (!pending) return;
    const trimmed = note.trim();
    review.mutate(
      {
        itemDocumentId: pending.item.documentId,
        applicationDocumentId: pending.item.application?.documentId ?? null,
        status: pending.action,
        note: trimmed.length > 0 ? trimmed : undefined,
      },
      {
        onSuccess: () => {
          toast.success(t('reviewSuccess'));
          setNote('');
          onClose();
        },
        onError: () => toast.error(t('reviewError')),
      },
    );
  }

  return (
    <Dialog open={pending !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {pending?.action === 'rejected' ? t('rejectTitle') : t('approveTitle')}
          </DialogTitle>
          <DialogDescription>{t('dialogDescription')}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='review-note'>{t('noteLabel')}</Label>
          <Textarea
            id='review-note'
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={t('notePlaceholder')}
            maxLength={2000}
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose} disabled={review.isPending}>
            {t('cancel')}
          </Button>
          <Button
            type='button'
            variant={pending?.action === 'rejected' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={review.isPending}
          >
            {review.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {pending?.action === 'rejected' ? t('confirmReject') : t('confirmApprove')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
