'use client';

import { History } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import type { Portal } from '@/lib/portal-url';
import { useRecentPagesStore } from '@/modules/command-palette/stores/use-recent-pages-store';

interface CommandPaletteRecentProps {
  portal: Portal;
  onSelect: (href: string, label: string) => void;
}

export function CommandPaletteRecent({ portal, onSelect }: CommandPaletteRecentProps) {
  const t = useTranslations('CommandPalette');
  const pages = useRecentPagesStore((s) => s.pages);
  const recent = pages.filter((page) => page.portal === portal);

  if (recent.length === 0) return null;

  return (
    <CommandGroup heading={t('sections.recent')}>
      {recent.map((page) => (
        <CommandItem
          key={page.href}
          value={`recent-${page.label}`}
          onSelect={() => onSelect(page.href, page.label)}
        >
          <History strokeWidth={1.5} />
          <span>{page.label}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
