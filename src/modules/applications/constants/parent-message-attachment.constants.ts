export const ACCEPTED_MESSAGE_ATTACHMENT_TYPES: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

export const MAX_MESSAGE_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB

export const MAX_MESSAGE_ATTACHMENT_COUNT = 5;
