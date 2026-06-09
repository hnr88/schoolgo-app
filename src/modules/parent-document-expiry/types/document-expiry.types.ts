import type { StudentDocument } from '@/modules/students/types/document.types';

export type ExpirySource = 'vault' | 'student';

export interface DocumentExpiryItem {
  key: string;
  source: ExpirySource;
  title: string | null;
  documentType: string;
  expiresAt: string | null;
  href: string;
  ownerName: string | null;
}

export interface BucketedExpiryItem extends DocumentExpiryItem {
  expiresAt: string;
  daysUntilExpiry: number;
}

export type ExpiryBucketKey = 'expired' | 'expiringSoon' | 'later';

export interface ExpiryBuckets {
  expired: BucketedExpiryItem[];
  expiringSoon: BucketedExpiryItem[];
  later: BucketedExpiryItem[];
  untrackedCount: number;
}

export type StudentExpiryDocument = Pick<
  StudentDocument,
  'documentId' | 'documentType' | 'fileName' | 'expiresAt' | 'status'
>;

export interface ChildDocumentsResult {
  studentDocumentId: string;
  documents: StudentExpiryDocument[];
}

export interface DocumentExpirySectionProps {
  bucket: ExpiryBucketKey;
  items: BucketedExpiryItem[];
}

export interface DocumentExpiryRowProps {
  item: BucketedExpiryItem;
}

export interface ExpiryCountdownBadgeProps {
  daysUntilExpiry: number;
}
