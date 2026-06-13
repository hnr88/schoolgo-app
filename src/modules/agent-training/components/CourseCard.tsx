'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { LevelBadge } from '@/modules/agent-training/components/LevelBadge';
import type { TrainingCourse } from '@/modules/agent-training/types/agent-training.types';

interface CourseCardProps {
  course: TrainingCourse;
  onOpen: (documentId: string) => void;
}

export function CourseCard({ course, onOpen }: CourseCardProps) {
  const t = useTranslations('AgentTraining');
  const isMandatory = (course.mandatoryFor ?? []).includes('agent');

  return (
    <SurfaceCard elevation='interactive' className='flex flex-col gap-4'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-base font-semibold text-ink-900'>{course.title}</h3>
        <LevelBadge level={course.level} />
      </div>
      {course.description ? (
        <p className='line-clamp-3 text-sm text-foggy'>{course.description}</p>
      ) : (
        <p className='text-sm text-muted-foreground'>{t('noDescription')}</p>
      )}
      <div className='mt-auto flex items-center justify-between gap-3'>
        {isMandatory ? (
          <span className='inline-flex items-center gap-1 text-xs font-semibold text-primary-strong'>
            <Star className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
            {t('mandatoryChip')}
          </span>
        ) : (
          <span />
        )}
        <Button variant='outline' size='sm' onClick={() => onOpen(course.documentId)}>
          {t('viewCourse')}
          <ArrowRight className='ml-1.5 h-4 w-4' aria-hidden='true' />
        </Button>
      </div>
    </SurfaceCard>
  );
}
