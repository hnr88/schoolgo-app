'use client';

import { useTranslations } from 'next-intl';

export function CommandPaletteFooter() {
  const t = useTranslations('CommandPalette');

  return (
    <div className='flex items-center gap-4 border-t border-border px-3 py-2 text-caption text-foggy'>
      <span className='flex items-center gap-1.5'>
        <kbd className='inline-flex min-w-6 items-center justify-center rounded-md border border-border bg-card px-1.5 py-0.5 font-semibold'>
          {t('footer.openKey')}
        </kbd>
        <span>{t('footer.openHint')}</span>
      </span>
      <span className='flex items-center gap-1.5'>
        <kbd className='inline-flex min-w-6 items-center justify-center rounded-md border border-border bg-card px-1.5 py-0.5 font-semibold'>
          {t('footer.closeKey')}
        </kbd>
        <span>{t('footer.closeHint')}</span>
      </span>
    </div>
  );
}
