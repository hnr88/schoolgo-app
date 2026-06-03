'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useCommandPaletteStore } from '@/modules/command-palette/stores/use-command-palette-store';
import { getNavItems } from '@/modules/command-palette/lib/get-nav-items';
import { CommandPaletteParentSections } from './CommandPaletteParentSections';

export function CommandPalette() {
  const t = useTranslations('CommandPalette');
  const tNav = useTranslations('Dashboard');
  const tParentNav = useTranslations('ParentNav');
  const router = useRouter();

  const open = useCommandPaletteStore((s) => s.open);
  const setOpen = useCommandPaletteStore((s) => s.setOpen);
  const userType = useAuthStore((s) => s.userType);

  const portal = userType ?? 'agent';
  const navItems = getNavItems(portal);
  const navLabel =
    portal === 'parent'
      ? (key: string) => tParentNav(key)
      : (key: string) => tNav(`nav.${key}`);

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t('dialogTitle')}
      description={t('dialogDescription')}
    >
      <Command>
        <CommandInput placeholder={t('inputPlaceholder')} />
        <CommandList>
          <CommandEmpty>{t('empty')}</CommandEmpty>

          <CommandGroup heading={t('sections.goTo')}>
            {navItems.map(({ href, icon: Icon, labelKey }) => (
              <CommandItem
                key={href}
                value={`goto-${navLabel(labelKey)}`}
                onSelect={() => handleSelect(href)}
              >
                <Icon strokeWidth={1.5} />
                <span>{navLabel(labelKey)}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {portal === 'parent' && open && (
            <CommandPaletteParentSections onSelect={handleSelect} />
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
