'use client';

import { useTranslations } from 'next-intl';
import { BadgeCheck } from 'lucide-react';

import { EmptyState, SectionHeading } from '@/modules/core';
import { CertificationRow } from '@/modules/agent-training/components/CertificationRow';
import type { Certification } from '@/modules/agent-training/types/agent-training.types';

export function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  const t = useTranslations('AgentTraining');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading level={2} icon={BadgeCheck} title={t('certificationsTitle')} />
      {certifications.length === 0 ? (
        <EmptyState
          framed
          icon={BadgeCheck}
          title={t('certEmptyTitle')}
          description={t('certEmptyDescription')}
        />
      ) : (
        <div className='flex flex-col gap-3'>
          {certifications.map((certification) => (
            <CertificationRow key={certification.documentId} certification={certification} />
          ))}
        </div>
      )}
    </section>
  );
}
