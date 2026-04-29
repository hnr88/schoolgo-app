import { getLocale, getTranslations } from 'next-intl/server';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { MarketingHeaderClient } from '@/modules/marketing-layout/components/MarketingHeaderClient';
import type { MarketingHeaderProps } from '@/modules/marketing-layout/types/header.types';

const SUB_MENUS = ['explore', 'resources', 'about'] as const;

const SUB_MENU_ITEMS: Record<
  string,
  Array<{ key: string; href: string; icon: string }>
> = {
  explore: [
    { key: 'browseSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '#compare', icon: 'compare' },
    { key: 'scholarships', href: '#faq', icon: 'award' },
    { key: 'englishTests', href: '#faq', icon: 'languages' },
  ],
  resources: [
    { key: 'admissionsGuide', href: '#how-it-works', icon: 'book' },
    { key: 'boardingSchools', href: '#faq', icon: 'building' },
    { key: 'visaRequirements', href: '#faq', icon: 'badge' },
  ],
  about: [
    { key: 'aboutSchoolGo', href: '#faq', icon: 'sparkles' },
    { key: 'contactUs', href: '#faq', icon: 'message' },
    { key: 'forAgents', href: '#faq', icon: 'users' },
    { key: 'forSchools', href: '#faq', icon: 'school' },
  ],
};

const PORTAL_NAV: Record<Portal, Array<{ labelKey: string; href: string }>> = {
  parent: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'compare', href: '#compare' },
    { labelKey: 'faq', href: '#faq' },
  ],
  agent: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'commission', href: '#commission' },
    { labelKey: 'trust', href: '#trust' },
  ],
  school: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'pricing', href: '#pricing' },
    { labelKey: 'faq', href: '#faq' },
  ],
};

export async function MarketingHeader({ activePortal }: MarketingHeaderProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingHeader'),
    getLocale(),
  ]);

  const navLinks = PORTAL_NAV[activePortal].map((item) => ({
    label: t(`nav.${activePortal}.${item.labelKey}`),
    href: item.href,
  }));

  const subMenus = SUB_MENUS.map((menuKey) => ({
    label: t(`subNav.${menuKey}.label`),
    items: SUB_MENU_ITEMS[menuKey].map((item) => ({
      key: item.key,
      label: t(`subNav.${menuKey}.items.${item.key}`),
      description: t(`subNav.${menuKey}.items.${item.key}Desc`),
      href: item.href,
      icon: item.icon,
    })),
  }));

  return (
    <MarketingHeaderClient
      subMenus={subMenus}
      activePortal={activePortal}
      portalUrls={{
        parent: portalUrl('parent', locale),
        agent: portalUrl('agent', locale),
        school: portalUrl('school', locale),
      }}
      navLinks={navLinks}
      labels={{
        findSchools: t('findSchools'),
        signIn: t('signIn'),
        getStarted: t('getStarted'),
        openMenu: t('openMenu'),
        closeMenu: t('closeMenu'),
        menu: t('menu'),
        audiences: {
          parents: t('audiences.parents'),
          agents: t('audiences.agents'),
          schools: t('audiences.schools'),
        },
      }}
    />
  );
}
