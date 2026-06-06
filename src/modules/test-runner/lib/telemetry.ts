import { publicApi } from '@/lib/axios';
import { toTestSessionError } from '@/modules/test-runner/lib/test-session-api';
import type {
  CaptureEventInput,
  ProctoringEvent,
  ProctoringMetadata,
} from '@/modules/test-runner/types/proctoring.types';

const BASE_URL = '/api/student-test-sessions';

interface ProctoringEventEnvelope {
  data: ProctoringEvent;
}

function authHeaders(jwt: string): Record<string, string> {
  return { Authorization: `Bearer ${jwt}` };
}

export async function captureProctoringEvent(
  jwt: string,
  input: CaptureEventInput,
): Promise<ProctoringEvent> {
  try {
    const { data } = await publicApi.post<ProctoringEventEnvelope>(
      `${BASE_URL}/${input.sessionDocumentId}/proctoring-events`,
      {
        data: {
          eventType: input.eventType,
          severity: input.severity ?? 'info',
          metadata: input.metadata ?? {},
          capturedAt: input.capturedAt ?? new Date().toISOString(),
        },
      },
      { headers: authHeaders(jwt) },
    );
    return data.data;
  } catch (error) {
    throw toTestSessionError(error);
  }
}

export function buildClientTelemetry(reason: string): ProctoringMetadata {
  return {
    reason,
    visibilityState: typeof document !== 'undefined' ? document.visibilityState : 'unknown',
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };
}

export function buildCameraFrameMetadata(track: MediaStreamTrack | null): ProctoringMetadata {
  const settings = track?.getSettings();
  return {
    cameraActive: track?.readyState === 'live',
    width: settings?.width ?? 0,
    height: settings?.height ?? 0,
    frameRate: settings?.frameRate ?? 0,
  };
}

export function buildCameraDeniedMetadata(message: string): ProctoringMetadata {
  return { cameraGranted: false, reason: message };
}
