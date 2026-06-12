'use client';

import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AGENT_COUNTRY_OPTIONS,
  AGENT_LANGUAGE_OPTIONS,
  AGENT_SERVICE_OPTIONS,
} from '@/modules/agent-search/constants/agent-search.constants';
import { AgentFilterGroup } from '@/modules/agent-search/components/AgentFilterGroup';
import { AgentLockedOverlay } from '@/modules/agent-search/components/AgentLockedOverlay';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import type { AgentFilterSidebarProps } from '@/modules/agent-search/types/component.types';

export function AgentFilterSidebar({ capability, className, cardClassName }: AgentFilterSidebarProps) {
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
  const reset = useAgentSearchStore((s) => s.reset);

  const isAdvanced = capability.isAdvanced;
  const verifiedLocked = capability.forceVerifiedOnly;
  const verifiedChecked = verifiedLocked ? true : verifiedOnly;

  const optionLabel = (key: string) => t(key as never);
  const hasActiveFilters =
    isAdvanced &&
    (countriesServed.length > 0 ||
      languages.length > 0 ||
      services.length > 0 ||
      !verifiedOnly ||
      sortBy !== 'relevance');

  return (
    <aside
      className={cn(
        'hidden shrink-0 lg:block lg:h-full lg:w-[22rem] lg:py-2 lg:pl-3',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2',
          cardClassName,
        )}
      >
        <div className="flex shrink-0 items-center gap-2.5 border-b border-divider bg-rausch-50 px-4 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
            <SlidersHorizontal className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span className="text-caption font-semibold uppercase tracking-eyebrow text-rausch-700">
              {t('subtitle')}
            </span>
            <h2 className="text-body-sm font-semibold text-ink-900">{t('title')}</h2>
          </div>
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className="divide-y divide-divider px-4">
            <div className="py-4">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
                <div className="flex flex-col">
                  <Label
                    htmlFor="agent-verified-switch"
                    className="text-sm font-medium text-foreground"
                  >
                    {t('verifiedOnly')}
                  </Label>
                  <span className="text-caption text-foggy">{t('verifiedOnlyHint')}</span>
                </div>
                <Switch
                  id="agent-verified-switch"
                  checked={verifiedChecked}
                  onCheckedChange={setVerifiedOnly}
                  disabled={verifiedLocked}
                  aria-label={t('verifiedOnlyToggle')}
                />
              </div>
            </div>

            <div className="py-4">
              <AgentLockedOverlay locked={!isAdvanced}>
                <div className="flex flex-col gap-4">
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
                </div>
              </AgentLockedOverlay>
            </div>
          </div>
        </ScrollArea>

        {hasActiveFilters && (
          <div className="shrink-0 border-t border-divider bg-card px-4 py-3">
            <button
              type="button"
              onClick={reset}
              className="flex w-full items-center justify-center gap-1.5 rounded-pill bg-muted py-2 text-body-sm font-semibold text-ink-900 transition-colors hover:bg-divider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {t('resetFilters')}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
