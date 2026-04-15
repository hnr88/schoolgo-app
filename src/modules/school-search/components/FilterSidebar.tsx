'use client';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
    <aside className='w-64 lg:w-sidebar p-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar shrink-0'>
      <div className='bg-surface-container-low rounded-3xl p-6 shadow-sm flex flex-col space-y-8 h-full'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl font-bold text-on-surface tracking-tight'>
            {t('title')}
          </h2>
          <p className='text-caption text-on-surface-variant font-medium uppercase tracking-widest'>
            {t('subtitle')}
          </p>
        </div>

        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <Label className='text-sm font-bold text-on-surface'>
              {t('priceRangeLabel')}
            </Label>
            <span className='text-xs font-mono text-primary'>
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
          <div className='flex justify-between text-caption-xs text-on-surface-variant font-bold uppercase'>
            <span>{t('priceMin')}</span>
            <span>{t('priceMax')}</span>
          </div>
        </div>

        <div className='flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl'>
          <div className='flex flex-col'>
            <Label
              htmlFor='diagnostic-tests-switch'
              className='text-sm font-bold text-on-surface'
            >
              {t('diagnosticTests')}
            </Label>
            <span className='text-caption-xs text-on-surface-variant'>
              {t('diagnosticTestsHint')}
            </span>
          </div>
          <Switch
            id='diagnostic-tests-switch'
            checked={diagnosticTests}
            onCheckedChange={setDiagnosticTests}
            aria-label={t('diagnosticTestsToggle')}
          />
        </div>

        <div className='space-y-3'>
          <Label className='text-sm font-bold text-on-surface'>
            {t('curriculum')}
          </Label>
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
                    'rounded-xl px-4 py-3 text-xs font-bold text-left flex items-center justify-between transition-colors',
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container',
                  )}
                >
                  {c}
                  {isSelected && (
                    <CheckCircle2 className='w-3.5 h-3.5 shrink-0' aria-hidden='true' />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className='space-y-3'>
          <Label className='text-sm font-bold text-on-surface'>{t('location')}</Label>
          <div className='space-y-2'>
            {STATE_OPTIONS.slice(0, 4).map((value) => {
              const isSelected = selectedStates.includes(value as AustralianState);
              return (
                <button
                  key={value}
                  type='button'
                  onClick={() => toggleState(value as AustralianState)}
                  aria-pressed={isSelected}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left',
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container',
                  )}
                >
                  <MapPin
                    className='w-4 h-4 text-on-surface-variant shrink-0'
                    aria-hidden='true'
                  />
                  <span className='text-xs font-bold'>{tStates(value)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          type='button'
          className='w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-primary/10 hover:brightness-110 active:scale-95 transition-colors mt-auto'
        >
          {t('apply')}
        </Button>
      </div>
    </aside>
  );
}
