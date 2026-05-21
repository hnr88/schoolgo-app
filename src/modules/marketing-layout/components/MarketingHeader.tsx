import { getLocale, getTranslations } from 'next-intl/server';
import { portalUrl } from '@/lib/portal-url';
import { MarketingHeaderClient } from '@/modules/marketing-layout/components/MarketingHeaderClient';
import type { MarketingHeaderProps } from '@/modules/marketing-layout/types/header.types';
import { SUB_MENUS, SUB_MENU_ITEMS, AUDIENCE_NAV } from '../constants/header.constants';

export async function MarketingHeader({ activePortal, fullWidth = false }: MarketingHeaderProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingHeader'),
    getLocale(),
  ]);

  const navLinks = AUDIENCE_NAV.map((item) => ({
    label: t(`audiences.${item.key}`),
    href: portalUrl(item.portal, locale),
    isActive: item.portal === activePortal,
    audienceKey: item.key,
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
      fullWidth={fullWidth}
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
      }}
    />
  );
}
