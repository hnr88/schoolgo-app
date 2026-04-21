'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import type { Student } from '@/modules/students/types/student.types';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
}

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'outline'> = {
  active: 'default',
  archived: 'secondary',
  enrolled: 'outline',
};

export function StudentTable({ students, isLoading }: StudentTableProps) {
  const t = useTranslations('Students');

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-14 w-full rounded-lg' />
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
        <p className='text-sm text-foggy'>{t('emptyState')}</p>
      </div>
    );
  }

  return (
    <div className='rounded-lg border border-border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('columnName')}</TableHead>
            <TableHead>{t('columnNationality')}</TableHead>
            <TableHead>{t('columnYearLevel')}</TableHead>
            <TableHead>{t('columnTargetEntry')}</TableHead>
            <TableHead>{t('columnStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.documentId} className='cursor-pointer hover:bg-muted/50'>
              <TableCell>
                <Link
                  href={`/dashboard/students/${student.documentId}`}
                  className='font-medium text-ink-900 hover:text-primary'
                >
                  {student.firstName} {student.lastName}
                </Link>
              </TableCell>
              <TableCell className='text-foggy'>{student.nationality ?? '—'}</TableCell>
              <TableCell className='text-foggy'>{student.currentYearLevel ?? '—'}</TableCell>
              <TableCell className='text-foggy'>
                {student.targetEntryYear
                  ? `${student.targetEntryYear}${student.targetEntryTerm ? `, ${student.targetEntryTerm}` : ''}`
                  : '—'}
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[student.status] ?? 'secondary'}>
                  {t(`status${student.status.charAt(0).toUpperCase()}${student.status.slice(1)}`)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
