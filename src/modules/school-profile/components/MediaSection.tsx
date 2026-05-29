'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MediaUpload, type UploadedMedia } from '@/modules/forms';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface MediaSectionProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

function toUploaded(media: { id?: number; url: string } | null): UploadedMedia | null {
  if (!media || media.id === undefined) return null;
  return { id: media.id, url: media.url, mime: 'image/*', name: 'image', size: 0 };
}

export function MediaSection({ school, disabled = false }: MediaSectionProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync } = useUpdateSchool(school.documentId);

  const [logo, setLogo] = useState<UploadedMedia | null>(toUploaded(school.logo));
  const [cover, setCover] = useState<UploadedMedia | null>(toUploaded(school.coverImage));

  const messages = {
    invalidType: t('mediaInvalidType'),
    tooLarge: t('mediaTooLarge'),
    uploadFailed: t('mediaUploadFailed'),
    remove: t('mediaRemove'),
  };

  const handleLogo = async (media: UploadedMedia | null) => {
    setLogo(media);
    await mutateAsync({ logo: media?.id ?? null });
  };

  const handleCover = async (media: UploadedMedia | null) => {
    setCover(media);
    await mutateAsync({ coverImage: media?.id ?? null });
  };

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <MediaUpload
        accept='image'
        value={logo}
        onChange={handleLogo}
        label={t('logoLabel')}
        messages={messages}
        disabled={disabled}
      />
      <MediaUpload
        accept='image'
        value={cover}
        onChange={handleCover}
        label={t('coverImageLabel')}
        messages={messages}
        disabled={disabled}
      />
    </div>
  );
}
