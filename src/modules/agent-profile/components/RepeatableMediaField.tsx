'use client';

import { useTranslations } from 'next-intl';
import { MediaUpload, type UploadedMedia } from '@/modules/forms';

interface RepeatableMediaFieldProps {
  label: string;
  value: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
  disabled?: boolean;
}

/**
 * Per-row image field for repeatable editors. Wraps the shared forms
 * `MediaUpload` (which uploads to `/api/upload` and returns an `UploadedMedia`
 * whose `id` the editor stores as the component's media relation). Keeps the
 * upload UX identical across every repeatable section.
 */
export function RepeatableMediaField({
  label,
  value,
  onChange,
  disabled,
}: RepeatableMediaFieldProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <MediaUpload
      accept='image'
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      messages={{
        invalidType: t('mediaInvalidType'),
        tooLarge: t('mediaTooLarge'),
        uploadFailed: t('mediaUploadFailed'),
        remove: t('mediaRemove'),
      }}
    />
  );
}
