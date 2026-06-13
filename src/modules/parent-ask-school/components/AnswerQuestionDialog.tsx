'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AnswerQuestionForm } from '@/modules/parent-ask-school/components/AnswerQuestionForm';

interface AnswerQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionDocumentId: string | null;
  questionBody: string;
}

export function AnswerQuestionDialog({
  open,
  onOpenChange,
  questionDocumentId,
  questionBody,
}: AnswerQuestionDialogProps) {
  const t = useTranslations('AskSchool');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('answerTitle')}</DialogTitle>
          <DialogDescription>{questionBody}</DialogDescription>
        </DialogHeader>
        {open && questionDocumentId && (
          <AnswerQuestionForm
            questionDocumentId={questionDocumentId}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
