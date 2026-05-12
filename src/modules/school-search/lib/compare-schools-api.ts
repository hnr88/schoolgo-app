import { publicApi } from '@/lib/axios';
import type { CompareSchoolsResponse } from '@/modules/school-search/types/compare-schools.types';

export async function compareSchools(ids: string[]): Promise<CompareSchoolsResponse> {
  const { data } = await publicApi.get<CompareSchoolsResponse>('/api/compare/schools', {
    params: { ids: ids.join(',') },
  });
  return data;
}
