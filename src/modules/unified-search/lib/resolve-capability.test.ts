import { describe, expect, it } from 'vitest';
import { PUBLIC_RESULT_CAP } from '@/modules/unified-search/constants/unified-search.constants';
import { resolveCapability } from '@/modules/unified-search/lib/resolve-capability';

describe('resolveCapability', () => {
  it('grants the full capability set when authenticated', () => {
    expect(resolveCapability('authenticated')).toEqual({
      isAdvanced: true,
      canPersonalize: true,
      canContact: true,
      canMap: true,
      forceVerifiedOnly: false,
      resultCap: null,
    });
  });

  it('returns the closed teaser capability for public access', () => {
    expect(resolveCapability('public')).toEqual({
      isAdvanced: false,
      canPersonalize: false,
      canContact: false,
      canMap: true,
      forceVerifiedOnly: true,
      resultCap: PUBLIC_RESULT_CAP,
    });
  });
});
