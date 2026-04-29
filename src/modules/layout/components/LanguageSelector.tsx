'use client';

import { useState, useRef, useEffect } from 'react';
import { LanguageIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';
import type { LanguageSelectorProps } from '@/modules/layout/types/layout.types';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  vi: 'Tiếng Việt',
  th: 'ภาษาไทย',
};

const LOCALE_CODES: Record<string, string> = {
  en: 'EN',
  zh: 'ZH',
  ko: 'KO',
  ms: 'MS',
  vi: 'VI',
  th: 'TH',
};

export function LanguageSelector({ placement = 'up', compact = false }: LanguageSelectorProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(loc: string) {
    setOpen(false);
    if (loc !== locale) {
      const baseDomain = env.NEXT_PUBLIC_BASE_DOMAIN ?? '';
      const cookieDomain = baseDomain.split(':')[0];
      const domainAttr = cookieDomain && cookieDomain !== 'localhost'
        ? `; domain=.${cookieDomain}`
        : '';
      Reflect.set(
        document,
        'cookie',
        `NEXT_LOCALE=${loc}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax${domainAttr}`,
      );
      router.replace(pathname, { locale: loc });
    }
  }

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup='listbox'
        className={cn(
          'flex items-center cursor-pointer transition-colors',
          compact
            ? 'gap-1.5 rounded-pill px-2.5 py-1.5 text-sm font-medium text-foggy hover:text-ink-900 hover:bg-muted'
            : 'gap-2 rounded-lg border border-outline-variant/30 px-3 py-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:border-primary/50',
        )}
      >
        <LanguageIcon className='w-4 h-4' aria-hidden='true' />
        {compact ? (LOCALE_CODES[locale] ?? locale.toUpperCase()) : (LOCALE_LABELS[locale] ?? locale)}
        {!compact && (
          <ChevronDownIcon
            className={cn('w-3 h-3 transition-transform', open && 'rotate-180')}
            aria-hidden='true'
          />
        )}
      </button>

      {open && (
        <ul
          role='listbox'
          aria-label='Select language'
          className={cn(
            'absolute left-0 min-w-48 bg-surface-container-lowest rounded-xl shadow-xl shadow-on-surface/10 border border-outline-variant/20 z-50 overflow-hidden',
            placement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          {routing.locales.map((loc) => (
            <li key={loc} role='option' aria-selected={loc === locale}>
              <button
                type='button'
                onClick={() => handleSelect(loc)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors',
                  loc === locale
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-on-surface hover:bg-surface-container-high',
                )}
              >
                {LOCALE_LABELS[loc] ?? loc}
                {loc === locale && (
                  <CheckIcon className='w-4 h-4 text-primary' aria-hidden='true' />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
