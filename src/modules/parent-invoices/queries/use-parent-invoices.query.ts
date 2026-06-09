'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { parentInvoicesResponseSchema } from '@/modules/parent-invoices/schemas/parent-invoice.schema';
import type { ParentInvoice } from '@/modules/parent-invoices/types/parent-invoice.types';

async function fetchParentInvoices(): Promise<ParentInvoice[]> {
  const { data } = await privateApi.get('/api/invoices/mine');
  return parentInvoicesResponseSchema.parse(data).data;
}

export function useParentInvoices() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'invoices', 'mine'],
    queryFn: fetchParentInvoices,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
