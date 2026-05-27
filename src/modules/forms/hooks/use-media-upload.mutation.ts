'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosProgressEvent } from 'axios';
import { privateApi } from '@/lib/axios';
import type {
  StrapiUploadResponseItem,
  UploadedMedia,
} from '@/modules/forms/types/media.types';

export function useMediaUpload() {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (file: File): Promise<UploadedMedia> => {
      setProgress(0);
      const formData = new FormData();
      formData.append('files', file, file.name);

      const { data } = await privateApi.post<StrapiUploadResponseItem[]>(
        '/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (event: AxiosProgressEvent) => {
            if (!event.total) return;
            setProgress(Math.round((event.loaded * 100) / event.total));
          },
        },
      );

      const uploaded = data?.[0];
      if (!uploaded) {
        throw new Error('Upload returned an empty response');
      }
      return {
        id: uploaded.id,
        url: uploaded.url,
        mime: uploaded.mime,
        name: uploaded.name,
        size: uploaded.size,
      };
    },
    onSettled: () => {
      setProgress(0);
    },
  });

  return { ...mutation, progress };
}
