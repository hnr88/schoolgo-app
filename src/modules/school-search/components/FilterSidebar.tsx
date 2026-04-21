'use client';
import { Check, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  CURRICULUM_OPTIONS,
  PRICE_MIN,
  PRICE_MAX,
  STATE_OPTIONS,
} from '@/modules/school-search/constants/school.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { AustralianState } from '@/modules/school-search/types/school.types';

export function FilterSidebar() {
  const t = useTranslations('SchoolSearch.filters');
  const tStates = useTranslations('SchoolSearch.states');

  const priceMin = useSchoolSearchStore((s) => s.priceMin);
  const priceMax = useSchoolSearchStore((s) => s.priceMax);
  const setPriceRange = useSchoolSearchStore((s) => s.setPriceRange);
  const curricula = useSchoolSearchStore((s) => s.curricula);
  const toggleCurriculum = useSchoolSearchStore((s) => s.toggleCurriculum);
  const selectedStates = useSchoolSearchStore((s) => s.states);
  const toggleState = useSchoolSearchStore((s) => s.toggleState);
  const diagnosticTests = useSchoolSearchStore((s) => s.diagnosticTests);
  const setDiagnosticTests = useSchoolSearchStore((s) => s.setDiagnosticTests);

  return (
    <aside className='hidden shrink-0 lg:sticky lg:top-20 lg:block lg:h-[calc(100vh-5rem)] lg:w-sidebar lg:p-4'>
      <div className='no-scrollbar flex h-full flex-col gap-8 overflow-y-auto rounded-lg border border-border bg-card p-5 pb-6 shadow-2'>
        <div className='flex flex-col gap-1'>
          <span
            className='text-caption font-semibold uppercase text-foggy'
            style={{ letterSpacing: '0.08em' }}
          >
            {t('subtitle')}
          </span>
          <h2 className='text-h4 font-semibold text-ink-900'>{t('title')}</h2>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='text-body-sm font-semibold text-ink-900'>
              {t('priceRangeLabel')}
            </Label>
            <span className='font-mono text-caption text-primary'>
              {t('priceRangeValue', {
                min: Math.round(priceMin / 1000),
                max: Math.round(priceMax / 1000),
              })}
            </span>
          </div>
          <Slider
            value={[priceMin, priceMax]}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={1000}
            onValueChange={(value) => {
              if (Array.isArray(value) && value.length === 2) {
                setPriceRange(value[0], value[1]);
              }
            }}
            aria-label={t('priceRangeLabel')}
          />
          <div className='flex justify-between text-caption text-foggy'>
            <span>{t('priceMin')}</span>
            <span>{t('priceMax')}</span>
          </div>
        </div>

        <div className='flex items-center justify-between rounded-md border border-border bg-muted px-4 py-3'>
          <div className='flex flex-col'>
            <Label htmlFor='diagnostic-tests-switch' className='text-body-sm font-semibold text-ink-900'>
              {t('diagnosticTests')}
            </Label>
            <span className='text-caption text-foggy'>{t('diagnosticTestsHint')}</span>
          </div>
          <Switch
            id='diagnostic-tests-switch'
            checked={diagnosticTests}
            onCheckedChange={setDiagnosticTests}
            aria-label={t('diagnosticTestsToggle')}
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-body-sm font-semibold text-ink-900'>{t('curriculum')}</Label>
          <div className='grid grid-cols-2 gap-2'>
            {CURRICULUM_OPTIONS.map((c) => {
              const isSelected = curricula.includes(c);
              return (
                <button
                  key={c}
                  type='button'
                  onClick={() => toggleCurriculum(c)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex items-center justify-between rounded-md border px-3 py-2 text-body-sm font-semibold transition-colors',
                    isSelected
                      ? 'border-primary bg-rausch-50 text-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted',
                  )}
                >
                  {c}
                  {isSelected && (
                    <Check className='h-4 w-4 shrink-0 text-primary' strokeWidth={2.25} aria-hidden='true' />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className='space-y-2'>
          <Label className='text-body-sm font-semibold text-ink-900'>{t('location')}</Label>
          <div className='flex flex-col gap-1.5'>
            {STATE_OPTIONS.slice(0, 4).map((value) => {
              const isSelected = selectedStates.includes(value as AustralianState);
              return (
                <button
                  key={value}
                  type='button'
                  onClick={() => toggleState(value as AustralianState)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-body-sm font-medium transition-colors',
                    isSelected
                      ? 'border-primary bg-rausch-50 text-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted',
                  )}
                >
                  <MapPin
                    className={cn('h-3.5 w-3.5 shrink-0', isSelected ? 'text-primary' : 'text-foggy')}
                    strokeWidth={isSelected ? 2.25 : 1.75}
                    aria-hidden='true'
                  />
                  {tStates(value)}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type='button'
          className='mt-auto inline-flex w-full items-center justify-center rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          {t('apply')}
        </button>
      </div>
    </aside>
  );
}
