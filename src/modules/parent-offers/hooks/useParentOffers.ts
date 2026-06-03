'use client';

import { useActiveChildStore } from '@/modules/students';
import { useParentOffers as useParentOffersQuery } from '@/modules/parent-offers/queries/use-parent-offers.query';
import type { UseParentOffersResult } from '@/modules/parent-offers/types/parent-offers.types';

export function useParentOffers(studentDocumentId?: string): UseParentOffersResult {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const student = studentDocumentId ?? activeChildId ?? undefined;

  const { data, isLoading, isError, refetch } = useParentOffersQuery(student);

  const offers = data?.data ?? [];
  const isEmpty = !isLoading && !isError && offers.length === 0;

  return {
    offers,
    isLoading,
    isError,
    isEmpty,
    refetch,
  };
}
