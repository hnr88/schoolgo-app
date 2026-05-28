'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Circle, Clock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { VERIFICATION_STEP_ORDER } from '@/modules/agent-profile/constants/agent-profile.constants';
import type {
  AgentVerificationChecklistItem,
  AgentVerificationStatus,
  AgentVerificationStep,
} from '@/modules/agent-profile/types/agent-profile.types';

interface VerificationSectionProps {
  verification: AgentVerificationStatus;
}

export function VerificationSection({ verification }: VerificationSectionProps) {
  const t = useTranslations('AgentProfile');
  const isRejected = verification.adminReview === 'rejected';
  const checklistByStep = new Map<AgentVerificationStep, AgentVerificationChecklistItem>(
    verification.checklist.map((item) => [item.step, item]),
  );

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-display text-lg font-bold text-ink-900'>{t('verificationTitle')}</h2>
        <p className='text-sm text-muted-foreground'>{t('verificationSubtitle')}</p>
      </div>

      {verification.verified ? (
        <div className='flex items-start gap-3 rounded-lg border border-vivid-mint-soft bg-vivid-mint-soft p-4'>
          <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-vivid-mint' strokeWidth={2} aria-hidden='true' />
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-bold text-ink-900'>{t('bannerVerifiedTitle')}</span>
              <Badge className='bg-vivid-mint text-white'>{t('badgeVerified')}</Badge>
            </div>
            <p className='text-sm text-ink-900/80'>{t('bannerVerifiedBody')}</p>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex items-start gap-3 rounded-lg border p-4',
            isRejected ? 'border-rausch-200 bg-rausch-50' : 'border-arches-100 bg-arches-50',
          )}
        >
          <ShieldAlert
            className={cn('mt-0.5 h-5 w-5 shrink-0', isRejected ? 'text-rausch-600' : 'text-arches-600')}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-bold text-ink-900'>
                {isRejected ? t('bannerRejectedTitle') : t('bannerPendingTitle')}
              </span>
              <Badge variant='secondary'>
                {isRejected ? t('badgeRejected') : t('badgePending')}
              </Badge>
            </div>
            <p className='text-sm text-ink-900/80'>
              {isRejected ? t('bannerRejectedBody') : t('bannerPendingBody')}
            </p>
          </div>
        </div>
      )}

      <ul className='flex flex-col gap-2'>
        {VERIFICATION_STEP_ORDER.map((step) => {
          const item = checklistByStep.get(step);
          const done = item?.done ?? false;
          const isReviewStep = step === 'admin_review';
          const reviewPending = isReviewStep && !done && !isRejected;

          return (
            <li
              key={step}
              className='flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3'
            >
              {done ? (
                <CheckCircle2 className='h-5 w-5 shrink-0 text-vivid-mint' strokeWidth={2} aria-hidden='true' />
              ) : reviewPending ? (
                <Clock className='h-5 w-5 shrink-0 text-arches-600' strokeWidth={2} aria-hidden='true' />
              ) : (
                <Circle className='h-5 w-5 shrink-0 text-foggy' strokeWidth={2} aria-hidden='true' />
              )}
              <div className='flex flex-1 flex-col'>
                <span className='text-sm font-medium text-ink-900'>{t(`step_${step}`)}</span>
                <span className='text-xs text-muted-foreground'>{t(`stepHint_${step}`)}</span>
              </div>
              <Badge variant={done ? 'default' : 'secondary'} className='shrink-0'>
                {done ? t('stepDone') : reviewPending ? t('stepInReview') : t('stepPending')}
              </Badge>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
