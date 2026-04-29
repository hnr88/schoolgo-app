import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { MarketingNav } from '@/modules/navigation/components/MarketingNav';
import type { NavbarProps } from '@/modules/navigation/types/navigation.types';

export async function Navbar({ variant = 'dashboard' }: NavbarProps = {}) {
  if (variant === 'marketing') {
    const t = await getTranslations('LandingNavbar');
    return (
      <MarketingNav
        labels={{
          findSchools: t('findSchools'),
          howItWorks: t('howItWorks'),
          forAgents: t('forAgents'),
          forSchools: t('forSchools'),
          logIn: t('logIn'),
          getStarted: t('getStarted'),
          openMenu: t('openMenu'),
          closeMenu: t('closeMenu'),
        }}
      />
    );
  }

  const t = await getTranslations('Navbar');

  const navLinks = [
    { label: t('findSchools'), href: '/', active: true },
    { label: t('compare'), href: '/compare', active: false },
    { label: t('scholarships'), href: '/scholarships', active: false },
    { label: t('admissions'), href: '/admissions', active: false },
  ];

  return (
    <nav className='fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 h-14'>
      <div className='flex justify-between items-center px-8 h-full max-w-content mx-auto'>
        <div className='flex items-center gap-8 h-full'>
          <Link href='/' className='flex items-center'>
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
                className={
                  link.active
                    ? 'text-sm text-primary font-bold tracking-tight h-full flex items-center border-b-3 border-primary -mb-px px-2'
                    : 'text-sm text-on-surface-variant hover:text-primary tracking-tight h-full flex items-center border-b-3 border-transparent transition-colors font-medium -mb-px px-2'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            className='rounded-lg font-semibold text-on-surface-variant hover:text-on-surface py-5'
          >
            {t('contactUs')}
          </Button>
          <Button className='rounded-lg bg-primary text-on-primary font-bold px-6 py-5 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-colors'>
            {t('signIn')}
          </Button>
        </div>
      </div>
    </nav>
  );
}
