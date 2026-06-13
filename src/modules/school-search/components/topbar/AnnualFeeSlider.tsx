'use client';

import { useTranslations } from 'next-intl';
import { Slider } from '@/components/ui/slider';
import { FEE_MAX, FEE_MIN } from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

export function AnnualFeeSlider() {
  const t = useTranslations('SchoolSearch.spec.topBar');
  const feeMin = useSchoolSearchStore((s) => s.feeMin);
  const feeMax = useSchoolSearchStore((s) => s.feeMax);
  const setFeeRange = useSchoolSearchStore((s) => s.setFeeRange);

  return (
    <div className="flex min-w-48 flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <span className="text-caption font-medium text-muted-foreground">{t('feeLabel')}</span>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-caption font-semibold text-primary-strong">
          {t('feeReadout', {
            min: Math.round(feeMin / 1000),
            max: Math.round(feeMax / 1000),
          })}
        </span>
      </div>
      <Slider
        value={[feeMin, feeMax]}
        min={FEE_MIN}
        max={FEE_MAX}
        step={1000}
        onValueChange={(value) => {
          if (Array.isArray(value) && value.length === 2) {
            setFeeRange(value[0], value[1]);
          }
        }}
        aria-label={t('feeLabel')}
      />
    </div>
  );
}
