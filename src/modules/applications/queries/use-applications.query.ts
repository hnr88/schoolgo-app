import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { withApplicationComputedFields } from '@/modules/applications/lib/format';
import type { StrapiApplicationListResponse } from '@/modules/applications/types/application.types';
import type { UseApplicationsParams } from '@/modules/applications/types/query.types';

export function useApplications({ page = 1, pageSize = 20, status, search, sort }: UseApplicationsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['applications', { page, pageSize, status, search, sort }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
        'sort[0]': sort || 'createdAt:desc',
        'populate[student][fields][0]': 'firstName',
        'populate[student][fields][1]': 'lastName',
        'populate[student][fields][2]': 'nationality',
        'populate[school][fields][0]': 'name',
        'populate[school][fields][1]': 'state',
        'populate[school][fields][2]': 'cricosCode',
      };

      if (status && status !== 'all') {
        if (status === 'active') {
          params['filters[status][$notIn][0]'] = 'withdrawn';
          params['filters[status][$notIn][1]'] = 'declined';
          params['filters[status][$notIn][2]'] = 'enrolled';
        } else if (status === 'needs_action') {
          params['filters[status][$in][0]'] = 'documents_requested';
          params['filters[status][$in][1]'] = 'offer_made';
        } else {
          params['filters[status][$eq]'] = status;
        }
      }

      if (search) {
        params['filters[$or][0][student][firstName][$containsi]'] = search;
        params['filters[$or][1][student][lastName][$containsi]'] = search;
        params['filters[$or][2][school][name][$containsi]'] = search;
      }

      const { data } = await privateApi.get<StrapiApplicationListResponse>('/api/applications', { params });
      return {
        ...data,
        data: data.data.map(withApplicationComputedFields),
      };
    },
  });
}
