import type { FileRejection } from 'react-dropzone';

export function formatAttachmentSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface AttachmentRejection {
  key: 'attachmentTooLarge' | 'attachmentInvalidType' | 'attachmentTooMany';
  name: string;
}

export function resolveAttachmentRejection(
  rejections: readonly FileRejection[],
): AttachmentRejection | null {
  const rejection = rejections[0];
  if (!rejection) return null;
  const code = rejection.errors[0]?.code;
  const key =
    code === 'file-too-large'
      ? 'attachmentTooLarge'
      : code === 'too-many-files'
        ? 'attachmentTooMany'
        : 'attachmentInvalidType';
  return { key, name: rejection.file.name };
}
