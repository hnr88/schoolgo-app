'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, SurfaceCard, surfaceCardVariants } from '@/modules/core';
import { StatusBadge } from '@/modules/design-system';
import {
  useSchoolPreEnrolment,
  useUpdatePreEnrolmentStatus,
} from '@/modules/school-applications/queries/use-school-pre-enrolment.query';
import type { SchoolPreEnrolmentItem } from '@/modules/school-applications/types/school-applications.types';

const TONE = {
  pending: 'muted',
  submitted: 'submitted',
  approved: 'enrolled',
  rejected: 'rejected',
} as const;

function ItemRow({ item, documentId }: { item: SchoolPreEnrolmentItem; documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const update = useUpdatePreEnrolmentStatus(documentId);

  function act(status: 'approved' | 'rejected') {
    update.mutate(
      { itemDocumentId: item.documentId, status },
      {
        onSuccess: () => toast.success(t('actionSuccess')),
        onError: () => toast.error(t('actionError')),
      },
    );
  }

  return (
    <li className='flex items-center justify-between gap-3 rounded-lg border border-border p-3'>
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-medium text-ink-900'>{item.customLabel ?? item.itemType}</span>
        <StatusBadge tone={TONE[item.status]}>{t(`preEnrolStatus_${item.status}`)}</StatusBadge>
      </div>
      {item.status === 'submitted' && (
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' disabled={update.isPending} onClick={() => act('approved')}>
            {t('preEnrolApprove')}
          </Button>
          <Button size='sm' variant='destructive' disabled={update.isPending} onClick={() => act('rejected')}>
            {t('preEnrolReject')}
          </Button>
        </div>
      )}
    </li>
  );
}

export function SchoolPreEnrolmentTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data: items, isLoading, isError, refetch } = useSchoolPreEnrolment(documentId);

  if (isLoading) {
    return (
      <SurfaceCard padding='lg' className='flex flex-col gap-3'>
        <Skeleton className='h-16 w-full rounded-lg' />
        <Skeleton className='h-16 w-full rounded-lg' />
      </SurfaceCard>
    );
  }

  if (isError) {
    return (
      <ErrorState
        framed
        message={t('preEnrolLoadError')}
        onRetry={() => refetch()}
        retryLabel={t('preEnrolRetry')}
      />
    );
  }

  if (!items || items.length === 0) {
    return <EmptyState framed icon={ClipboardList} title={t('preEnrolEmpty')} />;
  }

  return (
    <ul className={cn(surfaceCardVariants({ padding: 'lg' }), 'flex flex-col gap-3')}>
      {items.map((item) => (
        <ItemRow key={item.documentId} item={item} documentId={documentId} />
      ))}
    </ul>
  );
}
