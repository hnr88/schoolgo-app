'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';

type AudienceKey = 'parents' | 'agents' | 'schools';

interface NavLink {
  label: string;
  href: string;
}

interface MarketingHeaderClientProps {
  activePortal: Portal;
  portalUrls: Record<Portal, string>;
  navLinks: NavLink[];
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

const AUDIENCES: Array<{ key: AudienceKey; portal: Portal }> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];

export function MarketingHeaderClient({
  activePortal,
  portalUrls,
  navLinks,
  labels,
}: MarketingHeaderClientProps) {
  const pathname = usePathname();
  const isSearchPage = pathname.endsWith('/search');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

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
          <a
            href={portalUrls[activePortal]}
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
          </a>

          <nav className='hidden items-center gap-1 md:flex'>
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-pill px-3 py-1.5 text-body-sm font-medium no-underline transition-colors',
                    isActive
                      ? 'text-ink-900'
                      : 'text-foggy hover:bg-muted hover:text-ink-900',
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <nav
            aria-label='Audience'
            className='mx-auto flex items-center rounded-lg border border-border/60 p-0.5'
          >
            {AUDIENCES.map((a) => {
              const isActive = a.portal === activePortal;
              return (
                <a
                  key={a.key}
                  href={portalUrls[a.portal]}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-1 text-sm font-medium no-underline transition-all duration-150',
                    isActive
                      ? 'bg-primary text-on-primary shadow-brand'
                      : 'text-foggy hover:text-ink-900',
                  )}
                >
                  {labels.audiences[a.key]}
                </a>
              );
            })}
          </nav>

          <div className='hidden shrink-0 items-center gap-2 md:flex'>
            <Link
              href='/sign-in'
              data-slot='button'
              className='rounded-pill px-4 py-2 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted'
            >
              {labels.signIn}
            </Link>
            {!isSearchPage && (
              <Link
                href='/search'
                data-slot='button'
                className='inline-flex items-center justify-center rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
              >
                {labels.findSchools}
              </Link>
            )}
            <LanguageSelector placement='down' compact />
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className='rounded-lg px-3 py-3 text-base font-semibold text-foreground no-underline hover:bg-muted'
              >
                {link.label}
              </a>
            ))}
            {!isSearchPage && (
              <Link
                href='/search'
                onClick={() => setMobileOpen(false)}
                className='rounded-lg px-3 py-3 text-base font-semibold text-foreground no-underline hover:bg-muted'
              >
                {labels.findSchools}
              </Link>
            )}
            <Link
              href='/sign-in'
              onClick={() => setMobileOpen(false)}
              className='rounded-lg px-3 py-3 text-base font-semibold text-foreground no-underline hover:bg-muted'
            >
              {labels.signIn}
            </Link>
            <div className='mt-2 flex flex-col gap-3 border-t border-divider pt-4'>
              <LanguageSelector placement='down' />
              {!isSearchPage && (
                <Link
                  href='/search'
                  onClick={() => setMobileOpen(false)}
                  data-slot='button'
                  className='w-full rounded-pill bg-primary px-6 py-3 text-center text-sm font-semibold text-on-primary shadow-brand no-underline'
                >
                  {labels.findSchools}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
