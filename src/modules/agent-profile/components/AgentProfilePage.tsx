'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useAgentVerificationStatus } from '@/modules/agent-profile/queries/use-verification-status.query';
import { useAgentPublicPreview } from '@/modules/agent-profile/queries/use-public-preview.query';
import { VerificationSection } from '@/modules/agent-profile/components/VerificationSection';
import { PublicProfileForm } from '@/modules/agent-profile/components/PublicProfileForm';
import { WhatSchoolsSeeCard } from '@/modules/agent-profile/components/WhatSchoolsSeeCard';

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-48 w-full rounded-xl' />
      <Skeleton className='h-80 w-full rounded-xl' />
      <Skeleton className='h-64 w-full rounded-xl' />
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
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <VerificationSection verification={verification.data} />

      <section className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-display text-lg font-bold text-ink-900'>{t('editorTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('editorSubtitle')}</p>
        </div>
        <PublicProfileForm preview={preview.data} />
      </section>

      <WhatSchoolsSeeCard preview={preview.data} />
    </div>
  );
}
