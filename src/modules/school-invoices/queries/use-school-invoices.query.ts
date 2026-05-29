'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolInvoicesResponse } from '@/modules/school-invoices/types/school-invoices.types';

export function useSchoolInvoices() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'invoices'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<SchoolInvoicesResponse>('/api/invoices/mine');
      return data.data;
    },
  });
}
