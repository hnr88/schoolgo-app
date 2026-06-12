'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePublishControls } from '@/modules/agent-profile/hooks/usePublishControls';
import { BuilderPhotoUpload } from '@/modules/agent-profile/components/BuilderPhotoUpload';
import type { AgentPublicProfilePreview } from '@/modules/agent-profile/types/agent-profile.types';

interface BuilderHeaderActionsProps {
  preview: AgentPublicProfilePreview;
}

/**
 * Builder publish controls (Task 098): the `publicProfileEnabled` master switch,
 * a "View public page" link to the agent's public profile (only when published
 * with a slug), and profile/cover photo upload with `profilePhotoUrl` fallback.
 */
export function BuilderHeaderActions({ preview }: BuilderHeaderActionsProps) {
  const t = useTranslations('AgentProfileBuilder');
  const controls = usePublishControls(preview.publicProfileEnabled);
  const canView = controls.isPublished && Boolean(preview.slug);

  return (
    <div className='flex flex-col gap-5 border-t border-divider pt-5'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-start gap-3'>
          <Switch
            id='publish-toggle'
            checked={controls.isPublished}
            disabled={controls.isPending}
            onCheckedChange={controls.togglePublish}
            aria-label={t('publishToggleLabel')}
          />
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='publish-toggle' className='text-sm font-medium text-foreground'>
              {t('publishToggleLabel')}
            </Label>
            <p className='text-xs text-muted-foreground'>{t('publishToggleHint')}</p>
          </div>
        </div>

        {canView && preview.slug && (
          <Link href={`/agent/agents/${preview.slug}`} className='shrink-0 no-underline'>
            <Button type='button' variant='outline' size='sm' className='gap-1.5'>
              <ExternalLink className='size-4' aria-hidden='true' />
              {t('viewPublicPage')}
            </Button>
          </Link>
        )}
      </div>

      <BuilderPhotoUpload
        existingPhotoUrl={preview.photoUrl}
        existingCoverUrl={preview.coverPhotoUrl}
        photo={controls.photo}
        cover={controls.cover}
        onPhotoChange={controls.setPhoto}
        onCoverChange={controls.setCover}
        onSave={controls.savePhotos}
        canSave={controls.hasPendingPhotos}
        disabled={controls.isPending}
      />
    </div>
  );
}
