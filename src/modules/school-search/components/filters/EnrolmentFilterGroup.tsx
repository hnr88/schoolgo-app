'use client';

import { useTranslations } from 'next-intl';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { FilterGroup } from '@/modules/school-search/components/filters/FilterGroup';
import { Stepper } from '@/modules/school-search/components/filters/Stepper';
import {
  ENTRY_TERM_OPTIONS,
  ENTRY_YEAR_LEVEL_OPTIONS,
  STUDENT_AGE_MAX,
  STUDENT_AGE_MIN,
} from '@/modules/school-search/constants/filter-options.constants';
import { getCricosAgeHint } from '@/modules/school-search/lib/cricos-age-hint';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type {
  EntryTerm,
  EntryYearLevel,
} from '@/modules/school-search/types/filter.types';

interface EnrolmentFilterGroupProps {
  isAdvanced: boolean;
  signUpHref: string;
}

export function EnrolmentFilterGroup({ isAdvanced, signUpHref }: EnrolmentFilterGroupProps) {
  const t = useTranslations('SchoolSearch.spec');

  const yearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const setYearLevels = useSchoolSearchStore((s) => s.setEntryYearLevels);
  const studentAge = useSchoolSearchStore((s) => s.studentAge);
  const setStudentAge = useSchoolSearchStore((s) => s.setStudentAge);
  const entryTerms = useSchoolSearchStore((s) => s.entryTerms);
  const toggleEntryTerm = useSchoolSearchStore((s) => s.toggleEntryTerm);

  const yearLevelsChange = (next: EntryYearLevel[] | EntryYearLevel | null) => {
    setYearLevels(Array.isArray(next) ? next : next ? [next] : []);
  };

  const termsChange = (next: EntryTerm[] | EntryTerm | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    [
      ...entryTerms.filter((v) => !nextArr.includes(v)),
      ...nextArr.filter((v) => !entryTerms.includes(v)),
    ].forEach(toggleEntryTerm);
  };

  const hint = getCricosAgeHint(studentAge, yearLevels);
  const expectedLabels = hint?.expectedYearLevels.map((yl) => t(`yearLevel.${yl}` as never)).join(' / ');

  return (
    <FilterGroup title={t('enrolment.title')} defaultOpen>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('enrolment.yearLevelLabel')}
          </span>
          <FilterChipGroup<EntryYearLevel>
            options={ENTRY_YEAR_LEVEL_OPTIONS}
            value={yearLevels}
            onChange={yearLevelsChange}
            multi
            ariaLabel={t('enrolment.yearLevelLabel')}
            size="sm"
            getLabel={(option) => t(option.labelKey as never)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t('enrolment.ageLabel')}
          </span>
          <Stepper
            value={studentAge}
            onChange={setStudentAge}
            min={STUDENT_AGE_MIN}
            max={STUDENT_AGE_MAX}
            ariaLabel={t('enrolment.ageLabel')}
            placeholder={t('enrolment.agePlaceholder')}
          />
          {hint && expectedLabels && (
            <p className="text-caption text-muted-foreground">
              {t('enrolment.ageHint', { age: hint.age, expected: expectedLabels })}
            </p>
          )}
        </div>

        <FilterGroup
          title={t('enrolment.termLabel')}
          defaultOpen
          locked={!isAdvanced}
          lockedDescription={t('lockedDescription')}
          signUpHref={signUpHref}
        >
          <FilterChipGroup<EntryTerm>
            options={ENTRY_TERM_OPTIONS}
            value={entryTerms}
            onChange={termsChange}
            multi
            ariaLabel={t('enrolment.termLabel')}
            size="sm"
            getLabel={(option) => t(option.labelKey as never)}
          />
        </FilterGroup>
      </div>
    </FilterGroup>
  );
}
