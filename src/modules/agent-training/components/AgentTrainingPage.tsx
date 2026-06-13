'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';

import { ErrorState, SectionHeading } from '@/modules/core';
import { useAgentTraining } from '@/modules/agent-training/hooks/useAgentTraining';
import { TierSummary } from '@/modules/agent-training/components/TierSummary';
import { CertificationsSection } from '@/modules/agent-training/components/CertificationsSection';
import { CourseCatalog } from '@/modules/agent-training/components/CourseCatalog';
import { CourseDetailDialog } from '@/modules/agent-training/components/CourseDetailDialog';
import { TrainingSkeleton } from '@/modules/agent-training/components/TrainingSkeleton';

export function AgentTrainingPage() {
  const t = useTranslations('AgentTraining');
  const {
    courses,
    certifications,
    tier,
    activeCount,
    isLoading,
    isError,
    openCourseId,
    openCourse,
    closeCourse,
    retry,
  } = useAgentTraining();

  const openCourseData = courses.find((c) => c.documentId === openCourseId) ?? null;

  return (
    <div className='flex flex-col gap-8'>
      <SectionHeading
        level={1}
        icon={GraduationCap}
        title={t('title')}
        description={t('subtitle')}
      />

      {isError ? (
        <ErrorState framed message={t('errorMessage')} onRetry={retry} retryLabel={t('retry')} />
      ) : isLoading ? (
        <TrainingSkeleton />
      ) : (
        <>
          <TierSummary tier={tier} activeCount={activeCount} courseCount={courses.length} />
          <CertificationsSection certifications={certifications} />
          <CourseCatalog courses={courses} onOpenCourse={openCourse} />
        </>
      )}

      <CourseDetailDialog
        course={openCourseData}
        open={openCourseId !== null}
        onOpenChange={(next) => (next ? undefined : closeCourse())}
      />
    </div>
  );
}
