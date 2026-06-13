'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useGrowthServices } from '@/modules/school-growth-services/queries/use-growth-services.query';
import { ServiceCatalogCard } from '@/modules/school-growth-services/components/ServiceCatalogCard';

export function ServiceCatalog() {
  const t = useTranslations('SchoolGrowthServices');
  const servicesQuery = useGrowthServices();

  if (servicesQuery.isLoading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className='h-48 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (servicesQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('catalogLoadError')}
        onRetry={() => servicesQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const services = servicesQuery.data ?? [];

  if (services.length === 0) {
    return (
      <EmptyState
        framed
        icon={Sparkles}
        title={t('catalogEmptyTitle')}
        description={t('catalogEmptyDescription')}
      />
    );
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {services.map((service) => (
        <ServiceCatalogCard key={service.documentId} service={service} />
      ))}
    </div>
  );
}
