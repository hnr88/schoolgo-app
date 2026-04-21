'use client';

import { useState, useRef, useEffect } from 'react';
import { LanguageIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  zh: '中文',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  vi: 'Tiếng Việt',
  th: 'ภาษาไทย',
};

interface LanguageSelectorProps {
  placement?: 'up' | 'down';
}

export function LanguageSelector({ placement = 'up' }: LanguageSelectorProps = {}) {
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
        className='flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-widest cursor-pointer border border-outline-variant/30 rounded-lg px-3 py-2 hover:border-primary/50 transition-colors'
      >
        <LanguageIcon className='w-4 h-4' aria-hidden='true' />
        {LOCALE_LABELS[locale] ?? locale}
        <ChevronDownIcon
          className={cn('w-3 h-3 transition-transform', open && 'rotate-180')}
          aria-hidden='true'
        />
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
