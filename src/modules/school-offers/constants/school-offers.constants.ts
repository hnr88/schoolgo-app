import type {
  OfferBucketBadgeVariant,
  OfferDeadlineBucket,
} from '@/modules/school-offers/types/school-offers.types';

export const OFFER_BUCKET_BADGE_VARIANT: Record<OfferDeadlineBucket, OfferBucketBadgeVariant> = {
  expired: 'destructive',
  urgent: 'destructive',
  soon: 'secondary',
  ok: 'outline',
};
