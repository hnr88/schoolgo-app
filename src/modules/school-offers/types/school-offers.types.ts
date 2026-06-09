import type { SchoolApplicationListItem } from '@/modules/school-applications';

export type OfferDeadlineBucket = 'expired' | 'urgent' | 'soon' | 'ok';

export type OfferBucketBadgeVariant = 'destructive' | 'secondary' | 'outline';

export interface SchoolOffersListResponse {
  data: SchoolApplicationListItem[];
}
