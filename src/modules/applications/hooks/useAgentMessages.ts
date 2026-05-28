'use client';

import { useMemo, useState } from 'react';
import { useConversations } from '@/modules/applications/queries/use-conversations.query';
import { filterConversations } from '@/modules/applications/lib/filter-conversations';
import type { ConversationSummary } from '@/modules/applications/types/conversation.types';

export function useAgentMessages() {
  const { data, isLoading, isError } = useConversations();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const conversations = useMemo(() => data ?? [], [data]);
  const filtered = useMemo(
    () => filterConversations(conversations, search),
    [conversations, search],
  );

  const selectedConversation: ConversationSummary | null = useMemo(
    () => conversations.find((c) => c.applicationDocumentId === selectedId) ?? null,
    [conversations, selectedId],
  );

  return {
    conversations: filtered,
    isLoading,
    isError,
    search,
    setSearch,
    selectedId,
    selectedConversation,
    selectConversation: setSelectedId,
    clearSelection: () => setSelectedId(null),
  };
}
