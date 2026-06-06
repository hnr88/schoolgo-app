export type ProctoringEventType =
  | 'camera_frame'
  | 'screen_snapshot'
  | 'audio_sample'
  | 'gaze_warning'
  | 'connection_lost'
  | 'client_telemetry';

export type ProctoringSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export type ProctoringMetadata = Record<string, string | number | boolean>;

export interface CaptureEventInput {
  sessionDocumentId: string;
  eventType: ProctoringEventType;
  severity?: ProctoringSeverity;
  metadata?: ProctoringMetadata;
  capturedAt?: string;
}

export interface ProctoringEvent {
  documentId: string;
  eventType: ProctoringEventType;
  severity: ProctoringSeverity;
  capturedAt: string;
  analysisStatus: string;
}

export type CameraPermissionState = 'idle' | 'requesting' | 'granted' | 'denied';
