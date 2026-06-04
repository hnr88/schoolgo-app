'use client';

import { useTranslations } from 'next-intl';
import { StatTile } from '@/modules/core';
import { PARENT_STUDENT_STAT_TILES } from '@/modules/students/constants/parent-student-stats.constants';
import type { ParentStudentStats } from '@/modules/students/types/parent-component.types';

interface ParentStudentStatsRowProps {
  stats: ParentStudentStats;
  isLoading: boolean;
}

export function ParentStudentStatsRow({ stats, isLoading }: ParentStudentStatsRowProps) {
  const t = useTranslations('ParentStudents');

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {PARENT_STUDENT_STAT_TILES.map(({ key, icon, labelKey, iconClassName }) => (
        <StatTile
          key={key}
          icon={icon}
          iconClassName={iconClassName}
          label={t(labelKey)}
          value={stats[key]}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
