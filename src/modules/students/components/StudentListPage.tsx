'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { StudentListToolbar } from '@/modules/students/components/StudentListToolbar';
import { StudentTable } from '@/modules/students/components/StudentTable';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function StudentListPage() {
  const t = useTranslations('Students');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useStudents({ page, status, search });

  const students = data?.data ?? [];
  const pagination = data?.meta?.pagination;

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h1>
        <p className='mt-1 text-sm text-foggy'>{t('subtitle')}</p>
      </div>

      <StudentListToolbar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
      />

      <StudentTable students={students} isLoading={isLoading} />

      {pagination && pagination.pageCount > 1 && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-foggy'>
            {t('paginationInfo', {
              from: (pagination.page - 1) * pagination.pageSize + 1,
              to: Math.min(pagination.page * pagination.pageSize, pagination.total),
              total: pagination.total,
            })}
          </p>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={pagination.page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={pagination.page >= pagination.pageCount}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
