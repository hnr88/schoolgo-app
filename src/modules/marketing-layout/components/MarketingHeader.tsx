import { getLocale, getTranslations } from 'next-intl/server';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { MarketingHeaderClient } from '@/modules/marketing-layout/components/MarketingHeaderClient';

interface MarketingHeaderProps {
  activePortal: Portal;
}

export async function MarketingHeader({ activePortal }: MarketingHeaderProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingHeader'),
    getLocale(),
  ]);

  return (
    <MarketingHeaderClient
      activePortal={activePortal}
      portalUrls={{
        parent: portalUrl('parent', locale),
        agent: portalUrl('agent', locale),
        school: portalUrl('school', locale),
      }}
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
