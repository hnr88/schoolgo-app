'use client';

import { useTranslations } from 'next-intl';
import { UserPlus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useActiveChildStore, useParentStudents, ParentStudentAvatar } from '@/modules/students';

interface ParentSearchContextBarProps {
  className?: string;
}

export function ParentSearchContextBar({ className }: ParentSearchContextBarProps) {
  const t = useTranslations('ParentSearch');
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const { data } = useParentStudents();

  const students = data?.data ?? [];

  if (students.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 border-b border-divider bg-card px-4 py-2.5',
          className,
        )}
      >
        <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-foggy'>
          <UserPlus className='h-4 w-4' strokeWidth={1.5} aria-hidden='true' />
        </span>
        <span className='min-w-0 flex-1 truncate text-sm text-foggy'>{t('addStudentHint')}</span>
        <Link
          href='/parent/students/new'
          className='shrink-0 text-sm font-semibold text-primary-strong hover:underline'
        >
          {t('addStudent')}
        </Link>
      </div>
    );
  }

  const activeChild = activeChildId
    ? students.find((student) => student.documentId === activeChildId)
    : undefined;

  const name = activeChild
    ? `${activeChild.firstName} ${activeChild.lastName}`
    : t('allChildren');

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 border-b border-divider bg-card px-4 py-2.5',
        className,
      )}
    >
      {activeChild ? (
        <ParentStudentAvatar
          firstName={activeChild.firstName}
          lastName={activeChild.lastName}
          photoUrl={activeChild.photo?.url}
          size={28}
        />
      ) : null}
      <p className='min-w-0 truncate text-sm font-semibold text-ink-900'>
        {t('searchingFor', { name })}
      </p>
    </div>
  );
}
