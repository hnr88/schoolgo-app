'use client';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CourseDetailBody } from '@/modules/agent-training/components/CourseDetailBody';
import type { TrainingCourse } from '@/modules/agent-training/types/agent-training.types';

interface CourseDetailDialogProps {
  course: TrainingCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDetailDialog({ course, open, onOpenChange }: CourseDetailDialogProps) {
  const t = useTranslations('AgentTraining');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{course?.title ?? t('courseDetailTitle')}</DialogTitle>
          <DialogDescription>{t('courseDetailDescription')}</DialogDescription>
        </DialogHeader>
        {course ? (
          <ScrollArea className='max-h-[70vh] pr-4'>
            <CourseDetailBody documentId={course.documentId} />
          </ScrollArea>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
