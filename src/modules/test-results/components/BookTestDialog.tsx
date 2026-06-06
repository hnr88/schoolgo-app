'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useBookTest } from '@/modules/test-results/hooks/useBookTest';
import type { BookTestDialogProps } from '@/modules/test-results/types/component.types';

export function BookTestDialog({ test }: BookTestDialogProps) {
  const t = useTranslations('BookTestDialog');
  const [open, setOpen] = useState(false);
  const {
    students,
    isLoading,
    isError,
    refetch,
    selectedStudentId,
    setSelectedStudentId,
    canSubmit,
    isPending,
    bookTest,
    reset,
  } = useBookTest(test.documentId);

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    setOpen(next);
  }

  async function handleBook() {
    const booked = await bookTest();
    if (booked) handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size='sm' className='gap-1.5' />}>
        <CalendarCheck className='h-4 w-4' aria-hidden='true' />
        {t('book')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('title', { test: test.title })}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <Skeleton className='h-10 w-full rounded-md' />
        ) : isError ? (
          <ErrorState
            message={t('studentsError')}
            onRetry={() => refetch()}
            retryLabel={t('retry')}
            framed
          />
        ) : students.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title={t('noStudentsTitle')}
            description={t('noStudentsSubtitle')}
            framed
          />
        ) : (
          <div className='flex flex-col gap-2'>
            <Label htmlFor='book-test-student'>{t('childLabel')}</Label>
            <Select
              value={selectedStudentId === '' ? null : selectedStudentId}
              onValueChange={(next) => {
                if (typeof next === 'string') setSelectedStudentId(next);
              }}
            >
              <SelectTrigger id='book-test-student' className='w-full'>
                <SelectValue placeholder={t('childPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.documentId} value={student.documentId}>
                    {student.firstName} {student.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className='text-sm text-muted-foreground'>{t('linkHint')}</p>
          </div>
        )}

        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => handleOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button type='button' onClick={handleBook} disabled={!canSubmit}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
