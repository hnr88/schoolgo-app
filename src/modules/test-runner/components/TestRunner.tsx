'use client';

import { useTranslations } from 'next-intl';
import { Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuestionRenderer } from '@/modules/test-runner/components/QuestionRenderer';
import { ProctoringCapture } from '@/modules/test-runner/components/ProctoringCapture';
import { TestScoreSummary } from '@/modules/test-runner/components/TestScoreSummary';
import { TestLandingSkeleton } from '@/modules/test-runner/components/TestLandingSkeleton';
import { TestLinkError } from '@/modules/test-runner/components/TestLinkError';
import { useTestRunner } from '@/modules/test-runner/hooks/useTestRunner';
import { formatClock } from '@/modules/test-runner/lib/runner-time';

export function TestRunner({ testDocumentId }: { testDocumentId: string }) {
  const t = useTranslations('TestRunner');
  const runner = useTestRunner({ testDocumentId });
  const { session, item, currentIndex } = runner;

  if (runner.startError) {
    return <TestLinkError error={{ kind: 'invalid_token', message: runner.startError.message }} />;
  }
  if (runner.isPreparing) {
    return <TestLandingSkeleton />;
  }
  if (session && (session.status === 'completed' || session.status === 'submitted')) {
    return <TestScoreSummary session={session} />;
  }
  if (!session || !item) {
    return <TestLinkError error={{ kind: 'unavailable', message: t('runner.noItems') }} />;
  }

  const total = session.test?.items.length ?? currentIndex + 1;
  const progress = Math.min(100, Math.round(((currentIndex + 1) / Math.max(total, 1)) * 100));

  return (
    <div className='flex w-full max-w-xl flex-col items-center gap-6'>
      <Card className='w-full max-w-xl'>
        <CardHeader className='gap-3'>
          <div className='flex items-center justify-between gap-4'>
            <CardTitle className='text-lg'>{session.test?.title}</CardTitle>
            <span className='flex items-center gap-1 text-sm font-medium text-ink-900' aria-live='polite'>
              <Timer className='size-4' aria-hidden='true' />
              {formatClock(runner.secondsLeft)}
            </span>
          </div>
          <Progress value={progress} aria-label={t('runner.progressLabel')} />
        </CardHeader>

        <CardContent>
          <QuestionRenderer
            item={item}
            index={currentIndex}
            total={total}
            value={runner.responses[item.id] ?? ''}
            onChange={(value) => runner.setAnswer(item.id, value)}
          />
        </CardContent>

        <CardFooter className='flex items-center justify-between gap-3'>
          <Button
            type='button'
            variant='outline'
            disabled={!runner.canGoPrevious}
            onClick={runner.goPrevious}
          >
            {t('runner.previous')}
          </Button>
          {runner.isLast ? (
            <Button type='button' onClick={runner.submit} disabled={runner.isSubmitting}>
              {runner.isSubmitting ? t('runner.submitting') : t('runner.submit')}
            </Button>
          ) : (
            <Button type='button' onClick={runner.goNext} disabled={runner.isAdvancing}>
              {t('runner.next')}
            </Button>
          )}
        </CardFooter>
      </Card>
      <ProctoringCapture sessionDocumentId={session.documentId} isActive={runner.isInProgress} />
    </div>
  );
}
