'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useAgentVerificationStatus } from '@/modules/agent-profile/queries/use-verification-status.query';
import { useAgentPublicPreview } from '@/modules/agent-profile/queries/use-public-preview.query';
import { VerificationSection } from '@/modules/agent-profile/components/VerificationSection';
import { PublicProfileForm } from '@/modules/agent-profile/components/PublicProfileForm';
import { WhatSchoolsSeeCard } from '@/modules/agent-profile/components/WhatSchoolsSeeCard';
import { AgentProfileBuilder } from '@/modules/agent-profile/components/AgentProfileBuilder';

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-48 w-full rounded-lg' />
      <Skeleton className='h-80 w-full rounded-lg' />
      <Skeleton className='h-64 w-full rounded-lg' />
    </div>
  );
}

export function AgentProfilePage() {
  const t = useTranslations('AgentProfile');
  const verification = useAgentVerificationStatus();
  const preview = useAgentPublicPreview();

  if (verification.isLoading || preview.isLoading) {
    return <ProfileSkeleton />;
  }

  if (verification.isError || preview.isError || !verification.data || !preview.data) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => {
          verification.refetch();
          preview.refetch();
        }}
        retryLabel={t('retry')}
        framed
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <VerificationSection verification={verification.data} />

      <AgentProfileBuilder />

      <SurfaceCard padding='lg' className='flex flex-col gap-5'>
        <SectionHeading title={t('editorTitle')} description={t('editorSubtitle')} level={2} />
        <PublicProfileForm preview={preview.data} />
      </SurfaceCard>

      <WhatSchoolsSeeCard preview={preview.data} />
    </div>
  );
}
