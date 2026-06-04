'use client';

import { useActiveChildStore } from '@/modules/students';
import { useParentOffers as useParentOffersQuery } from '@/modules/parent-offers/queries/use-parent-offers.query';
import type { UseParentOffersResult } from '@/modules/parent-offers/types/parent-offers.types';

export function useParentOffers(studentDocumentId?: string): UseParentOffersResult {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const student = studentDocumentId ?? activeChildId ?? undefined;

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useParentOffersQuery(student);

  const offers = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.meta.pagination.total ?? 0;
  const isEmpty = !isLoading && !isError && offers.length === 0;

  return {
    offers,
    total,
    isLoading,
    isError,
    isEmpty,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    loadMore: () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    refetch,
  };
}
