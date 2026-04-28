import { getLocale, getTranslations } from 'next-intl/server';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { MarketingHeaderClient } from '@/modules/marketing-layout/components/MarketingHeaderClient';

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

interface MarketingHeaderProps {
  activePortal: Portal;
}

export async function MarketingHeader({ activePortal }: MarketingHeaderProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingHeader'),
    getLocale(),
  ]);

  const navLinks = PORTAL_NAV[activePortal].map((item) => ({
    label: t(`nav.${activePortal}.${item.labelKey}`),
    href: item.href,
  }));

  return (
    <MarketingHeaderClient
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
