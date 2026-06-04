import { privateApi } from '@/lib/axios';
import type { StrapiUploadResponseItem } from '@/modules/forms/types/media.types';

export async function uploadMessageAttachments(files: File[]): Promise<number[]> {
  const uploads = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append('files', file, file.name);
      const { data } = await privateApi.post<StrapiUploadResponseItem[]>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const id = data?.[0]?.id;
      if (!id) throw new Error('Attachment upload returned an empty response');
      return id;
    }),
  );

  return uploads;
}
