import type { z } from 'zod';
import type {
  coeLifecycleStateSchema,
  expiryBucketSchema,
  passportInfoSchema,
  watchlistFlagsSchema,
  coeEventSummarySchema,
  coeRegisterEntrySchema,
  coeRegisterResponseSchema,
  watchlistResponseSchema,
  watchlistFlagCountsSchema,
  complianceEventSchema,
} from '@/modules/school-compliance/schemas/compliance.schema';
import type { complianceEventFormSchema } from '@/modules/school-compliance/schemas/compliance-event.schema';

export type CoeLifecycleState = z.infer<typeof coeLifecycleStateSchema>;
export type ExpiryBucket = z.infer<typeof expiryBucketSchema>;
export type PassportInfo = z.infer<typeof passportInfoSchema>;
export type WatchlistFlags = z.infer<typeof watchlistFlagsSchema>;
export type WatchlistFlagCounts = z.infer<typeof watchlistFlagCountsSchema>;
export type CoeEventSummary = z.infer<typeof coeEventSummarySchema>;
export type CoeRegisterEntry = z.infer<typeof coeRegisterEntrySchema>;
export type CoeRegisterResponse = z.infer<typeof coeRegisterResponseSchema>;
export type WatchlistResponse = z.infer<typeof watchlistResponseSchema>;
export type ComplianceEvent = z.infer<typeof complianceEventSchema>;
export type ComplianceEventFormValues = z.infer<typeof complianceEventFormSchema>;

export interface CoeRegisterResult {
  entries: CoeRegisterEntry[];
  bucketCounts: Record<string, number>;
  lifecycleCounts: Record<string, number>;
  total: number;
}

export interface WatchlistResult {
  entries: CoeRegisterEntry[];
  flagCounts: WatchlistFlagCounts;
  total: number;
}

export type ComplianceEventType =
  | 'issued'
  | 'started'
  | 'expiring_soon'
  | 'expired'
  | 'caaw_issued'
  | 'breach_flagged';
