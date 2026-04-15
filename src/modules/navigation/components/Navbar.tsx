import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export async function Navbar() {
  const t = await getTranslations('Navbar');

  const navLinks = [
    { label: t('findSchools'), href: '/', active: true },
    { label: t('compare'), href: '/compare', active: false },
    { label: t('scholarships'), href: '/scholarships', active: false },
    { label: t('admissions'), href: '/admissions', active: false },
  ];

  return (
    <nav className='fixed top-0 w-full z-50 bg-surface-container-lowest shadow-sm h-20'>
      <div className='flex justify-between items-center px-8 h-full max-w-content mx-auto'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='text-2xl font-black text-primary tracking-tight'>
              {t('brand')}
              <span className='text-on-surface'>{t('brandAccent')}</span>
            </span>
            <span className='text-caption font-bold text-on-surface-variant uppercase tracking-widest leading-none'>
              {t('region')}
            </span>
          </Link>

          <div className='hidden md:flex items-center gap-6'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.active
                    ? 'text-primary font-bold border-b-2 border-primary tracking-tight py-2'
                    : 'text-on-surface-variant hover:text-primary tracking-tight py-2 transition-colors font-medium'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            className='rounded-full font-semibold text-on-surface-variant hover:text-on-surface'
          >
            {t('contactUs')}
          </Button>
          <Button className='rounded-full bg-primary text-on-primary font-bold px-8 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-colors'>
            {t('signIn')}
          </Button>
        </div>
      </div>
    </nav>
  );
}
