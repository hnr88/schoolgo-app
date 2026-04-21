import Image from 'next/image';
import { GlobeAltIcon, ShareIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';

export async function Footer() {
  const t = await getTranslations('Footer');
  const year = new Date().getFullYear();

  const resourceLinks = [
    { label: t('resourceLinks.vceResources'), href: '#' },
    { label: t('resourceLinks.hscGuides'), href: '#' },
    { label: t('resourceLinks.ibRequirements'), href: '#' },
  ];

  const directoryLinks = [
    { label: t('directoryLinks.scholarshipTips'), href: '#' },
    { label: t('directoryLinks.contactSupport'), href: '#' },
  ];

  const socialLinks = [
    { Icon: GlobeAltIcon, label: t('social.website'), href: '#' },
    { Icon: ShareIcon, label: t('social.share'), href: '#' },
    { Icon: EnvelopeIcon, label: t('social.email'), href: 'mailto:hello@schoolgo.au' },
  ];

  return (
    <footer className='w-full mt-20 pt-12 pb-8 bg-surface-container-lowest'>
      <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 md:gap-x-6 px-12 max-w-content mx-auto'>
        <div className='flex items-center gap-5'>
          <Image
            src='/logos/logo-black.png'
            alt='SchoolGo'
            width={120}
            height={120}
            className='h-28 w-auto object-contain shrink-0'
          />
          <p className='text-caption font-medium text-on-surface-variant uppercase tracking-widest leading-relaxed pt-1'>
            {t('tagline')}
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <span className='text-caption font-bold text-primary uppercase tracking-widest'>
            {t('resources')}
          </span>
          {resourceLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className='text-caption font-medium text-on-surface-variant hover:text-primary underline decoration-2 underline-offset-4 transition-colors uppercase tracking-widest'
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className='flex flex-col gap-3'>
          <span className='text-caption font-bold text-primary uppercase tracking-widest'>
            {t('directory')}
          </span>
          {directoryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className='text-caption font-medium text-on-surface-variant hover:text-primary underline decoration-2 underline-offset-4 transition-colors uppercase tracking-widest'
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-4'>
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='text-on-surface-variant hover:text-primary transition-colors'
                >
                  <Icon className='w-5 h-5' aria-hidden='true' />
                </a>
              ))}
            </div>
            <LanguageSelector />
          </div>
          <p className='text-caption-xs font-bold text-on-surface-variant uppercase tracking-widest'>
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
