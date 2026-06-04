'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
import { usePublishTemplate } from '@/modules/school-templates/queries/use-publish-template.mutation';
import type { PublishImpact } from '@/modules/school-templates/types/publish.types';

interface PublishDialogProps {
  open: boolean;
  documentId: string | null;
  onOpenChange: (open: boolean) => void;
}

export function PublishDialog({ open, documentId, onOpenChange }: PublishDialogProps) {
  const t = useTranslations('SchoolTemplates');
  const publishMutation = usePublishTemplate();
  const [impact, setImpact] = useState<PublishImpact | null>(null);

  const close = () => {
    setImpact(null);
    onOpenChange(false);
  };

  const handlePublish = (acknowledgeImpact: boolean) => {
    if (!documentId) return;
    publishMutation.mutate(
      { documentId, acknowledgeImpact },
      {
        onSuccess: (result) => {
          if (result.impact && !acknowledgeImpact) {
            setImpact(result.impact);
            return;
          }
          close();
        },
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {impact ? t('publishImpactTitle') : t('publishTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {impact ? impact.message : t('publishDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            data-testid='publish-confirm'
            disabled={publishMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              handlePublish(impact !== null);
            }}
          >
            {impact ? t('publishImpactConfirm') : t('publishConfirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
