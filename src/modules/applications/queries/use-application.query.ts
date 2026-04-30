import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { withApplicationComputedFields } from '@/modules/applications/lib/format';
import type { Application } from '@/modules/applications/types/application.types';

export function useApplication(documentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', documentId],
    enabled: isAuthenticated && !!documentId,
    queryFn: async () => {
      const { data } = await privateApi.get<{ data: Application }>(`/api/applications/${documentId}`, {
        params: {
          'populate[student][fields][0]': 'firstName',
          'populate[student][fields][1]': 'lastName',
          'populate[student][fields][2]': 'nationality',
          'populate[school][fields][0]': 'name',
          'populate[school][fields][1]': 'state',
          'populate[school][fields][2]': 'cricosCode',
        },
      });
      return withApplicationComputedFields(data.data);
    },
  });
}
