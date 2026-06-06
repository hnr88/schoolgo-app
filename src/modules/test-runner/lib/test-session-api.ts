import { isAxiosError } from 'axios';
import { publicApi } from '@/lib/axios';
import type {
  NextItemInput,
  NextItemResult,
  StartSessionInput,
  SubmitSessionInput,
  SyncResponsesInput,
  TestSession,
  TestSessionError,
} from '@/modules/test-runner/types/test-session.types';

const BASE_URL = '/api/student-test-sessions';

interface SessionEnvelope {
  data: TestSession;
}

interface NextItemEnvelope {
  data: NextItemResult;
}

function authHeaders(jwt: string): Record<string, string> {
  return { Authorization: `Bearer ${jwt}` };
}

export function toTestSessionError(error: unknown): TestSessionError {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      (error.response?.data as { error?: { message?: string } } | undefined)?.error?.message ??
      error.message;

    if (status === 400) return { kind: 'validation', message };
    if (status === 401) return { kind: 'unauthorized', message };
    if (status === 403) return { kind: 'forbidden', message };
    if (status === 404) return { kind: 'notFound', message };
    if (status === 429) return { kind: 'rateLimited', message };
  }
  return {
    kind: 'unavailable',
    message: error instanceof Error ? error.message : 'The test service is unavailable',
  };
}

export async function startSession(jwt: string, input: StartSessionInput): Promise<TestSession> {
  try {
    const { data } = await publicApi.post<SessionEnvelope>(
      `${BASE_URL}/start`,
      { data: { testDocumentId: input.testDocumentId } },
      { headers: authHeaders(jwt) },
    );
    return data.data;
  } catch (error) {
    throw toTestSessionError(error);
  }
}

export async function syncResponses(jwt: string, input: SyncResponsesInput): Promise<TestSession> {
  try {
    const { data } = await publicApi.post<SessionEnvelope>(
      `${BASE_URL}/${input.sessionDocumentId}/responses`,
      { data: { responseState: input.responseState, currentItemIndex: input.currentItemIndex } },
      { headers: authHeaders(jwt) },
    );
    return data.data;
  } catch (error) {
    throw toTestSessionError(error);
  }
}

export async function submitSession(jwt: string, input: SubmitSessionInput): Promise<TestSession> {
  try {
    const { data } = await publicApi.post<SessionEnvelope>(
      `${BASE_URL}/${input.sessionDocumentId}/submit`,
      {},
      { headers: authHeaders(jwt) },
    );
    return data.data;
  } catch (error) {
    throw toTestSessionError(error);
  }
}

export async function requestNextItem(jwt: string, input: NextItemInput): Promise<NextItemResult> {
  try {
    const { data } = await publicApi.post<NextItemEnvelope>(
      `${BASE_URL}/${input.sessionDocumentId}/next-item`,
      { data: input.lastItemId ? { lastItemId: input.lastItemId } : {} },
      { headers: authHeaders(jwt) },
    );
    return data.data;
  } catch (error) {
    throw toTestSessionError(error);
  }
}

export function isTestSessionError(error: unknown): error is TestSessionError {
  return typeof error === 'object' && error !== null && 'kind' in error && 'message' in error;
}
