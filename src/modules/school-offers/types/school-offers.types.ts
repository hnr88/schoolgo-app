import type { z } from 'zod';
import type { schoolOffersListResponseSchema } from '@/modules/school-offers/schemas/school-offers.schema';

export type OfferDeadlineBucket = 'expired' | 'urgent' | 'soon' | 'ok';

export type OfferBucketBadgeVariant = 'destructive' | 'secondary' | 'outline';

export type SchoolOffersListResponse = z.infer<typeof schoolOffersListResponseSchema>;
