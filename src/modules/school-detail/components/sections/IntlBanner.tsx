import { Globe2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

export async function IntlBanner() {
  const t = await getTranslations('SchoolDetail');

  return (
    <div role="note" className="bg-babu-50 border-b border-babu-100 py-2">
      <SectionContainer size="wide">
        <p className="inline-flex items-center justify-center gap-2 text-caption font-medium text-babu-800 w-full">
          <Globe2 className="h-3.5 w-3.5 text-babu-700" aria-hidden="true" />
          {t('intlBanner')}
        </p>
      </SectionContainer>
    </div>
  );
}
