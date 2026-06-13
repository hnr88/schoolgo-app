'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceCatalog } from '@/modules/school-growth-services/components/ServiceCatalog';
import { EngagementsList } from '@/modules/school-growth-services/components/EngagementsList';

export function GrowthServicesPage() {
  const t = useTranslations('SchoolGrowthServices');

  return (
    <Tabs defaultValue='catalog' className='gap-6'>
      <TabsList className='h-auto flex-wrap justify-start'>
        <TabsTrigger value='catalog' className='text-foreground/80'>
          {t('tabCatalog')}
        </TabsTrigger>
        <TabsTrigger value='engagements' className='text-foreground/80'>
          {t('tabEngagements')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='catalog'>
        <ServiceCatalog />
      </TabsContent>
      <TabsContent value='engagements'>
        <EngagementsList />
      </TabsContent>
    </Tabs>
  );
}
