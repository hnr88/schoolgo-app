'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MarketingSubHeaderProps } from '@/modules/marketing-layout/types/header.types';
import { ICONS } from '../constants/sub-header.constants';

export function MarketingSubHeader({
  menus,
  inverted,
  fullWidth = false,
}: MarketingSubHeaderProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleEnter(index: number) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(index);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 150);
  }

  return (
    <div className={cn(
      'hidden md:block',
      inverted
        ? 'border-b border-white/10 bg-transparent'
        : 'border-b border-divider/70 bg-background/85',
    )}>
      <div
        ref={navRef}
        className={cn(
          'flex h-7 items-center justify-end px-5 md:px-8',
          fullWidth ? 'w-full' : 'mx-auto max-w-content',
        )}
      >
        <div className='flex items-center gap-6'>
          {menus.map((menu, i) => (
            <div
              key={menu.label}
              className='relative'
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <button
                type='button'
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={cn(
                  'flex items-center gap-1 text-xs font-semibold transition-colors',
                  openIndex === i
                    ? inverted ? 'text-white' : 'text-primary'
                    : inverted ? 'text-white/60 hover:text-white' : 'text-foggy hover:text-ink-900',
                )}
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    'h-3 w-3 transition-transform duration-150',
                    openIndex === i && 'rotate-180',
                  )}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              </button>

              {openIndex === i && (
                <div className='absolute right-0 top-full z-[60] pt-2'>
                  <div className='w-[22rem] rounded-xl border border-border bg-background p-2 shadow-4 ring-1 ring-ink-900/[0.03]'>
                    <div className='grid gap-1'>
                      {menu.items.map((item) => {
                        const Icon =
                          ICONS[item.icon as keyof typeof ICONS] ?? Sparkles;
                        return (
                          <a
                            key={item.key}
                            href={item.href}
                            className='group/item grid grid-cols-[2rem_1fr] gap-3 rounded-lg px-2.5 py-2.5 no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                          >
                            <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-rausch-50 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-on-primary'>
                              <Icon className='h-4 w-4' strokeWidth={1.8} aria-hidden='true' />
                            </span>
                            <span className='flex min-w-0 flex-col gap-0.5'>
                              <span className='text-sm font-semibold text-ink-900'>
                                {item.label}
                              </span>
                              {item.description && (
                                <span className='line-clamp-2 text-xs leading-5 text-foggy'>
                                  {item.description}
                                </span>
                              )}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
