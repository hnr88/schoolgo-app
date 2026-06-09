'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useSchoolConversations } from '@/modules/school-messages/queries/use-school-conversations.query';
import { SchoolConversationRow } from '@/modules/school-messages/components/SchoolConversationRow';

export function SchoolMessagesPage() {
  const t = useTranslations('SchoolMessages');
  const { data, isLoading, isError, refetch } = useSchoolConversations();

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState
        framed
        message={t('errorMessage')}
        onRetry={() => refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  if (data.data.length === 0) {
    return (
      <EmptyState
        framed
        icon={MessageSquare}
        title={t('emptyTitle')}
        description={t('emptyDescription')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      <ul className='flex flex-col gap-3'>
        {data.data.map((conversation) => (
          <SchoolConversationRow
            key={conversation.applicationDocumentId}
            conversation={conversation}
          />
        ))}
      </ul>
      {data.meta.truncated && (
        <p className='text-xs text-foggy'>
          {t('truncatedNotice', { count: data.meta.scannedMessages })}
        </p>
      )}
    </div>
  );
}
