'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  ServiceInvoice,
  ServiceInvoicesResponse,
} from '@/modules/school-applications/types/school-applications.types';

const ADD_ON_SERVICE_KIND = 'add_on_service';

export function useApplicationServices(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'invoices'],
    enabled: isAuthenticated,
    select: (rows: ServiceInvoice[]): ServiceInvoice[] =>
      rows.filter(
        (invoice) =>
          invoice.kind === ADD_ON_SERVICE_KIND &&
          invoice.application?.documentId === documentId,
      ),
    queryFn: async (): Promise<ServiceInvoice[]> => {
      const { data } = await privateApi.get<ServiceInvoicesResponse>('/api/invoices/mine');
      return data.data;
    },
  });
}
