'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SurfaceCard } from '@/modules/core';
import type { AssessmentResult } from '@/modules/agent-training/types/agent-training.types';

interface AssessmentResultPanelProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export function AssessmentResultPanel({ result, onRetake }: AssessmentResultPanelProps) {
  const t = useTranslations('AgentTraining');
  const Icon = result.passed ? CheckCircle2 : XCircle;

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Icon
          className={cn('h-6 w-6', result.passed ? 'text-vivid-mint-strong' : 'text-vivid-coral-strong')}
          aria-hidden='true'
        />
        <span className='text-base font-semibold text-ink-900'>
          {result.passed ? t('resultPassedTitle') : t('resultFailedTitle')}
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-foggy'>{t('resultScore', { score: result.score })}</span>
          <span className='text-foggy'>{t('resultPassMark', { passMark: result.passMark })}</span>
        </div>
        <Progress value={result.score} />
        <p className='text-xs text-foggy'>
          {t('resultCorrect', { correct: result.correct, total: result.total })}
        </p>
      </div>
      <Button variant='outline' onClick={onRetake} className='self-start'>
        {t('retakeAssessment')}
      </Button>
    </SurfaceCard>
  );
}
