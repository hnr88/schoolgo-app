'use client';

import Image from 'next/image';
import { Loader2, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getInitials } from '@/modules/unified-search/lib/autocomplete';
import type {
  AutocompleteGroup,
  AutocompleteItem,
} from '@/modules/unified-search/types/autocomplete.types';

interface UnifiedSearchAutocompleteProps {
  open: boolean;
  groups: AutocompleteGroup[];
  activeIndex: number;
  isLoading: boolean;
  isEmpty: boolean;
  listboxId: string;
  onSelectItem: (item: AutocompleteItem) => void;
  onHoverItem: (index: number) => void;
}

function ItemIcon({ item }: { item: AutocompleteItem }) {
  if (item.kind === 'suburb' || item.kind === 'state') {
    return (
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-muted text-muted-foreground"
      >
        <MapPin className="size-3.5" strokeWidth={1.75} />
      </span>
    );
  }
  if (item.iconUrl) {
    return (
      <Image
        src={item.iconUrl}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0 rounded-sm object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-muted text-xs font-medium text-muted-foreground"
    >
      {getInitials(item.label)}
    </span>
  );
}

export function UnifiedSearchAutocomplete({
  open,
  groups,
  activeIndex,
  isLoading,
  isEmpty,
  listboxId,
  onSelectItem,
  onHoverItem,
}: UnifiedSearchAutocompleteProps) {
  const t = useTranslations('UnifiedSearch');

  if (!open) return null;

  return (
    <div
      id={listboxId}
      role="listbox"
      className="absolute left-0 right-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-card p-2 shadow-3"
    >
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-10 items-center gap-2 px-3 py-2 text-sm text-muted-foreground"
        >
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          {t('autocomplete.loading')}
        </div>
      )}

      {isEmpty && (
        <div role="status" className="px-3 py-2 text-sm text-muted-foreground">
          {t('autocomplete.empty')}
        </div>
      )}

      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-1 first:mt-0 [&:not(:first-child)]:mt-2">
          <div className="px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t(group.headingKey)}
          </div>
          {group.items.map((item) => (
            <button
              key={item.key}
              id={`${listboxId}-opt-${item.index}`}
              type="button"
              role="option"
              aria-selected={item.index === activeIndex}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelectItem(item);
              }}
              onMouseEnter={() => onHoverItem(item.index)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors',
                item.index === activeIndex ? 'bg-muted' : 'hover:bg-muted',
              )}
            >
              <ItemIcon item={item} />
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-foreground">{item.label}</span>
                {item.sublabel && (
                  <span className="truncate text-xs text-muted-foreground">{item.sublabel}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
