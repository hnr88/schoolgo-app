'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import { cn } from '@/lib/utils';
import type { MarketingNavProps } from '@/modules/navigation/types/navigation.types';

export function MarketingNav({ labels }: MarketingNavProps) {
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks: Array<{ label: string; href: string }> = [
    { label: labels.findSchools, href: '/' },
    { label: labels.howItWorks, href: '#how-it-works' },
    { label: labels.forAgents, href: '#for-agents' },
    { label: labels.forSchools, href: '#for-schools' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 h-14 transition-colors duration-200',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className='flex justify-between items-center px-4 md:px-8 h-full max-w-content mx-auto'>
          <div className='flex items-center gap-8 h-full'>
            <Link href='/landing' className='flex items-center'>
              <Image
                src='/logos/logo-red.png'
                alt='SchoolGo'
                width={220}
                height={48}
                priority
                className='h-11 w-auto md:h-12'
              />
            </Link>

            <div className='hidden md:flex items-center gap-6 h-full'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-sm text-on-surface-variant hover:text-primary tracking-tight h-full flex items-center border-b-3 border-transparent hover:border-primary transition-colors font-medium -mb-px px-2'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='hidden md:flex items-center gap-3'>
            <LanguageSelector placement='down' />
            <Link
              href='/login'
              className='text-sm text-on-surface-variant hover:text-on-surface font-semibold px-3 py-2 transition-colors'
            >
              {labels.logIn}
            </Link>
            <Link href='#role-cards'>
              <Button className='rounded-lg bg-primary text-on-primary font-bold px-5 py-5 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-colors'>
                {labels.getStarted}
              </Button>
            </Link>
          </div>

          <button
            type='button'
            onClick={() => setMobileOpen(true)}
            aria-label={labels.openMenu}
            className='md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container text-on-surface transition-colors'
          >
            <Bars3Icon className='w-6 h-6' aria-hidden='true' />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className='fixed inset-0 z-[60] md:hidden' role='dialog' aria-modal='true'>
          <div
            className='absolute inset-0 bg-on-surface/40 backdrop-blur-sm'
            onClick={() => setMobileOpen(false)}
            aria-hidden='true'
          />
          <div className='absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-background shadow-2xl flex flex-col'>
            <div className='flex items-center justify-between px-4 h-14 border-b border-outline-variant/30'>
              <span className='font-display font-bold text-on-surface'>SchoolGo</span>
              <button
                type='button'
                onClick={() => setMobileOpen(false)}
                aria-label={labels.closeMenu}
                className='flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container text-on-surface transition-colors'
              >
                <XMarkIcon className='w-6 h-6' aria-hidden='true' />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className='text-base text-on-surface font-semibold py-3 px-3 rounded-lg hover:bg-surface-container transition-colors'
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href='/login'
                onClick={() => setMobileOpen(false)}
                className='text-base text-on-surface-variant font-semibold py-3 px-3 rounded-lg hover:bg-surface-container transition-colors mt-2'
              >
                {labels.logIn}
              </Link>
            </div>

            <div className='px-4 py-4 border-t border-outline-variant/30 flex flex-col gap-3'>
              <LanguageSelector placement='down' />
              <Link href='#role-cards' onClick={() => setMobileOpen(false)}>
                <Button className='w-full rounded-lg bg-primary text-on-primary font-bold py-5 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-colors'>
                  {labels.getStarted}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
