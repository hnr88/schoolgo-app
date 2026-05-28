'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import { useAgentMessages } from '@/modules/applications/hooks/useAgentMessages';
import { ConversationList } from '@/modules/applications/components/ConversationList';
import { MessageThreadPanel } from '@/modules/applications/components/MessageThreadPanel';

export function AgentMessagesPage() {
  const t = useTranslations('AgentMessages');
  const {
    conversations,
    isLoading,
    isError,
    search,
    setSearch,
    selectedId,
    selectedConversation,
    selectConversation,
    clearSelection,
  } = useAgentMessages();

  return (
    <div className='flex flex-col gap-6'>
      <header>
        <h2 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h2>
        <p className='mt-1 text-sm text-muted-foreground'>{t('subtitle')}</p>
      </header>

      <div className='grid h-[calc(100vh-16rem)] min-h-96 grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]'>
        <section
          className={cn(
            'flex-col rounded-xl border border-border bg-card p-4',
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
          />
        </section>

        <section
          className={cn(
            'flex-col rounded-xl border border-border bg-card p-4',
            selectedId ? 'flex' : 'hidden lg:flex',
          )}
        >
          {selectedId ? (
            <MessageThreadPanel
              applicationDocumentId={selectedId}
              conversation={selectedConversation}
              onBack={clearSelection}
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <EmptyState icon={MessageSquare} title={t('selectPrompt')} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
