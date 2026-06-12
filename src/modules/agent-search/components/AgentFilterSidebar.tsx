'use client';

import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AGENT_COUNTRY_OPTIONS,
  AGENT_LANGUAGE_OPTIONS,
  AGENT_SERVICE_OPTIONS,
  AGENT_SORT_OPTIONS,
} from '@/modules/agent-search/constants/agent-search.constants';
import { AgentFilterGroup } from '@/modules/agent-search/components/AgentFilterGroup';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import type { AgentSortBy } from '@/modules/agent-search/types/agent-search.types';
import type { AgentFilterSidebarProps } from '@/modules/agent-search/types/component.types';

export function AgentFilterSidebar({ className, cardClassName }: AgentFilterSidebarProps) {
  const t = useTranslations('AgentSearch.filters');

  const countriesServed = useAgentSearchStore((s) => s.countriesServed);
  const toggleCountry = useAgentSearchStore((s) => s.toggleCountry);
  const languages = useAgentSearchStore((s) => s.languages);
  const toggleLanguage = useAgentSearchStore((s) => s.toggleLanguage);
  const services = useAgentSearchStore((s) => s.services);
  const toggleService = useAgentSearchStore((s) => s.toggleService);
  const verifiedOnly = useAgentSearchStore((s) => s.verifiedOnly);
  const setVerifiedOnly = useAgentSearchStore((s) => s.setVerifiedOnly);
  const sortBy = useAgentSearchStore((s) => s.sortBy);
  const setSortBy = useAgentSearchStore((s) => s.setSortBy);
  const reset = useAgentSearchStore((s) => s.reset);

  const optionLabel = (key: string) => t(key as never);
  const hasActiveFilters =
    countriesServed.length > 0 ||
    languages.length > 0 ||
    services.length > 0 ||
    !verifiedOnly ||
    sortBy !== 'relevance';

  return (
    <aside className={cn('hidden shrink-0 lg:sticky lg:top-[var(--header-height)] lg:block lg:h-[calc(100vh-var(--header-height))] lg:w-[20rem] lg:py-6 lg:pl-6', className)}>
      <div className={cn('flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2', cardClassName)}>
        <div className='shrink-0 border-b border-divider px-4 py-2.5'>
          <div className='flex items-center gap-2.5'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-primary'>
              <SlidersHorizontal className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
            </span>
            <div className='min-w-0'>
              <span className='text-caption font-semibold uppercase text-foggy'>{t('subtitle')}</span>
              <h2 className='text-sm font-semibold text-ink-900'>{t('title')}</h2>
            </div>
          </div>
        </div>

        <ScrollArea className='min-h-0 flex-1'>
          <div className='space-y-2 px-4 py-3'>
            <Label className='text-body-sm font-semibold text-ink-900'>{t('sortLabel')}</Label>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as AgentSortBy)}>
              <SelectTrigger size='sm' aria-label={t('sortLabel')} className='w-full text-xs'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AGENT_SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className='text-xs'>
                    {optionLabel(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='mx-4 my-1 flex items-center justify-between rounded-lg border border-border bg-muted/70 px-3 py-1.5'>
            <div className='flex flex-col'>
              <Label htmlFor='agent-verified-switch' className='text-body-sm font-semibold text-ink-900'>
                {t('verifiedOnly')}
              </Label>
              <span className='text-caption text-foggy'>{t('verifiedOnlyHint')}</span>
            </div>
            <Switch
              id='agent-verified-switch'
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
              aria-label={t('verifiedOnlyToggle')}
            />
          </div>

          <AgentFilterGroup
            label={t('countries')}
            options={AGENT_COUNTRY_OPTIONS}
            selected={countriesServed}
            onToggle={toggleCountry}
            optionLabel={optionLabel}
          />
          <AgentFilterGroup
            label={t('languages')}
            options={AGENT_LANGUAGE_OPTIONS}
            selected={languages}
            onToggle={toggleLanguage}
            optionLabel={optionLabel}
          />
          <AgentFilterGroup
            label={t('services')}
            options={AGENT_SERVICE_OPTIONS}
            selected={services}
            onToggle={toggleService}
            optionLabel={optionLabel}
          />
        </ScrollArea>

        {hasActiveFilters && (
          <div className='shrink-0 border-t border-divider bg-card px-4 py-2.5'>
            <button
              type='button'
              onClick={reset}
              className='flex h-auto w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
            >
              <RotateCcw className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
              {t('resetFilters')}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
