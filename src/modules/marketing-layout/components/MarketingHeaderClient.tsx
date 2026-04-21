'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import { cn } from '@/lib/utils';

type AudienceKey = 'parents' | 'agents' | 'schools';

interface MarketingHeaderClientProps {
  labels: {
    findSchools: string;
    signIn: string;
    getStarted: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    audiences: Record<AudienceKey, string>;
  };
}

const AUDIENCES: Array<{ key: AudienceKey; href: string }> = [
  { key: 'parents', href: '/' },
  { key: 'agents', href: '/agents' },
  { key: 'schools', href: '/schools' },
];

function matchAudience(pathname: string): AudienceKey {
  if (pathname === '/agents' || pathname.startsWith('/agents/')) return 'agents';
  if (pathname === '/schools' || pathname.startsWith('/schools/')) return 'schools';
  return 'parents';
}

export function MarketingHeaderClient({ labels }: MarketingHeaderClientProps) {
  const pathname = usePathname();
  const active = matchAudience(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-200',
          scrolled
            ? 'border-b border-divider bg-background/90 shadow-1 backdrop-blur-xl'
            : 'border-b border-transparent bg-background/0',
        )}
      >
        <div className='mx-auto flex h-16 max-w-content items-center gap-4 px-5 md:h-20 md:px-8'>
          <Link
            href='/'
            className='flex shrink-0 items-center'
            aria-label='SchoolGo home'
          >
            <Image
              src='/logos/logo-red.png'
              alt='SchoolGo'
              width={220}
              height={48}
              priority
              className='h-11 w-auto md:h-12'
            />
          </Link>

          <nav
            aria-label='Audience'
            className='mx-auto flex items-center gap-1 rounded-pill bg-muted p-1 shadow-1'
          >
            {AUDIENCES.map((a) => {
              const isActive = a.key === active;
              return (
                <Link
                  key={a.key}
                  href={a.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-pill px-4 py-1.5 text-body-sm font-semibold no-underline transition-colors md:px-5 md:py-2',
                    isActive
                      ? 'bg-card text-ink-900 shadow-2'
                      : 'text-foggy hover:text-ink-900',
                  )}
                >
                  {labels.audiences[a.key]}
                </Link>
              );
            })}
          </nav>

          <div className='hidden shrink-0 items-center gap-2 md:flex'>
            <LanguageSelector placement='down' />
            <Link
              href='/sign-in'
              className='rounded-pill px-4 py-2 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted'
            >
              {labels.signIn}
            </Link>
            <Link
              href='/search'
              className='inline-flex items-center justify-center rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
            >
              {labels.findSchools}
            </Link>
          </div>

          <button
            type='button'
            onClick={() => setMobileOpen(true)}
            aria-label={labels.openMenu}
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-foreground hover:bg-muted md:hidden'
          >
            <Menu className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className='fixed inset-0 z-[60] md:hidden' role='dialog' aria-modal='true'>
          <div
            className='absolute inset-0 bg-ink-900/40 backdrop-blur-sm'
            onClick={() => setMobileOpen(false)}
            aria-hidden='true'
          />
          <div className='absolute bottom-0 left-0 right-0 top-16 flex flex-col gap-1 rounded-t-2xl bg-background p-5 shadow-5'>
            <div className='flex items-center justify-between pb-2'>
              <span
                className='text-label font-semibold uppercase text-foggy'
                style={{ letterSpacing: '0.08em' }}
              >
                {labels.menu}
              </span>
              <button
                type='button'
                onClick={() => setMobileOpen(false)}
                aria-label={labels.closeMenu}
                className='flex h-10 w-10 items-center justify-center rounded-pill hover:bg-muted'
              >
                <X className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </button>
            </div>
            <Link
              href='/search'
              onClick={() => setMobileOpen(false)}
              className='rounded-lg px-3 py-3 text-base font-semibold text-foreground no-underline hover:bg-muted'
            >
              {labels.findSchools}
            </Link>
            <Link
              href='/sign-in'
              onClick={() => setMobileOpen(false)}
              className='rounded-lg px-3 py-3 text-base font-semibold text-foreground no-underline hover:bg-muted'
            >
              {labels.signIn}
            </Link>
            <div className='mt-2 flex flex-col gap-3 border-t border-divider pt-4'>
              <LanguageSelector placement='down' />
              <Link
                href='/search'
                onClick={() => setMobileOpen(false)}
                className='w-full rounded-pill bg-primary px-6 py-3 text-center text-sm font-semibold text-on-primary shadow-brand no-underline'
              >
                {labels.findSchools}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
