'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { useIdentifyMutation } from '@/modules/auth/queries/use-identify.mutation';
import type { UnifiedLoginStep } from '@/modules/auth/types/unified-login.types';

interface UseUnifiedLoginOptions {
  currentPortal: Portal;
}

// Drives the email-first unified login. Email is identified against
// /api/auth/identify to resolve the user's portal, then the password step is
// revealed. When the email resolves to a DIFFERENT portal than the subdomain
// the user is on, the browser is sent to that portal's own /sign-in so login
// happens on the right origin (the session cookie + store are host-only and
// cannot follow a cross-subdomain redirect). When identify cannot resolve a
// single portal (not found, ambiguous, or endpoint unavailable) the portal
// chips are revealed so the user can pick manually.
export function useUnifiedLogin({ currentPortal }: UseUnifiedLoginOptions) {
  const locale = useLocale();
  const identify = useIdentifyMutation();
  const [step, setStep] = useState<UnifiedLoginStep>('email');
  const [resolvedPortal, setResolvedPortal] = useState<Portal>(currentPortal);
  const [showPortalChips, setShowPortalChips] = useState(false);

  const revealManualPicker = () => {
    setResolvedPortal(currentPortal);
    setShowPortalChips(true);
    setStep('password');
  };

  const advanceToPassword = async (email: string) => {
    try {
      const result = await identify.mutateAsync(email);

      if (!result.exists || !result.portal) {
        revealManualPicker();
        return;
      }

      if (result.portal !== currentPortal) {
        const target = `${portalUrl(result.portal, locale)}/sign-in?email=${encodeURIComponent(email)}`;
        window.location.href = target;
        return;
      }

      setResolvedPortal(result.portal);
      setShowPortalChips(false);
      setStep('password');
    } catch {
      // identify is best-effort — never block login on its failure.
      revealManualPicker();
    }
  };

  const selectPortal = (portal: Portal) => {
    setResolvedPortal(portal);
  };

  // When the resolved/selected portal lives on a different subdomain, login must
  // happen on THAT origin (host-only session). Send the browser to its /sign-in
  // carrying the email so the flow resumes there. Returns true when it redirected
  // (caller should not attempt the local login).
  const redirectForCrossPortal = (portal: Portal, email: string): boolean => {
    if (portal === currentPortal) return false;
    window.location.href = `${portalUrl(portal, locale)}/sign-in?email=${encodeURIComponent(email)}`;
    return true;
  };

  const backToEmail = () => {
    setStep('email');
    setShowPortalChips(false);
  };

  return {
    step,
    resolvedPortal,
    showPortalChips,
    isIdentifying: identify.isPending,
    advanceToPassword,
    selectPortal,
    backToEmail,
    redirectForCrossPortal,
  };
}
