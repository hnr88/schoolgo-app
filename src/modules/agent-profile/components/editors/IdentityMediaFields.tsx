'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MediaUpload, type UploadedMedia } from '@/modules/forms';
import type { UpdateAgentProfilePayload } from '@/modules/agent-profile/types/agent-profile.types';

type MediaSlot = 'profilePhoto' | 'logo';

interface IdentityMediaFieldsProps {
  existingPhotoUrl: string | null;
  existingCoverUrl: string | null;
  onChange: (media: UpdateAgentProfilePayload) => void;
  disabled?: boolean;
}

/**
 * Logo / cover / photo uploads for the IdentityEditor. Each slot holds the
 * locally uploaded `UploadedMedia` and lifts the numeric relation id into the
 * `media` payload the form merges on save (cover/logo/photo as `coverPhotoUrl`
 * is a string field, so cover upload sets the absolute url; logo + profilePhoto
 * are media relations sent as ids). Existing media is surfaced as a hint url.
 */
export function IdentityMediaFields({
  existingPhotoUrl,
  existingCoverUrl,
  onChange,
  disabled,
}: IdentityMediaFieldsProps) {
  const t = useTranslations('AgentProfileBuilder');
  const [slots, setSlots] = useState<Record<MediaSlot, UploadedMedia | null>>({
    profilePhoto: null,
    logo: null,
  });
  const [cover, setCover] = useState<UploadedMedia | null>(null);

  const setSlot = (slot: MediaSlot, media: UploadedMedia | null) => {
    const next = { ...slots, [slot]: media };
    setSlots(next);
    onChange({
      profilePhoto: next.profilePhoto ? next.profilePhoto.id : undefined,
      logo: next.logo ? next.logo.id : undefined,
      coverPhotoUrl: cover ? cover.url : undefined,
    });
  };

  const setCoverMedia = (media: UploadedMedia | null) => {
    setCover(media);
    onChange({
      profilePhoto: slots.profilePhoto ? slots.profilePhoto.id : undefined,
      logo: slots.logo ? slots.logo.id : undefined,
      coverPhotoUrl: media ? media.url : undefined,
    });
  };

  const messages = {
    invalidType: t('mediaInvalidType'),
    tooLarge: t('mediaTooLarge'),
    uploadFailed: t('mediaUploadFailed'),
    remove: t('mediaRemove'),
  };

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <div className='flex flex-col gap-1.5'>
        <MediaUpload
          accept='image'
          label={t('identityPhotoLabel')}
          value={slots.profilePhoto}
          onChange={(media) => setSlot('profilePhoto', media)}
          messages={messages}
          disabled={disabled}
        />
        {!slots.profilePhoto && existingPhotoUrl && (
          <p className='text-xs text-muted-foreground'>{t('identityMediaExisting')}</p>
        )}
      </div>
      <div className='flex flex-col gap-1.5'>
        <MediaUpload
          accept='image'
          label={t('identityLogoLabel')}
          value={slots.logo}
          onChange={(media) => setSlot('logo', media)}
          messages={messages}
          disabled={disabled}
        />
      </div>
      <div className='flex flex-col gap-1.5'>
        <MediaUpload
          accept='image'
          label={t('identityCoverLabel')}
          value={cover}
          onChange={setCoverMedia}
          messages={messages}
          disabled={disabled}
        />
        {!cover && existingCoverUrl && (
          <p className='text-xs text-muted-foreground'>{t('identityMediaExisting')}</p>
        )}
      </div>
    </div>
  );
}
