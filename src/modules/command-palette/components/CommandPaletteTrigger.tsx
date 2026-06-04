'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCommandPaletteStore } from '@/modules/command-palette/stores/use-command-palette-store';

export function CommandPaletteTrigger() {
  const t = useTranslations('CommandPalette');
  const setOpen = useCommandPaletteStore((s) => s.setOpen);

  return (
    <button
      type='button'
      onClick={() => setOpen(true)}
      aria-label={t('triggerLabel')}
      aria-keyshortcuts='Meta+K Control+K'
      className='flex h-11 items-center gap-2.5 rounded-xl bg-muted px-3 text-sm text-foggy transition-colors hover:bg-rausch-50 hover:text-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    >
      <Search className='h-4 w-4 shrink-0' strokeWidth={1.5} />
      <span className='hidden md:inline'>{t('triggerPlaceholder')}</span>
      <kbd
        aria-hidden='true'
        className='ml-2 hidden items-center gap-0.5 rounded-md bg-card px-1.5 py-0.5 text-caption font-semibold text-foggy md:inline-flex'
      >
        {t('kbdHint')}
      </kbd>
    </button>
  );
}
