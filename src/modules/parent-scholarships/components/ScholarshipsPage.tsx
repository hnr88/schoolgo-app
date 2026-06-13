'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/modules/core';
import { ScholarshipMatchPanel } from '@/modules/parent-scholarships/components/ScholarshipMatchPanel';
import { ScholarshipBrowseSection } from '@/modules/parent-scholarships/components/ScholarshipBrowseSection';

export function ScholarshipsPage() {
  const t = useTranslations('ParentScholarships');

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={GraduationCap} title={t('title')} description={t('subtitle')} />
      <ScholarshipMatchPanel />
      <ScholarshipBrowseSection />
    </div>
  );
}
