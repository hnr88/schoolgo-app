'use client';

import { useId } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { UnifiedSearchAutocomplete } from '@/modules/unified-search/components/UnifiedSearchAutocomplete';
import { useUnifiedAutocomplete } from '@/modules/unified-search/hooks/useUnifiedAutocomplete';

interface UnifiedSearchBarProps {
  className?: string;
}

export function UnifiedSearchBar({ className }: UnifiedSearchBarProps) {
  const t = useTranslations('UnifiedSearch.bar');
  const listboxId = useId();
  const ac = useUnifiedAutocomplete();
  const placeholder = t('search');
  const activeId = ac.activeIndex >= 0 ? `${listboxId}-opt-${ac.activeIndex}` : undefined;

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'group flex items-center gap-2 rounded-pill border border-border bg-card py-1 pr-1 pl-4 shadow-2',
          'transition-shadow ease-out-quart focus-within:shadow-3 motion-reduce:transition-none',
        )}
      >
        <Search
          className="size-5 shrink-0 text-foggy transition-colors group-focus-within:text-primary"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <Input
          type="search"
          value={ac.value}
          onChange={ac.onChange}
          onKeyDown={ac.onKeyDown}
          onFocus={ac.onFocus}
          onBlur={ac.onBlur}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={ac.open}
          aria-controls={listboxId}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          autoComplete="off"
          className="h-auto w-full border-0 bg-transparent px-0 py-0 text-body shadow-none placeholder:text-foggy focus-visible:ring-0"
        />
        <button
          type="button"
          aria-label={t('search')}
          className={cn(
            'grid size-9 shrink-0 place-items-center rounded-pill bg-primary text-on-primary',
            'transition ease-out-quart hover:bg-primary-strong active:scale-95 motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )}
        >
          <Search className="size-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <UnifiedSearchAutocomplete
        open={ac.open}
        groups={ac.groups}
        activeIndex={ac.activeIndex}
        isLoading={ac.isLoading}
        isEmpty={ac.isEmpty}
        listboxId={listboxId}
        onSelectItem={ac.selectItem}
        onHoverItem={ac.setActiveIndex}
      />
    </div>
  );
}
