'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { WriteReviewForm } from '@/modules/parent-school-reviews/components/WriteReviewForm';
import type { ReviewableSchool } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

interface WriteReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schools: ReviewableSchool[];
  presetSchoolDocumentId: string | null;
}

export function WriteReviewDialog({
  open,
  onOpenChange,
  schools,
  presetSchoolDocumentId,
}: WriteReviewDialogProps) {
  const t = useTranslations('ParentReviews');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('writeReviewTitle')}</DialogTitle>
          <DialogDescription>{t('writeReviewDescription')}</DialogDescription>
        </DialogHeader>
        {open && (
          <WriteReviewForm
            key={presetSchoolDocumentId ?? 'new'}
            schools={schools}
            presetSchoolDocumentId={presetSchoolDocumentId}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
