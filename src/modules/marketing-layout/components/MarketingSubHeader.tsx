'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  ChevronDown,
  GitCompare,
  Languages,
  MessageCircle,
  School,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import type {
  AudienceKey,
  MarketingSubHeaderProps,
} from '@/modules/marketing-layout/types/header.types';

const ICONS = {
  award: Award,
  badge: BadgeCheck,
  book: BookOpen,
  building: Building2,
  compare: GitCompare,
  languages: Languages,
  message: MessageCircle,
  school: School,
  search: Search,
  sparkles: Sparkles,
  users: Users,
} as const;

const AUDIENCES: Array<{ key: AudienceKey; portal: Portal }> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];

export function MarketingSubHeader({
  menus,
  activePortal,
  portalUrls,
  audienceLabels,
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
    <div className='hidden border-b border-divider/70 bg-background/85 backdrop-blur-xl md:block'>
      <div
        ref={navRef}
        className='mx-auto flex h-8 max-w-content items-center px-5 md:px-8'
      >
        <nav
          aria-label='Audience'
          className='flex items-center rounded-lg border border-border/60 p-0.5'
        >
          {AUDIENCES.map((a) => {
            const isActive = a.portal === activePortal;
            return (
              <a
                key={a.key}
                href={portalUrls[a.portal]}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-md px-2.5 py-0.5 text-xs font-medium no-underline transition-all duration-150',
                  isActive
                    ? 'bg-primary text-on-primary shadow-brand'
                    : 'text-foggy hover:text-ink-900',
                )}
              >
                {audienceLabels[a.key]}
              </a>
            );
          })}
        </nav>

        <div className='ml-auto flex items-center gap-6'>
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
                    ? 'text-primary'
                    : 'text-foggy hover:text-ink-900',
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
                <div className='absolute right-0 top-full z-50 pt-2'>
                  <div className='w-[22rem] rounded-xl border border-border bg-background p-2 shadow-4 ring-1 ring-ink-900/[0.03]'>
                    <div className='absolute -top-1 right-6 h-2 w-2 rotate-45 border-l border-t border-border bg-background' />
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
