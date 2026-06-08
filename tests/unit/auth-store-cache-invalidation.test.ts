import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the axios barrel so the auth store talks to controllable fakes instead of
// the network. This also breaks the private.ts -> use-auth-store circular import.
// vi.hoisted lets the factory (hoisted to top of file) reference these mocks.
const { postMock, getMock } = vi.hoisted(() => ({
  postMock: vi.fn(),
  getMock: vi.fn(),
}));

vi.mock('@/lib/axios', () => ({
  publicApi: { post: postMock },
  privateApi: { get: getMock },
}));

// auth-cookie pulls in the request-proxy barrel (next-intl navigation), which
// doesn't resolve under vitest. The cookie write is irrelevant to the cache
// invariant under test, so stub it to no-ops.
vi.mock('@/modules/auth/lib/auth-cookie', () => ({
  setLoggedInPortalCookie: vi.fn(),
  clearLoggedInPortalCookie: vi.fn(),
}));

// This jsdom build does not expose localStorage by default. The stores persist
// through createJSONStorage(() => localStorage), so install a minimal in-memory
// shim via vi.hoisted (runs before the store imports below). Persistence is
// incidental to the cache invariant under test.
vi.hoisted(() => {
  if (typeof globalThis.localStorage === 'undefined') {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
        setItem: (key: string, value: string) => void store.set(key, String(value)),
        removeItem: (key: string) => void store.delete(key),
        clear: () => store.clear(),
        key: (index: number) => Array.from(store.keys())[index] ?? null,
        get length() {
          return store.size;
        },
      },
    });
  }
});

import { getQueryClient } from '@/lib/query-client';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useOnboardingStore } from '@/modules/onboarding/stores/use-onboarding-store';
import { useActiveChildStore } from '@/modules/students/stores/use-active-child-store';
import { useRecentPagesStore } from '@/modules/command-palette/stores/use-recent-pages-store';

const ME_KEY = ['parent', 'me'] as const;

// Account A is already onboarded; account B is a fresh identity.
const ACCOUNT_A_ME = { id: 1, email: 'a@example.com', profileCompleted: true };
const ACCOUNT_B_ME = { id: 2, email: 'b@example.com', userType: 'parent', profileCompleted: true };

beforeEach(() => {
  localStorage.clear();
  postMock.mockReset();
  getMock.mockReset();
  // Start every test from a clean cache and clean store state.
  getQueryClient().clear();
  useOnboardingStore.setState({ dismissed: false });
  useActiveChildStore.setState({ activeChildId: null });
  useRecentPagesStore.setState({ pages: [] });
  useAuthStore.setState({
    user: null,
    jwt: null,
    userType: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('auth store / query cache identity invariant', () => {
  it('getQueryClient() returns the same browser-wide singleton across calls', () => {
    // jsdom is browser-like (window defined), so the provider and the store
    // share ONE client — that shared instance is what makes store-side
    // .clear() actually wipe the React tree's cache.
    expect(getQueryClient()).toBe(getQueryClient());
  });

  it('logout() clears the cached ["parent","me"] entry and resets per-account localStorage stores', () => {
    // Seed account A's me into the exact key useMe() reads.
    getQueryClient().setQueryData(ME_KEY, ACCOUNT_A_ME);
    // Simulate prior-account state persisted in localStorage.
    useOnboardingStore.setState({ dismissed: true });
    useActiveChildStore.setState({ activeChildId: 'child-a' });
    useRecentPagesStore.setState({
      pages: [{ portal: 'parent', href: '/parent/dashboard', label: 'Dashboard' }],
    });

    expect(getQueryClient().getQueryData(ME_KEY)).toEqual(ACCOUNT_A_ME);

    useAuthStore.getState().logout();

    // Stale me is gone -> the gate cannot read a previous account's profileCompleted.
    expect(getQueryClient().getQueryData(ME_KEY)).toBeUndefined();
    // Every per-account localStorage store is reset so nothing bleeds into the next account.
    expect(useOnboardingStore.getState().dismissed).toBe(false);
    expect(useActiveChildStore.getState().activeChildId).toBeNull();
    expect(useRecentPagesStore.getState().pages).toEqual([]);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().jwt).toBeNull();
  });

  it('login() clears a stale ["parent","me"] entry seeded by a previous account', async () => {
    // Account A's me is still cached from a prior session in the same SPA tab.
    getQueryClient().setQueryData(ME_KEY, ACCOUNT_A_ME);
    expect(getQueryClient().getQueryData(ME_KEY)).toEqual(ACCOUNT_A_ME);

    postMock.mockResolvedValue({ data: { jwt: 'jwt-account-b' } });
    getMock.mockResolvedValue({ data: ACCOUNT_B_ME });

    await useAuthStore.getState().login({ identifier: 'b@example.com', password: 'pw' });

    // The stale A entry must be gone after login so the next refetch (useMe)
    // hits the network for account B instead of serving A's profileCompleted.
    expect(getQueryClient().getQueryData(ME_KEY)).toBeUndefined();

    // login() actually ran against the mocked APIs and adopted account B.
    expect(postMock).toHaveBeenCalledWith('/api/auth/local', {
      identifier: 'b@example.com',
      password: 'pw',
    });
    expect(getMock).toHaveBeenCalledWith('/api/users/me');
    expect(useAuthStore.getState().jwt).toBe('jwt-account-b');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe('b@example.com');
  });

  it('A -> logout -> B -> logout -> A never leaks the previous identity into the cache', async () => {
    // Account A session leaves its me cached.
    getQueryClient().setQueryData(ME_KEY, ACCOUNT_A_ME);

    // Log out of A.
    useAuthStore.getState().logout();
    expect(getQueryClient().getQueryData(ME_KEY)).toBeUndefined();

    // Log into B; login() clears whatever (if anything) was cached first.
    postMock.mockResolvedValue({ data: { jwt: 'jwt-account-b' } });
    getMock.mockResolvedValue({ data: ACCOUNT_B_ME });
    await useAuthStore.getState().login({ identifier: 'b@example.com', password: 'pw' });

    // While B is active, useMe would populate B's me.
    getQueryClient().setQueryData(ME_KEY, ACCOUNT_B_ME);

    // Log out of B, then back into A.
    useAuthStore.getState().logout();
    expect(getQueryClient().getQueryData(ME_KEY)).toBeUndefined();

    postMock.mockResolvedValue({ data: { jwt: 'jwt-account-a' } });
    getMock.mockResolvedValue({ data: ACCOUNT_A_ME });
    await useAuthStore.getState().login({ identifier: 'a@example.com', password: 'pw' });

    // At the moment A logs back in, B's me must NOT be sitting in the cache.
    expect(getQueryClient().getQueryData(ME_KEY)).toBeUndefined();
    expect(useAuthStore.getState().jwt).toBe('jwt-account-a');
  });
});
