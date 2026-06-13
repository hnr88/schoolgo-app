'use client';

import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { parseAmountInput } from '@/modules/parent-scholarships/lib/parse-amount-input';

interface ScholarshipAmountFacetsProps {
  minAmountAud: number | null;
  maxAmountAud: number | null;
  onMinAmountChange: (minAmountAud: number | null) => void;
  onMaxAmountChange: (maxAmountAud: number | null) => void;
}

export function ScholarshipAmountFacets({
  minAmountAud,
  maxAmountAud,
  onMinAmountChange,
  onMaxAmountChange,
}: ScholarshipAmountFacetsProps) {
  const t = useTranslations('ParentScholarships');

  return (
    <>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='scholarship-min'>{t('facetMinAmount')}</Label>
        <Input
          id='scholarship-min'
          type='number'
          inputMode='numeric'
          min={0}
          value={minAmountAud ?? ''}
          placeholder={t('facetAmountPlaceholder')}
          onChange={(e) => onMinAmountChange(parseAmountInput(e.target.value))}
        />
      </div>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='scholarship-max'>{t('facetMaxAmount')}</Label>
        <Input
          id='scholarship-max'
          type='number'
          inputMode='numeric'
          min={0}
          value={maxAmountAud ?? ''}
          placeholder={t('facetAmountPlaceholder')}
          onChange={(e) => onMaxAmountChange(parseAmountInput(e.target.value))}
        />
      </div>
    </>
  );
}
