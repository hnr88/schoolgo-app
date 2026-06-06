'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TestSession } from '@/modules/test-runner/types/test-session.types';

export function TestScoreSummary({ session }: { session: TestSession }) {
  const t = useTranslations('TestRunner');
  const summary = session.scoreSummary ?? null;

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='items-center gap-3 text-center'>
        <span className='flex size-12 items-center justify-center rounded-full bg-babu-50 text-babu-700'>
          <CheckCircle2 className='size-6' aria-hidden='true' />
        </span>
        <CardTitle>{t('result.title')}</CardTitle>
        <CardDescription>
          {summary ? t('result.scored') : t('result.submitted')}
        </CardDescription>
      </CardHeader>
      {summary ? (
        <CardContent className='flex flex-col gap-2 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>{t('result.score')}</span>
            <span className='font-medium text-ink-900'>
              {summary.correct} / {summary.totalItems}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>{t('result.percent')}</span>
            <span className='font-medium text-ink-900'>{summary.percent}%</span>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
