'use client';
import { Check, MapPin, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
  const englishTests = useSchoolSearchStore((s) => s.englishTests);
  const setEnglishTests = useSchoolSearchStore((s) => s.setEnglishTests);

  return (
    <aside className='hidden shrink-0 lg:sticky lg:top-20 lg:block lg:h-[calc(100vh-5rem)] lg:w-[20rem] lg:p-4'>
      <div className='flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2'>
        <div className='shrink-0 border-b border-divider px-4 py-3.5'>
          <div className='flex items-center gap-3'>
            <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-primary'>
              <SlidersHorizontal className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
            </span>
            <div className='min-w-0'>
              <span className='text-caption font-semibold uppercase text-foggy'>
                {t('subtitle')}
              </span>
              <h2 className='text-base font-semibold text-ink-900'>{t('title')}</h2>
            </div>
          </div>
        </div>

        <div className='no-scrollbar min-h-0 flex-1 overflow-y-auto'>
          <div className='space-y-3 border-b border-divider px-4 py-3.5'>
            <div className='flex items-center justify-between'>
              <Label className='text-body-sm font-semibold text-ink-900'>
                {t('priceRangeLabel')}
              </Label>
              <span className='rounded-pill bg-rausch-50 px-2.5 py-1 font-mono text-caption font-semibold text-primary'>
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

          <div className='mx-4 my-3.5 flex items-center justify-between rounded-lg border border-border bg-muted/70 px-3.5 py-2.5'>
            <div className='flex flex-col'>
              <Label htmlFor='english-tests-switch' className='text-body-sm font-semibold text-ink-900'>
                {t('englishTests')}
              </Label>
              <span className='text-caption text-foggy'>{t('englishTestsHint')}</span>
            </div>
            <Switch
              id='english-tests-switch'
              checked={englishTests}
              onCheckedChange={setEnglishTests}
              aria-label={t('englishTestsToggle')}
            />
          </div>

          <div className='space-y-2.5 border-t border-divider px-4 py-3.5'>
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
                      'flex min-h-9 items-center justify-between rounded-lg border px-2.5 py-1.5 text-label font-semibold transition-colors',
                      isSelected
                        ? 'border-primary bg-rausch-50 text-primary shadow-1'
                        : 'border-border bg-background text-foreground hover:border-quill hover:bg-muted',
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

          <div className='space-y-2.5 border-t border-divider px-4 py-3.5'>
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
                      'flex min-h-9 w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-label font-medium transition-colors',
                      isSelected
                        ? 'border-primary bg-rausch-50 text-primary shadow-1'
                        : 'border-border bg-background text-foreground hover:border-quill hover:bg-muted',
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
        </div>

        <div className='shrink-0 border-t border-divider bg-card px-4 py-3.5'>
          <Button
            type='button'
            className='h-auto w-full rounded-lg py-2.5 text-sm font-semibold shadow-brand'
          >
            {t('apply')}
          </Button>
        </div>
      </div>
    </aside>
  );
}
