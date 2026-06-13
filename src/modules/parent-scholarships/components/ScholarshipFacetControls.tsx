'use client';

import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FACET_ANY,
  SCHOLARSHIP_TYPES,
  SCHOLARSHIP_TYPE_LABEL_KEYS,
  SCHOLARSHIP_YEAR_LEVELS,
  SCHOLARSHIP_YEAR_LEVEL_LABEL_KEYS,
} from '@/modules/parent-scholarships/constants/scholarships.constants';
import { ScholarshipAmountFacets } from '@/modules/parent-scholarships/components/ScholarshipAmountFacets';
import type {
  ScholarshipFacetControlsProps,
  ScholarshipType,
  ScholarshipYearLevel,
} from '@/modules/parent-scholarships/types/scholarship.types';

export function ScholarshipFacetControls({
  facets,
  hasActiveFacets,
  onTypeChange,
  onYearLevelChange,
  onNationalityChange,
  onMinAmountChange,
  onMaxAmountChange,
  onReset,
}: ScholarshipFacetControlsProps) {
  const t = useTranslations('ParentScholarships');

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='scholarship-type'>{t('facetType')}</Label>
        <Select
          value={facets.type ?? FACET_ANY}
          onValueChange={(v) => onTypeChange(v === FACET_ANY ? null : (v as ScholarshipType))}
        >
          <SelectTrigger id='scholarship-type'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FACET_ANY}>{t('facetAny')}</SelectItem>
            {SCHOLARSHIP_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {t(SCHOLARSHIP_TYPE_LABEL_KEYS[type])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='scholarship-year'>{t('facetYearLevel')}</Label>
        <Select
          value={facets.yearLevel ?? FACET_ANY}
          onValueChange={(v) =>
            onYearLevelChange(v === FACET_ANY ? null : (v as ScholarshipYearLevel))
          }
        >
          <SelectTrigger id='scholarship-year'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FACET_ANY}>{t('facetAny')}</SelectItem>
            {SCHOLARSHIP_YEAR_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {t(SCHOLARSHIP_YEAR_LEVEL_LABEL_KEYS[level])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='scholarship-nationality'>{t('facetNationality')}</Label>
        <Input
          id='scholarship-nationality'
          value={facets.nationality}
          placeholder={t('facetNationalityPlaceholder')}
          onChange={(e) => onNationalityChange(e.target.value)}
        />
      </div>

      <ScholarshipAmountFacets
        minAmountAud={facets.minAmountAud}
        maxAmountAud={facets.maxAmountAud}
        onMinAmountChange={onMinAmountChange}
        onMaxAmountChange={onMaxAmountChange}
      />

      <div className='flex items-end'>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          disabled={!hasActiveFacets}
          onClick={onReset}
        >
          {t('facetReset')}
        </Button>
      </div>
    </div>
  );
}
