export { SchoolCompliancePage } from '@/modules/school-compliance/components/SchoolCompliancePage';

export {
  useCoeRegister,
  COE_REGISTER_QUERY_KEY,
} from '@/modules/school-compliance/queries/use-coe-register.query';
export {
  useWatchlist,
  WATCHLIST_QUERY_KEY,
} from '@/modules/school-compliance/queries/use-watchlist.query';

export type {
  CoeRegisterEntry,
  CoeRegisterResult,
  WatchlistResult,
  WatchlistFlags,
  WatchlistFlagCounts,
  CoeLifecycleState,
  ExpiryBucket,
  PassportInfo,
  CoeEventSummary,
  ComplianceEvent,
  ComplianceEventType,
  ComplianceEventFormValues,
} from '@/modules/school-compliance/types/school-compliance.types';
