import { PUBLIC_RESULT_CAP } from '@/modules/unified-search/constants/unified-search.constants';
import type { SearchAccess, SearchCapability } from '@/modules/unified-search/types/unified-search.types';

export function resolveCapability(access: SearchAccess): SearchCapability {
  if (access === 'authenticated') {
    return {
      isAdvanced: true,
      canPersonalize: true,
      canContact: true,
      canMap: true,
      forceVerifiedOnly: false,
      resultCap: null,
    };
  }

  return {
    isAdvanced: false,
    canPersonalize: false,
    canContact: false,
    canMap: true,
    forceVerifiedOnly: true,
    resultCap: PUBLIC_RESULT_CAP,
  };
}
