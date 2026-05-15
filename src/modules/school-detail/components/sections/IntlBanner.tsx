import { Globe2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

export async function IntlBanner() {
  const t = await getTranslations('SchoolDetail');

  return (
    <div role="note" className="border-b border-babu-50 bg-babu-50 py-3 text-center">
      <SectionContainer size="wide">
        <p className="inline-flex items-center justify-center gap-2 text-body-sm font-medium text-babu-800">
          <Globe2 className="h-4 w-4 text-babu-700" aria-hidden="true" />
          {t('intlBanner')}
        </p>
      </SectionContainer>
    </div>
  );
}
