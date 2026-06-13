'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

import { ErrorState, SurfaceCard } from '@/modules/core';
import { Separator } from '@/components/ui/separator';
import { useTrainingCourse } from '@/modules/agent-training/queries/use-training-course.query';
import { LevelBadge } from '@/modules/agent-training/components/LevelBadge';
import { LessonsList } from '@/modules/agent-training/components/LessonsList';
import { AssessmentForm } from '@/modules/agent-training/components/AssessmentForm';

export function CourseDetailBody({ documentId }: { documentId: string }) {
  const t = useTranslations('AgentTraining');
  const { data: course, isLoading, isError, refetch } = useTrainingCourse(documentId);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12 text-foggy'>
        <Loader2 className='h-5 w-5 animate-spin' aria-hidden='true' />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <ErrorState
        message={t('detailError')}
        onRetry={() => void refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const assessment = course.assessments[0];

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-3'>
        <LevelBadge level={course.level} />
      </div>
      {course.description ? (
        <p className='text-sm text-foggy'>{course.description}</p>
      ) : null}

      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('lessonsTitle')}</h3>
        <LessonsList lessons={course.lessons} />
      </section>

      <Separator />

      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('assessmentTitle')}</h3>
        {assessment ? (
          <AssessmentForm
            assessmentDocumentId={assessment.documentId}
            passMark={assessment.passMark}
          />
        ) : (
          <SurfaceCard padding='sm'>
            <p className='text-sm text-muted-foreground'>{t('noAssessment')}</p>
          </SurfaceCard>
        )}
      </section>
    </div>
  );
}
