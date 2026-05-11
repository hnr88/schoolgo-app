'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import { MarketingSubHeader } from '@/modules/marketing-layout/components/MarketingSubHeader';
import { cn } from '@/lib/utils';
import type { MarketingHeaderClientProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingHeaderClient({
  subMenus,
  activePortal,
  portalUrls,
  navLinks,
  variant,
  fullWidth = false,
  labels,
}: MarketingHeaderClientProps) {
  const pathname = usePathname();
  const isSearchPage = pathname.endsWith('/search');
  const isDark = variant === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const scrollContainer = sheet.querySelector('[data-scroll]') as HTMLElement | null;
    if (scrollContainer && scrollContainer.scrollTop > 0) return;
    dragStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    sheet.style.transition = 'none';
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy < 0) {
      dragOffset.current = 0;
      sheetRef.current.style.transform = 'translateY(0)';
      return;
    }
    dragOffset.current = dy;
    sheetRef.current.style.transform = `translateY(${dy}px)`;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;
    const sheet = sheetRef.current;
    sheet.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
    if (dragOffset.current > 120) {
      sheet.style.transform = 'translateY(100%)';
      sheet.addEventListener('transitionend', () => {
        setMobileOpen(false);
      }, { once: true });
    } else {
      sheet.style.transform = 'translateY(0)';
    }
    dragOffset.current = 0;
  }, []);

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
    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
      sheetRef.current.style.transition = '';
    }
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
            ? 'border-b border-divider bg-background shadow-1 md:bg-background/90 md:backdrop-blur-xl'
            : 'border-b border-transparent bg-background md:bg-background/0',
        )}
      >
        <MarketingSubHeader menus={subMenus} inverted={isDark && !scrolled} fullWidth={fullWidth} />
        <div
          className={cn(
            'flex h-11 items-center gap-4 px-5 md:h-12 md:px-8',
            fullWidth ? 'w-full' : 'mx-auto max-w-content',
          )}
        >
          <a
            href={portalUrls[activePortal]}
            className='flex shrink-0 items-center'
            aria-label='SchoolGo home'
          >
            <Image
              src={isDark && !scrolled ? '/logos/logo-white.png' : '/logos/logo-red.png'}
              alt='SchoolGo'
              width={220}
              height={48}
              priority
              className='h-7 w-auto md:h-8'
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
                    'rounded-pill px-3 py-1 text-sm font-medium no-underline transition-colors',
                    isDark && !scrolled
                      ? isActive
                        ? 'text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                      : isActive
                        ? 'text-ink-900'
                        : 'text-foggy hover:bg-muted hover:text-ink-900',
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className='ml-auto hidden shrink-0 items-center gap-2 md:flex'>
            <Link
              href='/sign-in'
              data-slot='button'
              className={cn(
                'rounded-pill px-3 py-1.5 text-sm font-medium no-underline transition-colors',
                isDark && !scrolled
                  ? 'text-white/88 hover:bg-white/10 hover:text-white'
                  : 'text-foreground hover:bg-muted',
              )}
            >
              {labels.signIn}
            </Link>
            {!isSearchPage && (
              <Link
                href='/search'
                data-slot='button'
                className='inline-flex items-center justify-center rounded-pill bg-primary px-4 py-1.5 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
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
            className={cn(
              'ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-pill md:hidden',
              isDark && !scrolled
                ? 'text-white hover:bg-white/10'
                : 'text-foreground hover:bg-muted',
            )}
          >
            <Menu className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
          </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-[60] md:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        role='dialog'
        aria-modal={mobileOpen}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            'absolute inset-0 bg-ink-900/40 transition-opacity duration-300',
            mobileOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0',
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden='true'
        />
        <div
          ref={sheetRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={cn(
            'absolute inset-x-0 bottom-0 top-16 flex flex-col rounded-t-3xl bg-background shadow-5 transition-transform duration-300',
            mobileOpen ? 'translate-y-0' : 'translate-y-full',
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className='flex justify-center pt-2' aria-hidden='true'>
            <span className='h-1 w-8 rounded-full bg-ink-900/15' />
          </div>
          <div className='flex items-center justify-between px-5 pb-2 pt-2'>
            <a
              href={portalUrls[activePortal]}
              className='flex shrink-0 items-center'
              aria-label='SchoolGo home'
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src='/logos/logo-red.png'
                alt='SchoolGo'
                width={160}
                height={36}
                className='h-9 w-auto'
              />
            </a>
            <button
              type='button'
              onClick={() => setMobileOpen(false)}
              aria-label={labels.closeMenu}
              className='flex h-10 w-10 items-center justify-center rounded-pill hover:bg-muted'
            >
              <X className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
            </button>
          </div>

          <div data-scroll className='flex flex-1 flex-col overflow-y-auto px-4 py-2'>
            <div className='flex flex-col'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className='rounded-lg px-3 py-2 text-sm font-semibold text-foreground no-underline hover:bg-muted'
                >
                  {link.label}
                </a>
              ))}
            </div>

            {subMenus.map((menu) => (
              <div key={menu.label} className='mt-2 flex flex-col border-t border-divider pt-2'>
                <span className='px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-foggy'>
                  {menu.label}
                </span>
                {menu.items.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className='rounded-lg px-3 py-1.5 text-sm font-medium text-foreground no-underline hover:bg-muted'
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className='flex items-center gap-2 border-t border-divider px-4 py-3'>
            <Link
              href='/sign-in'
              onClick={() => setMobileOpen(false)}
              data-slot='button'
              className='flex-1 rounded-pill border border-border px-3 py-2 text-center text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted'
            >
              {labels.signIn}
            </Link>
            {!isSearchPage && (
              <Link
                href='/search'
                onClick={() => setMobileOpen(false)}
                data-slot='button'
                className='flex-1 rounded-pill bg-primary px-3 py-2 text-center text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
              >
                {labels.findSchools}
              </Link>
            )}
            <LanguageSelector placement='up' compact />
          </div>
        </div>
      </div>
    </>
  );
}
