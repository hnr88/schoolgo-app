'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useParentConversations } from '@/modules/applications/queries/use-parent-conversations.query';
import { filterConversations } from '@/modules/applications/lib/filter-conversations';
import type { ConversationSummary } from '@/modules/applications/types/conversation.types';

export function useParentMessages() {
  const { data, isLoading, isError, refetch } = useParentConversations();
  const searchParams = useSearchParams();
  const initialApplicationId = searchParams.get('application');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(initialApplicationId);

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
    refetch,
    search,
    setSearch,
    selectedId,
    selectedConversation,
    selectConversation: setSelectedId,
    clearSelection: () => setSelectedId(null),
  };
}
