import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ParentMe } from '@/modules/parent-settings';

// The gate imports three barrels. Mocking them keeps the render free of the
// next-intl navigation / axios / zustand-persist wiring the real modules pull in.
const { replaceMock, useMeMock, isAuthenticatedRef } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  useMeMock: vi.fn(),
  isAuthenticatedRef: { current: true },
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

vi.mock('@/modules/parent-settings', () => ({
  useMe: useMeMock,
}));

// useAuthStore is a selector hook: useAuthStore((s) => s.isAuthenticated).
vi.mock('@/modules/auth', () => ({
  useAuthStore: (selector: (state: { isAuthenticated: boolean }) => unknown) =>
    selector({ isAuthenticated: isAuthenticatedRef.current }),
}));

import { ParentOnboardingGate } from '@/modules/parent-onboarding/components/ParentOnboardingGate';

function makeMe(overrides: Partial<ParentMe>): ParentMe {
  return {
    id: 1,
    documentId: 'doc-1',
    username: 'parent',
    email: 'parent@example.com',
    userType: 'parent',
    firstName: null,
    lastName: null,
    phone: null,
    preferences: null,
    relationshipToStudent: null,
    occupation: null,
    secondaryPhone: null,
    preferredContactMethod: null,
    addressLine: null,
    city: null,
    stateRegion: null,
    postalCode: null,
    countryOfResidence: null,
    emergencyContactName: null,
    emergencyContactPhone: null,
    emergencyContactRelationship: null,
    profileCompleted: false,
    confirmed: true,
    blocked: false,
    ...overrides,
  };
}

function child() {
  return <div data-testid='gate-child'>protected content</div>;
}

beforeEach(() => {
  replaceMock.mockReset();
  useMeMock.mockReset();
  isAuthenticatedRef.current = true;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ParentOnboardingGate', () => {
  it('redirects an unfinished parent to onboarding and hides children', () => {
    useMeMock.mockReturnValue({
      data: makeMe({ userType: 'parent', profileCompleted: false }),
      isLoading: false,
    });

    render(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);

    expect(replaceMock).toHaveBeenCalledWith('/parent/onboarding');
    expect(screen.queryByTestId('gate-child')).not.toBeInTheDocument();
  });

  it('renders children for a completed parent and never redirects', () => {
    useMeMock.mockReturnValue({
      data: makeMe({ userType: 'parent', profileCompleted: true }),
      isLoading: false,
    });

    render(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);

    expect(replaceMock).not.toHaveBeenCalled();
    expect(screen.getByTestId('gate-child')).toBeInTheDocument();
  });

  it('renders children for a non-parent account and never redirects', () => {
    // profileCompleted is false, but a non-parent must NOT be forced into the
    // parent onboarding flow.
    useMeMock.mockReturnValue({
      data: makeMe({ userType: 'agent', profileCompleted: false }),
      isLoading: false,
    });

    render(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);

    expect(replaceMock).not.toHaveBeenCalled();
    expect(screen.getByTestId('gate-child')).toBeInTheDocument();
  });

  it('shows the loader (not children) while me is loading for an authenticated user', () => {
    useMeMock.mockReturnValue({ data: undefined, isLoading: true });

    render(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);

    expect(replaceMock).not.toHaveBeenCalled();
    expect(screen.queryByTestId('gate-child')).not.toBeInTheDocument();
  });

  it('does not redirect a completed account that re-renders after an unfinished one', () => {
    // Account A (unfinished) renders, bounces to onboarding.
    useMeMock.mockReturnValue({
      data: makeMe({ id: 1, userType: 'parent', profileCompleted: false }),
      isLoading: false,
    });
    const { rerender } = render(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);
    expect(replaceMock).toHaveBeenCalledWith('/parent/onboarding');

    replaceMock.mockClear();

    // Account B (completed) is now the active identity. The completed account
    // must never inherit A's onboarding bounce.
    useMeMock.mockReturnValue({
      data: makeMe({ id: 2, userType: 'parent', profileCompleted: true }),
      isLoading: false,
    });
    rerender(<ParentOnboardingGate>{child()}</ParentOnboardingGate>);

    expect(replaceMock).not.toHaveBeenCalled();
    expect(screen.getByTestId('gate-child')).toBeInTheDocument();
  });
});
