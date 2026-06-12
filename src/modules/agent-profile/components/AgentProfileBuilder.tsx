'use client';

import { Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SurfaceCard } from '@/modules/core';
import { useAgentPublicProfile } from '@/modules/agent-profile/queries/use-agent-public-profile.query';
import { getNextBestAction } from '@/modules/agent-profile/lib/completeness';
import {
  AGENT_BUILDER_SECTIONS,
  DEFAULT_BUILDER_SECTION,
} from '@/modules/agent-profile/constants/agent-builder.constants';
import { CompletenessRing } from '@/modules/agent-profile/components/CompletenessRing';
import { BuilderHeaderActions } from '@/modules/agent-profile/components/BuilderHeaderActions';
import { BuilderTabContent } from '@/modules/agent-profile/components/BuilderTabContent';
import { VisibilityTab } from '@/modules/agent-profile/components/editors/VisibilityTab';

const VISIBILITY_TAB = 'visibility';

function BuilderSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <SurfaceCard padding='lg'>
        <Skeleton className='h-24 w-full' />
      </SurfaceCard>
      <Skeleton className='h-10 w-full' />
      <SurfaceCard padding='lg'>
        <Skeleton className='h-40 w-full' />
      </SurfaceCard>
    </div>
  );
}

/**
 * Tabbed builder — one tab per editable profile section, each mounting its
 * per-section editor wired to the public-preview query + `updateMe`. The header
 * carries the completeness ring, the `publicProfileEnabled` master switch, the
 * "View public page" link, and profile/cover photo upload.
 */
export function AgentProfileBuilder() {
  const t = useTranslations('AgentProfileBuilder');
  const { data, isLoading, isError, refetch } = useAgentPublicProfile();

  if (isLoading) return <BuilderSkeleton />;

  if (isError || !data) {
    return (
      <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} framed />
    );
  }

  const nextBestAction = getNextBestAction(data);

  return (
    <div className='flex flex-col gap-6'>
      <SurfaceCard padding='lg' className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold text-foreground'>{t('title')}</h2>
          <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
        </div>
        <CompletenessRing completeness={data.completeness} nextBestAction={nextBestAction} />
        <BuilderHeaderActions preview={data} />
      </SurfaceCard>

      <Tabs defaultValue={DEFAULT_BUILDER_SECTION} className='gap-6'>
        <ScrollArea className='w-full'>
          <TabsList className='h-auto flex-wrap justify-start'>
            {AGENT_BUILDER_SECTIONS.map(({ id, labelKey, icon: Icon }) => (
              <TabsTrigger key={id} value={id} className='gap-2 text-foreground/80'>
                <Icon className='size-4' aria-hidden='true' />
                {t(labelKey)}
              </TabsTrigger>
            ))}
            <TabsTrigger value={VISIBILITY_TAB} className='gap-2 text-foreground/80'>
              <Eye className='size-4' aria-hidden='true' />
              {t('visibilityTitle')}
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>

        {AGENT_BUILDER_SECTIONS.map(({ id, labelKey }) => (
          <TabsContent key={id} value={id}>
            <SurfaceCard padding='lg'>
              <BuilderTabContent tabId={id} label={t(labelKey)} preview={data} />
            </SurfaceCard>
          </TabsContent>
        ))}

        <TabsContent value={VISIBILITY_TAB}>
          <SurfaceCard padding='lg'>
            <VisibilityTab visibility={data.visibility} />
          </SurfaceCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
