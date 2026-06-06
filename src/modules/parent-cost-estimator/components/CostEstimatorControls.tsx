'use client';

import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RATE_OPTIONS,
  TUITION_BASIS_OPTIONS,
  YEAR_OPTIONS,
} from '@/modules/parent-cost-estimator/constants/cost-estimator.constants';
import type { TuitionBasis } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

interface CostEstimatorControlsProps {
  years: number;
  ratePct: number;
  basis: TuitionBasis;
  onYearsChange: (years: number) => void;
  onRateChange: (ratePct: number) => void;
  onBasisChange: (basis: TuitionBasis) => void;
}

export function CostEstimatorControls({
  years,
  ratePct,
  basis,
  onYearsChange,
  onRateChange,
  onBasisChange,
}: CostEstimatorControlsProps) {
  const t = useTranslations('ParentCostEstimator');

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='cost-years'>{t('yearsLabel')}</Label>
        <Select value={String(years)} onValueChange={(value) => onYearsChange(Number(value))}>
          <SelectTrigger id='cost-years'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEAR_OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {t('yearsOption', { count: option })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='cost-rate'>{t('rateLabel')}</Label>
        <Select value={String(ratePct)} onValueChange={(value) => onRateChange(Number(value))}>
          <SelectTrigger id='cost-rate'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RATE_OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {t('rateOption', { rate: option })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='cost-basis'>{t('basisLabel')}</Label>
        <Select value={basis} onValueChange={(value) => onBasisChange(value as TuitionBasis)}>
          <SelectTrigger id='cost-basis'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TUITION_BASIS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {t(option === 'lowest' ? 'basisLowest' : 'basisHighest')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
