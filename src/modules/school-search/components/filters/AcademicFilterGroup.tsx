'use client';

import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import { FilterGroup } from '@/modules/school-search/components/filters/FilterGroup';
import { InfoTooltip } from '@/modules/school-search/components/filters/InfoTooltip';
import { PROGRAM_TYPE_OPTIONS } from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { ProgramType } from '@/modules/school-search/types/filter.types';

interface AcademicFilterGroupProps {
  isAdvanced: boolean;
  signUpHref: string;
}

const TOOLTIP_KEY_BY_PROGRAM: Record<ProgramType, string> = {
  australian_cert: 'academic.programTooltips.australianCert',
  ib: 'academic.programTooltips.ib',
  elicos: 'academic.programTooltips.elicos',
};

export function AcademicFilterGroup({ isAdvanced, signUpHref }: AcademicFilterGroupProps) {
  const t = useTranslations('SchoolSearch.spec');

  const programTypes = useSchoolSearchStore((s) => s.programTypes);
  const toggleProgramType = useSchoolSearchStore((s) => s.toggleProgramType);
  const atarAvailable = useSchoolSearchStore((s) => s.atarAvailable);
  const setAtarAvailable = useSchoolSearchStore((s) => s.setAtarAvailable);
  const englishLanguageSupport = useSchoolSearchStore((s) => s.englishLanguageSupport);
  const setEnglishLanguageSupport = useSchoolSearchStore(
    (s) => s.setEnglishLanguageSupport,
  );

  const programsChange = (next: ProgramType[] | ProgramType | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    [
      ...programTypes.filter((v) => !nextArr.includes(v)),
      ...nextArr.filter((v) => !programTypes.includes(v)),
    ].forEach(toggleProgramType);
  };

  return (
    <FilterGroup title={t('academic.title')} defaultOpen>
      <div className="flex flex-col gap-4">
        <FilterGroup
          title={t('academic.programLabel')}
          defaultOpen
          locked={!isAdvanced}
          lockedDescription={t('lockedDescription')}
          signUpHref={signUpHref}
        >
          <div className="flex flex-col gap-2">
            <FilterChipGroup<ProgramType>
              options={PROGRAM_TYPE_OPTIONS}
              value={programTypes}
              onChange={programsChange}
              multi
              ariaLabel={t('academic.programLabel')}
              size="sm"
              getLabel={(option) => t(option.labelKey as never)}
            />
            <div className="flex flex-wrap gap-3 text-caption text-muted-foreground">
              {PROGRAM_TYPE_OPTIONS.map((option) => (
                <span key={option.value} className="inline-flex items-center gap-1">
                  {t(option.labelKey as never)}
                  <InfoTooltip
                    content={t(TOOLTIP_KEY_BY_PROGRAM[option.value] as never)}
                  />
                </span>
              ))}
            </div>
          </div>
        </FilterGroup>

        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="spec-atar-switch" className="text-sm font-medium">
              {t('academic.atarLabel')}
            </Label>
            <InfoTooltip content={t('academic.atarTooltip')} />
          </div>
          <Switch
            id="spec-atar-switch"
            checked={atarAvailable}
            onCheckedChange={setAtarAvailable}
            aria-label={t('academic.atarLabel')}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
          <Label htmlFor="spec-ell-switch" className="text-sm font-medium">
            {t('academic.englishSupportLabel')}
          </Label>
          <Switch
            id="spec-ell-switch"
            checked={englishLanguageSupport}
            onCheckedChange={setEnglishLanguageSupport}
            aria-label={t('academic.englishSupportLabel')}
          />
        </div>
      </div>
    </FilterGroup>
  );
}
