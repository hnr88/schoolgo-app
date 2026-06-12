'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from '@/i18n/navigation';
import { DocumentVaultPage } from '@/modules/document-vault/components/DocumentVaultPage';
import { DocumentExpiryPage } from '@/modules/parent-document-expiry';
import { DOCUMENTS_TAB_PARAM } from '@/modules/document-vault/constants/document-vault.constants';
import { resolveDocumentsTab } from '@/modules/document-vault/lib/resolve-documents-tab';

const TAB_TRIGGER_CLASS =
  'text-foreground/80 data-active:bg-rausch-50 data-active:text-rausch-700';

export function DocumentsTabs() {
  const tVault = useTranslations('DocumentVault');
  const tExpiry = useTranslations('ParentDocumentExpiry');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = resolveDocumentsTab(searchParams.get(DOCUMENTS_TAB_PARAM));

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(DOCUMENTS_TAB_PARAM, value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className='gap-6'>
      <TabsList className='max-w-full overflow-x-auto overflow-y-hidden'>
        <TabsTrigger value='vault' className={TAB_TRIGGER_CLASS}>
          {tVault('title')}
        </TabsTrigger>
        <TabsTrigger value='expiry' className={TAB_TRIGGER_CLASS}>
          {tExpiry('title')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='vault'>
        <DocumentVaultPage />
      </TabsContent>

      <TabsContent value='expiry'>
        <DocumentExpiryPage />
      </TabsContent>
    </Tabs>
  );
}
