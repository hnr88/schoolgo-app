import { getTranslations } from 'next-intl/server';
import { MarketingHeaderClient } from '@/modules/marketing-layout/components/MarketingHeaderClient';

export async function MarketingHeader() {
  const t = await getTranslations('MarketingHeader');
  return (
    <MarketingHeaderClient
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
