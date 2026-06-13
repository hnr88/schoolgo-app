'use client';

import { useTranslations } from 'next-intl';
import { CircleHelp, MinusCircle, PlusCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FACTOR_LABEL_KEYS } from '@/modules/parent-admission-likelihood/constants/admission-likelihood.constants';
import type {
  FactorListProps,
  LikelihoodFactor,
} from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

const IMPACT_STYLES: Record<LikelihoodFactor['impact'], string> = {
  positive: 'text-vivid-mint-strong',
  negative: 'text-rausch-700',
  neutral: 'text-foggy',
  unknown: 'text-quill',
};

const IMPACT_ICONS = {
  positive: PlusCircle,
  negative: XCircle,
  neutral: MinusCircle,
  unknown: CircleHelp,
} as const;

export function FactorList({ factors }: FactorListProps) {
  const t = useTranslations('ParentAdmissionLikelihood');

  return (
    <ul className='flex flex-col gap-2'>
      {factors.map((factor) => {
        const Icon = IMPACT_ICONS[factor.impact];
        const labelKey = FACTOR_LABEL_KEYS[factor.factor];
        return (
          <li key={factor.factor} className='flex items-start gap-2 text-sm'>
            <Icon
              className={cn('mt-0.5 h-4 w-4 shrink-0', IMPACT_STYLES[factor.impact])}
              strokeWidth={1.75}
              aria-hidden='true'
            />
            <span className='min-w-0'>
              {labelKey && (
                <span className='font-semibold text-ink-900'>{t(labelKey)}: </span>
              )}
              <span className='text-hof'>{factor.detail}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
