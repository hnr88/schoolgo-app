'use client';

import { useTranslations } from 'next-intl';
import { Archive, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useArchiveParentStudent } from '@/modules/students/queries/use-archive-parent-student.mutation';
import { useUnarchiveParentStudent } from '@/modules/students/queries/use-unarchive-parent-student.mutation';
import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

export function ParentStudentArchiveButton({ student }: { student: ParentStudentDetail }) {
  const t = useTranslations('ParentStudents');
  const archiveParentStudent = useArchiveParentStudent();
  const unarchiveParentStudent = useUnarchiveParentStudent();

  if (student.status === 'archived') {
    const handleRestore = () =>
      unarchiveParentStudent.mutate(student.documentId, {
        onSuccess: () => toast.success(t('restoreSuccess')),
        onError: () => toast.error(t('archiveError')),
      });

    return (
      <Button
        variant='outline'
        size='sm'
        className='gap-1.5'
        onClick={handleRestore}
        disabled={unarchiveParentStudent.isPending}
      >
        <RotateCcw className='h-4 w-4' />
        {t('restore')}
      </Button>
    );
  }

  const handleArchive = () =>
    archiveParentStudent.mutate(student.documentId, {
      onSuccess: () => toast.success(t('archiveSuccess')),
      onError: () => toast.error(t('archiveError')),
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant='outline' size='sm' className='gap-1.5' />}
        disabled={archiveParentStudent.isPending}
      >
        <Archive className='h-4 w-4' />
        {t('archive')}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('archiveConfirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('archiveConfirmBody')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchive} disabled={archiveParentStudent.isPending}>
            {t('archiveConfirmAction')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
