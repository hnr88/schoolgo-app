'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { PROFILE_SECTIONS, PROFILE_SECTION_IDS } from '@/modules/school-profile/constants/profile-sections.constants';
import { useActiveSection } from '@/modules/school-profile/hooks/useActiveSection';
import { scrollToSection } from '@/modules/school-profile/lib/scroll-to-section';

export function ProfileSectionNav() {
  const t = useTranslations('SchoolProfile');
  const activeId = useActiveSection(PROFILE_SECTION_IDS);

  return (
    <nav aria-label={t('sectionNavLabel')} className='lg:sticky lg:top-6'>
      <p className='mb-3 hidden px-3 text-xs font-semibold uppercase tracking-wide text-foggy lg:block'>
        {t('sectionNavLabel')}
      </p>
      <ul className='flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0'>
        {PROFILE_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          const Icon = section.icon;
          return (
            <li key={section.id} className='shrink-0'>
              <button
                type='button'
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center gap-2 rounded-pill px-3 py-2 text-sm font-medium text-foggy transition-colors ease-out-quart',
                  'hover:bg-arches-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'lg:rounded-lg',
                  isActive && 'bg-arches-50 text-arches-700',
                )}
              >
                <Icon className='h-4 w-4 shrink-0' aria-hidden='true' />
                <span className='whitespace-nowrap'>{t(section.titleKey)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
