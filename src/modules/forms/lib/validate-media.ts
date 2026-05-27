import type { MediaAccept } from '@/modules/forms/types/media.types';

const DEFAULT_MAX_SIZE_MB: Record<MediaAccept, number> = {
  image: 5,
  audio: 10,
};

const MIME_PREFIX: Record<MediaAccept, string> = {
  image: 'image/',
  audio: 'audio/',
};

export function getDefaultMaxSizeMb(accept: MediaAccept): number {
  return DEFAULT_MAX_SIZE_MB[accept];
}

export function isAllowedType(file: File, accept: MediaAccept): boolean {
  return file.type.startsWith(MIME_PREFIX[accept]);
}

export function isWithinSize(file: File, maxSizeMb: number): boolean {
  return file.size <= maxSizeMb * 1024 * 1024;
}
