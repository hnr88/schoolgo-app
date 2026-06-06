export interface TestItem {
  id: string;
  prompt: string;
  options: string[] | null;
  difficulty?: string;
  skill?: string;
}

export interface RunnerTest {
  documentId: string;
  title: string;
  mode: string;
  durationMinutes: number;
  instructions: string | null;
  items: TestItem[];
}

export type SessionStatus = 'in_progress' | 'submitted' | 'completed';

export type ResponseState = Record<string, string>;

export interface PerSkillSummary {
  correct: number;
  total: number;
  percent: number;
}

export interface ScoreSummary {
  totalItems: number;
  attempted: number;
  correct: number;
  rawScore: number;
  maxScore: number;
  percent: number;
  perSkill?: Record<string, PerSkillSummary>;
}

export interface TestSession {
  documentId: string;
  status: SessionStatus;
  mode: string;
  startedAt: string | null;
  submittedAt?: string | null;
  completedAt?: string | null;
  currentItemIndex: number;
  responseState: ResponseState;
  integrityStatus: string;
  proctoringRiskScore: number;
  scoreSummary?: ScoreSummary | null;
  test?: RunnerTest | null;
}

export interface StartSessionInput {
  testDocumentId: string;
}

export interface SyncResponsesInput {
  sessionDocumentId: string;
  responseState: ResponseState;
  currentItemIndex: number;
}

export interface SubmitSessionInput {
  sessionDocumentId: string;
}

export interface NextItemInput {
  sessionDocumentId: string;
  lastItemId?: string;
}

export interface NextItemResult {
  sessionDocumentId: string;
  nextItem: TestItem | null;
  currentItemIndex: number;
  finished: boolean;
}

export type TestSessionErrorKind =
  | 'validation'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'rateLimited'
  | 'unavailable';

export interface TestSessionError {
  kind: TestSessionErrorKind;
  message: string;
}
