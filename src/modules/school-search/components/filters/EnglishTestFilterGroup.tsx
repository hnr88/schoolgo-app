'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { FilterGroup } from '@/modules/school-search/components/filters/FilterGroup';
import {
  ENGLISH_TEST_CONFIG,
  ENGLISH_TEST_OPTIONS,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { EnglishTestType } from '@/modules/school-search/types/filter.types';

interface EnglishTestFilterGroupProps {
  isAdvanced: boolean;
}

export function EnglishTestFilterGroup({ isAdvanced }: EnglishTestFilterGroupProps) {
  const t = useTranslations('SchoolSearch.spec');
  const englishTest = useSchoolSearchStore((s) => s.englishTest);
  const setEnglishTest = useSchoolSearchStore((s) => s.setEnglishTest);

  const selected = englishTest?.type ?? null;
  const config = selected ? ENGLISH_TEST_CONFIG[selected] : null;
  const selectedLabel = selected ? t(`englishTest.${selected}` as never) : '';

  const handleTestChange = (next: EnglishTestType[] | EnglishTestType | null) => {
    if (Array.isArray(next)) return;
    if (next == null) {
      setEnglishTest(null);
      return;
    }
    const cfg = ENGLISH_TEST_CONFIG[next];
    setEnglishTest({ type: next, score: cfg.min });
  };

  const handleScoreChange = (raw: string) => {
    if (!selected || !config) return;
    if (raw === '') {
      setEnglishTest({ type: selected, score: config.min });
      return;
    }
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(config.max, Math.max(config.min, parsed));
    setEnglishTest({ type: selected, score: clamped });
  };

  return (
    <FilterGroup
      title={t('englishTest.title')}
      defaultOpen
      locked={!isAdvanced}
      lockedDescription={t('lockedDescription')}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('englishTest.selectorLabel')}
          </span>
          <FilterChipGroup<EnglishTestType>
            options={ENGLISH_TEST_OPTIONS}
            value={selected}
            onChange={handleTestChange}
            multi={false}
            ariaLabel={t('englishTest.selectorLabel')}
            size="sm"
            getLabel={(option) => t(option.labelKey as never)}
          />
        </div>

        {selected && config && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="spec-english-score"
              className="text-xs font-medium text-muted-foreground"
            >
              {t('englishTest.scoreLabel', { label: selectedLabel })}
            </label>
            <Input
              id="spec-english-score"
              type="number"
              inputMode="decimal"
              min={config.min}
              max={config.max}
              step={config.step}
              value={englishTest?.score ?? ''}
              placeholder={t('englishTest.scorePlaceholder')}
              onChange={(e) => handleScoreChange(e.target.value)}
            />
            <span className="text-xs text-muted-foreground">
              {t('englishTest.scoreHint', { min: config.min, max: config.max })}
            </span>
          </div>
        )}
      </div>
    </FilterGroup>
  );
}
