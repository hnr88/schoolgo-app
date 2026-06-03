'use client';

import { useMemo, useState } from 'react';
import { useParentConversations } from '@/modules/applications/queries/use-parent-conversations.query';
import { filterConversations } from '@/modules/applications/lib/filter-conversations';
import type { ConversationSummary } from '@/modules/applications/types/conversation.types';

export function useParentMessages() {
  const { data, isLoading, isError } = useParentConversations();
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
