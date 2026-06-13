'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Sparkles, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SurfaceCard, SectionHeading, EmptyState } from '@/modules/core';
import { useScholarshipMatchPanel } from '@/modules/parent-scholarships/hooks/useScholarshipMatchPanel';
import { MatchResultsList } from '@/modules/parent-scholarships/components/MatchResultsList';

export function ScholarshipMatchPanel() {
  const t = useTranslations('ParentScholarships');
  const panel = useScholarshipMatchPanel();

  return (
    <SurfaceCard className='flex flex-col gap-5'>
      <SectionHeading
        level={2}
        icon={Sparkles}
        title={t('matchTitle')}
        description={t('matchSubtitle')}
      />

      {panel.isStudentsLoading ? null : !panel.hasStudents ? (
        <EmptyState
          icon={Users}
          title={t('matchNoStudentsTitle')}
          description={t('matchNoStudentsDescription')}
          action={
            <Link href='/parent/students/new' className={buttonVariants()}>
              {t('matchAddStudentCta')}
            </Link>
          }
        />
      ) : (
        <>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
            <div className='flex flex-1 flex-col gap-1.5'>
              <Label htmlFor='scholarship-student'>{t('matchStudentLabel')}</Label>
              <Select
                value={panel.studentId ?? undefined}
                onValueChange={(value) => panel.setStudentId(value)}
              >
                <SelectTrigger id='scholarship-student'>
                  <SelectValue placeholder={t('matchStudentPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {panel.students.map((student) => (
                    <SelectItem key={student.documentId} value={student.documentId}>
                      {student.firstName} {student.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type='button'
              disabled={!panel.studentId || panel.isMatching}
              onClick={panel.runMatch}
            >
              {panel.isMatching ? (
                <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
              ) : (
                <Sparkles className='h-4 w-4' aria-hidden='true' />
              )}
              {t('matchRunCta')}
            </Button>
          </div>

          {panel.hasResult ? (
            <MatchResultsList
              matches={panel.matches}
              eligibleCount={panel.eligibleCount}
              evaluatedCount={panel.evaluatedCount}
            />
          ) : (
            <p className='text-sm text-foggy'>{t('matchHint')}</p>
          )}
        </>
      )}
    </SurfaceCard>
  );
}
