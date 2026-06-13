'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';

import { EmptyState, SectionHeading } from '@/modules/core';
import { CourseCard } from '@/modules/agent-training/components/CourseCard';
import type { TrainingCourse } from '@/modules/agent-training/types/agent-training.types';

interface CourseCatalogProps {
  courses: TrainingCourse[];
  onOpenCourse: (documentId: string) => void;
}

export function CourseCatalog({ courses, onOpenCourse }: CourseCatalogProps) {
  const t = useTranslations('AgentTraining');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading level={2} icon={GraduationCap} title={t('catalogTitle')} />
      {courses.length === 0 ? (
        <EmptyState
          framed
          icon={GraduationCap}
          title={t('catalogEmptyTitle')}
          description={t('catalogEmptyDescription')}
        />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {courses.map((course) => (
            <CourseCard key={course.documentId} course={course} onOpen={onOpenCourse} />
          ))}
        </div>
      )}
    </section>
  );
}
