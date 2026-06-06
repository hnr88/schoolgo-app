'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SurfaceCard } from '@/modules/core';
import { StatusBadge } from '@/modules/design-system';
import { formatAud, formatFinanceDate } from '@/modules/school-invoices/lib/format-finance';
import { useApplicationServices } from '@/modules/school-applications/queries/use-application-services.query';
import { SERVICE_INVOICE_STATUS_TONE } from '@/modules/school-applications/constants/service-invoice.constants';
import type { ServiceInvoice } from '@/modules/school-applications/types/school-applications.types';

function ServiceRow({ invoice }: { invoice: ServiceInvoice }) {
  const t = useTranslations('SchoolApplications');
  const line = invoice.lineItems?.[0] ?? null;
  return (
    <li className='flex flex-col gap-2 rounded-lg border border-border p-4'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm font-semibold text-ink-900'>
          {line?.name ?? t('serviceUnnamed')}
        </span>
        <StatusBadge tone={SERVICE_INVOICE_STATUS_TONE[invoice.status]}>
          {t(`serviceStatus_${invoice.status}`)}
        </StatusBadge>
      </div>
      <div className='flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-foggy'>
        <span>{t('serviceQuantityValue', { quantity: line?.quantity ?? 1 })}</span>
        {line && <span>{t('serviceUnitPriceValue', { price: formatAud(line.unitPriceAud) })}</span>}
        <span>{t('serviceIssuedValue', { date: formatFinanceDate(invoice.issuedAt) })}</span>
      </div>
      <div className='flex items-center justify-between gap-3 border-t border-divider pt-2'>
        <span className='text-sm text-foggy'>{t('serviceTotalLabel')}</span>
        <span className='text-sm font-semibold text-ink-900 tabular-nums'>
          {formatAud(invoice.amountAud, invoice.currency)}
        </span>
      </div>
    </li>
  );
}

export function SchoolServicesSection({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data = [], isLoading } = useApplicationServices(documentId);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-3'>
      <h3 className='text-sm font-semibold text-ink-900'>{t('servicesTitle')}</h3>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-20 w-full rounded-lg' />
          <Skeleton className='h-20 w-full rounded-lg' />
        </div>
      ) : data.length === 0 ? (
        <EmptyState framed icon={Sparkles} title={t('servicesEmpty')} />
      ) : (
        <ul className='flex flex-col gap-3'>
          {data.map((invoice) => (
            <ServiceRow key={invoice.documentId} invoice={invoice} />
          ))}
        </ul>
      )}
    </SurfaceCard>
  );
}
