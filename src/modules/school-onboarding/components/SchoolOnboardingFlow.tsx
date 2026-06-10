'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { PORTAL_ALLOWED_ROLES } from '@/modules/auth/constants/auth.constants';
import { useClaimSchool } from '@/modules/school-onboarding/queries/use-claim-school.mutation';
import { extractErrorMessage } from '@/modules/school-onboarding/lib/extract-error-message';
import { UnclaimedSchoolSearch } from '@/modules/school-onboarding/components/UnclaimedSchoolSearch';
import { VerifyCodeForm } from '@/modules/school-onboarding/components/VerifyCodeForm';
import type {
  OnboardingStep,
  UnclaimedSchool,
} from '@/modules/school-onboarding/types/school-onboarding.types';

function OnboardingFlowInner() {
  const t = useTranslations('SchoolOnboarding');
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('search');
  const claim = useClaimSchool();

  const goToDashboard = () => router.replace('/dashboard');

  const handleClaim = (school: UnclaimedSchool, roleTitle: string) => {
    claim.mutate(
      { schoolDocumentId: school.documentId, roleTitle },
      {
        onSuccess: ({ verificationStatus }) => {
          if (verificationStatus === 'verified') {
            toast.success(t('verifiedSuccess'));
            goToDashboard();
            return;
          }
          setStep('verify');
        },
        onError: (err) => toast.error(extractErrorMessage(err, t('errorClaim'))),
      },
    );
  };

  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
      </header>

      <Card>
        <CardContent className='py-6'>
          {step === 'search' ? (
            <UnclaimedSchoolSearch isClaiming={claim.isPending} onClaim={handleClaim} />
          ) : (
            <VerifyCodeForm
              onVerified={goToDashboard}
              onBackToSearch={() => setStep('search')}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function SchoolOnboardingFlow() {
  return (
    <ProtectedLayout allowedRoles={Array.from(PORTAL_ALLOWED_ROLES.school)}>
      <OnboardingFlowInner />
    </ProtectedLayout>
  );
}
