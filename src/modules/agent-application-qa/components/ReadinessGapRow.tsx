'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { criterionLabel } from '@/modules/agent-application-qa/lib/criterion-label';
import type { ReadinessGap } from '@/modules/agent-application-qa/types/readiness.types';

const STATUS_ICON = {
  blocker: XCircle,
  warning: AlertTriangle,
  unknown: HelpCircle,
  met: HelpCircle,
} as const;

const STATUS_ICON_COLOR = {
  blocker: 'text-rose-500',
  warning: 'text-amber-500',
  unknown: 'text-muted-foreground',
  met: 'text-emerald-500',
} as const;

export function ReadinessGapRow({ gap }: { gap: ReadinessGap }) {
  const t = useTranslations('AgentApplicationQa');
  const Icon = STATUS_ICON[gap.status];
  const label = criterionLabel(gap.criterion, t);

  return (
    <li className='flex items-start gap-3 px-4 py-3'>
      <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', STATUS_ICON_COLOR[gap.status])} aria-hidden='true' />
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='text-sm font-medium text-foreground'>{label}</span>
        <span className='text-xs text-muted-foreground'>{gap.detail}</span>
      </div>
    </li>
  );
}
