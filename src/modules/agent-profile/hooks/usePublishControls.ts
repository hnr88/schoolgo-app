'use client';

import { useState } from 'react';
import { useUpdateAgentProfile } from '@/modules/agent-profile/mutations/use-update-agent-profile.mutation';
import type { UploadedMedia } from '@/modules/forms';

/**
 * The publish master switch + profile/cover photo upload controls (Task 098).
 * The toggle persists `publicProfileEnabled` immediately. Photo/cover save as a
 * `profilePhoto` media relation id + `coverPhotoUrl` string; uploaded media is
 * held locally until "Save photos" so a single `updateMe` carries both slots.
 */
export function usePublishControls(enabled: boolean) {
  const mutation = useUpdateAgentProfile();
  const [photo, setPhoto] = useState<UploadedMedia | null>(null);
  const [cover, setCover] = useState<UploadedMedia | null>(null);

  const togglePublish = (next: boolean) => mutation.mutate({ publicProfileEnabled: next });

  const savePhotos = () =>
    mutation.mutate({
      profilePhoto: photo ? photo.id : undefined,
      profilePhotoUrl: photo ? photo.url : undefined,
      coverPhotoUrl: cover ? cover.url : undefined,
    });

  const hasPendingPhotos = photo !== null || cover !== null;

  return {
    isPublished: enabled,
    togglePublish,
    photo,
    setPhoto,
    cover,
    setCover,
    savePhotos,
    hasPendingPhotos,
    isPending: mutation.isPending,
  };
}
