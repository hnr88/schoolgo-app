import { describe, expect, it, vi } from 'vitest';

// Mock the axios barrel so importing the helper does not pull in private.ts's
// interceptor chain (auth store, i18n routing, localStorage persistence).
// Identity is all the helper cares about, so plain sentinels suffice.
const { publicApiMock, privateApiMock } = vi.hoisted(() => ({
  publicApiMock: { post: vi.fn() },
  privateApiMock: { post: vi.fn() },
}));

vi.mock('@/lib/axios', () => ({
  publicApi: publicApiMock,
  privateApi: privateApiMock,
}));

import { resolveSearchClient } from '@/modules/school-search/lib/resolve-search-client';

describe('resolveSearchClient', () => {
  it('returns privateApi when a jwt is present', () => {
    expect(resolveSearchClient('eyJhbGciOiJIUzI1NiJ9.test.sig')).toBe(privateApiMock);
  });

  it('returns publicApi when jwt is null', () => {
    expect(resolveSearchClient(null)).toBe(publicApiMock);
  });

  it('returns publicApi when jwt is an empty string', () => {
    expect(resolveSearchClient('')).toBe(publicApiMock);
  });
});
