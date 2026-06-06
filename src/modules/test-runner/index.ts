export { TestLanding } from '@/modules/test-runner/components/TestLanding';
export { TestRunnerScreen } from '@/modules/test-runner/components/TestRunnerScreen';
export { ProctoringCapture } from '@/modules/test-runner/components/ProctoringCapture';

export { useStudentSession } from '@/modules/test-runner/queries/use-student-session.query';
export { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
export { useStartSession } from '@/modules/test-runner/queries/use-start-session.mutation';
export { useSyncResponses } from '@/modules/test-runner/queries/use-sync-responses.mutation';
export { useSubmitSession } from '@/modules/test-runner/queries/use-submit-session.mutation';
export { useNextItem } from '@/modules/test-runner/queries/use-next-item.mutation';
export { useCaptureEvent } from '@/modules/test-runner/queries/use-capture-event.mutation';

export {
  verifyMagicLink,
  fetchStudentSession,
  isStudentSessionError,
} from '@/modules/test-runner/lib/student-session';

export type {
  StudentSession,
  StudentSessionStudent,
  StudentSessionError,
  StudentSessionErrorKind,
  StudentTokenPayload,
  VerifyMagicLinkResponse,
} from '@/modules/test-runner/types/student-session.types';

export type {
  TestItem,
  RunnerTest,
  TestSession,
  ScoreSummary,
  ResponseState,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

export type {
  ProctoringEventType,
  ProctoringSeverity,
  ProctoringEvent,
  CaptureEventInput,
  CameraPermissionState,
} from '@/modules/test-runner/types/proctoring.types';
