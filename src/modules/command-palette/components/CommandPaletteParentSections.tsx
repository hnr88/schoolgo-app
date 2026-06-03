'use client';

import { GraduationCap, FileText, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { useParentStudents } from '@/modules/students';
import { useParentApplications } from '@/modules/applications';
import {
  PALETTE_PARENT_APPLICATIONS_PAGE_SIZE,
  PALETTE_PARENT_STUDENTS_PAGE_SIZE,
} from '@/modules/command-palette/constants/command-palette.constants';

interface CommandPaletteParentSectionsProps {
  onSelect: (href: string) => void;
}

export function CommandPaletteParentSections({ onSelect }: CommandPaletteParentSectionsProps) {
  const t = useTranslations('CommandPalette');
  const studentsQuery = useParentStudents({ pageSize: PALETTE_PARENT_STUDENTS_PAGE_SIZE });
  const applicationsQuery = useParentApplications({ pageSize: PALETTE_PARENT_APPLICATIONS_PAGE_SIZE });

  const students = studentsQuery.data?.data ?? [];
  const applications = applicationsQuery.data?.data ?? [];

  return (
    <>
      <CommandGroup heading={t('sections.children')}>
        {studentsQuery.isLoading ? (
          <Skeleton className='mx-1 my-1 h-9 rounded-lg' />
        ) : (
          students.map((student) => (
            <CommandItem
              key={student.documentId}
              value={`child-${student.firstName} ${student.lastName}`}
              onSelect={() => onSelect(`/parent/students/${student.documentId}`)}
            >
              <GraduationCap strokeWidth={1.5} />
              <span>
                {student.firstName} {student.lastName}
              </span>
            </CommandItem>
          ))
        )}
      </CommandGroup>

      <CommandGroup heading={t('sections.applications')}>
        {applicationsQuery.isLoading ? (
          <Skeleton className='mx-1 my-1 h-9 rounded-lg' />
        ) : (
          applications.map((application) => (
            <CommandItem
              key={application.documentId}
              value={`application-${application.school.name} ${application.student.firstName}`}
              onSelect={() => onSelect(`/parent/applications/${application.documentId}`)}
            >
              <FileText strokeWidth={1.5} />
              <span>
                {application.school.name} · {application.student.firstName} {application.student.lastName}
              </span>
            </CommandItem>
          ))
        )}
      </CommandGroup>

      <CommandGroup heading={t('sections.actions')}>
        <CommandItem value='action-search-schools' onSelect={() => onSelect('/parent/search')}>
          <Search strokeWidth={1.5} />
          <span>{t('actions.searchSchools')}</span>
        </CommandItem>
      </CommandGroup>
    </>
  );
}
