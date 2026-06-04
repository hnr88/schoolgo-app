'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import { PageHeader } from '@/modules/dashboard';
import { useParentMessages } from '@/modules/applications/hooks/useParentMessages';
import { ConversationList } from '@/modules/applications/components/ConversationList';
import { ParentMessageThreadPanel } from '@/modules/applications/components/ParentMessageThreadPanel';

export function ParentMessagesPage() {
  const t = useTranslations('ParentMessages');
  const {
    conversations,
    isLoading,
    isError,
    refetch,
    search,
    setSearch,
    selectedId,
    selectedConversation,
    selectConversation,
    clearSelection,
  } = useParentMessages();

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <div className='grid h-[calc(100vh-16rem)] min-h-96 grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]'>
        <section
          className={cn(
            'flex-col rounded-lg border border-border bg-card p-4 shadow-1',
            selectedId ? 'hidden lg:flex' : 'flex',
          )}
        >
          <ConversationList
            conversations={conversations}
            isLoading={isLoading}
            isError={isError}
            selectedId={selectedId}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectConversation}
            onRetry={() => refetch()}
            errorMessage={t('messagesError')}
            retryLabel={t('retry')}
          />
        </section>

        <section
          className={cn(
            'flex-col rounded-lg border border-border bg-card p-4 shadow-1',
            selectedId ? 'flex' : 'hidden lg:flex',
          )}
        >
          {selectedId ? (
            <ParentMessageThreadPanel
              applicationDocumentId={selectedId}
              conversation={selectedConversation}
              onBack={clearSelection}
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <EmptyState icon={MessageSquare} title={t('selectPrompt')} framed />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
