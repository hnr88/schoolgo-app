import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

// Mock the axios barrel so login() talks to controllable fakes (also breaks the
// private.ts -> use-auth-store circular import under vitest).
const { postMock, getMock } = vi.hoisted(() => ({ postMock: vi.fn(), getMock: vi.fn() }));
vi.mock('@/lib/axios', () => ({
  publicApi: { post: postMock },
  privateApi: { get: getMock },
}));

// auth-cookie pulls in the request-proxy barrel (next-intl navigation), which
// doesn't resolve under vitest. The cookie writes are irrelevant here.
vi.mock('@/modules/auth/lib/auth-cookie', () => ({
  setLoggedInPortalCookie: vi.fn(),
  clearLoggedInPortalCookie: vi.fn(),
}));

// next-intl hooks: identity translator + fixed default locale.
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// sonner toasts.
const { toastSuccess, toastError } = vi.hoisted(() => ({ toastSuccess: vi.fn(), toastError: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: toastSuccess, error: toastError } }));

// jsdom build lacks localStorage; the auth store persists through it.
vi.hoisted(() => {
  if (typeof globalThis.localStorage === 'undefined') {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
        setItem: (k: string, v: string) => void store.set(k, String(v)),
        removeItem: (k: string) => void store.delete(k),
        clear: () => store.clear(),
        key: (i: number) => Array.from(store.keys())[i] ?? null,
        get length() {
          return store.size;
        },
      },
    });
  }
});

import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

const originalLocation = window.location;
let hrefValue = '';

beforeEach(() => {
  localStorage.clear();
  postMock.mockReset();
  getMock.mockReset();
  toastSuccess.mockReset();
  toastError.mockReset();
  hrefValue = '';
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      get href() {
        return hrefValue;
      },
      set href(v: string) {
        hrefValue = v;
      },
    },
  });
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
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  vi.restoreAllMocks();
});

function mockBackendUser(userType: string) {
  postMock.mockResolvedValue({ data: { jwt: 'jwt-x' } });
  getMock.mockResolvedValue({
    data: { id: 1, email: `${userType}@example.com`, username: userType, userType },
  });
}

describe('useLogin portal-mismatch guard', () => {
  it('does NOT redirect when the account belongs to a different portal (the cross-subdomain bounce)', async () => {
    // Agent account, but signing in on the PARENT portal subdomain.
    mockBackendUser('agent');
    const { result } = renderHook(() => useLogin({ portal: 'parent' }));

    await act(async () => {
      await result.current.handleLogin({ identifier: 'agent@example.com', password: 'pw' });
    });

    // No cross-origin redirect (which would land on agent.* with no session and bounce).
    expect(hrefValue).toBe('');
    // Clear "not authorised for this portal" feedback instead.
    expect(toastError).toHaveBeenCalledWith('portalUnauthorized');
    expect(toastSuccess).not.toHaveBeenCalled();
    // The wrong-origin session was cleared.
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().jwt).toBeNull();
  });

  it('redirects to the dashboard when the account matches the portal being signed into', async () => {
    // Agent account, signing in on the AGENT portal subdomain.
    mockBackendUser('agent');
    const { result } = renderHook(() => useLogin({ portal: 'agent' }));

    await act(async () => {
      await result.current.handleLogin({ identifier: 'agent@example.com', password: 'pw' });
    });

    expect(hrefValue).toBe('https://agent.schoolgo.com.au/dashboard');
    expect(toastSuccess).toHaveBeenCalledWith('loginSuccess');
    expect(toastError).not.toHaveBeenCalled();
    expect(useAuthStore.getState().userType).toBe('agent');
  });

  it('logs a school account in on the school portal', async () => {
    mockBackendUser('school');
    const { result } = renderHook(() => useLogin({ portal: 'school' }));

    await act(async () => {
      await result.current.handleLogin({ identifier: 'school@example.com', password: 'pw' });
    });

    expect(hrefValue).toBe('https://school.schoolgo.com.au/dashboard');
    expect(toastSuccess).toHaveBeenCalledWith('loginSuccess');
  });
});
