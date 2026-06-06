export { TestResultsPanel } from '@/modules/test-results/components/TestResultsPanel';
export { TestResultsList } from '@/modules/test-results/components/TestResultsList';
export { TestResultCard } from '@/modules/test-results/components/TestResultCard';
export { TestCatalogPage } from '@/modules/test-results/components/TestCatalogPage';
export { TestCatalogCard } from '@/modules/test-results/components/TestCatalogCard';
export { BookTestDialog } from '@/modules/test-results/components/BookTestDialog';

export { useTestResults } from '@/modules/test-results/queries/use-test-results.query';
export { useTestCatalog } from '@/modules/test-results/queries/use-test-catalog.query';
export { useIssueMagicLink } from '@/modules/test-results/queries/use-issue-magic-link.mutation';
export { useBookTest } from '@/modules/test-results/hooks/useBookTest';

export {
  TEST_TYPE_LABELS,
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
} from '@/modules/test-results/constants/test-results.constants';

export type {
  TestResult,
  TestResultReportDocument,
  TestType,
  VerificationStatus,
  TestResultsResponse,
  UseTestResultsParams,
} from '@/modules/test-results/types/test-result.types';

export type {
  IssueMagicLinkInput,
  IssueMagicLinkResult,
  IssueMagicLinkError,
  IssueMagicLinkErrorKind,
} from '@/modules/test-results/types/issue-magic-link.types';

export type {
  TestCatalogItem,
  TestCatalogMode,
  TestCatalogSkill,
  TestCatalogResponse,
  UseTestCatalogParams,
} from '@/modules/test-results/types/test-catalog.types';
