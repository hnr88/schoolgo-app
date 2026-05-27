export interface UploadedMedia {
  id: number;
  url: string;
  mime: string;
  name: string;
  size: number;
}

export type MediaAccept = 'image' | 'audio';

export interface StrapiUploadResponseItem {
  id: number;
  url: string;
  mime: string;
  name: string;
  size: number;
}

export interface MediaUploadMessages {
  invalidType: string;
  tooLarge: string;
  uploadFailed: string;
  remove: string;
}

export interface MediaUploadProps {
  accept: MediaAccept;
  value?: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
  label: string;
  messages: MediaUploadMessages;
  maxSizeMb?: number;
  disabled?: boolean;
  className?: string;
}

export interface ImagePreviewProps {
  media: UploadedMedia;
  alt: string;
  onRemove: () => void;
  removeLabel: string;
  disabled?: boolean;
}

export interface AudioPreviewProps {
  media: UploadedMedia;
  onRemove: () => void;
  removeLabel: string;
  disabled?: boolean;
}
