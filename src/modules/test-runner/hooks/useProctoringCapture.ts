'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCaptureEvent } from '@/modules/test-runner/queries/use-capture-event.mutation';
import {
  buildCameraDeniedMetadata,
  buildCameraFrameMetadata,
  buildClientTelemetry,
} from '@/modules/test-runner/lib/telemetry';
import {
  CAMERA_CONSTRAINTS,
  CAMERA_FRAME_INTERVAL_MS,
} from '@/modules/test-runner/constants/runner.constants';
import type {
  CameraPermissionState,
  CaptureEventInput,
} from '@/modules/test-runner/types/proctoring.types';

interface UseProctoringCaptureArgs {
  sessionDocumentId: string | undefined;
  isActive: boolean;
}

interface UseProctoringCaptureResult {
  permission: CameraPermissionState;
  stream: MediaStream | null;
  deniedMessage: string | null;
  requestCamera: () => void;
}

export function useProctoringCapture({
  sessionDocumentId,
  isActive,
}: UseProctoringCaptureArgs): UseProctoringCaptureResult {
  const captureMutation = useCaptureEvent();
  const capture = captureMutation.mutate;

  const [permission, setPermission] = useState<CameraPermissionState>('idle');
  const [deniedMessage, setDeniedMessage] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const emit = useCallback(
    (input: Omit<CaptureEventInput, 'sessionDocumentId'>) => {
      if (!sessionDocumentId || !isActive) return;
      capture({ sessionDocumentId, ...input });
    },
    [capture, sessionDocumentId, isActive],
  );

  const requestCamera = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setPermission('denied');
      setDeniedMessage('Camera access is not available in this browser');
      emit({ eventType: 'client_telemetry', severity: 'medium', metadata: buildCameraDeniedMetadata('unsupported') });
      return;
    }
    setPermission('requesting');
    navigator.mediaDevices
      .getUserMedia(CAMERA_CONSTRAINTS)
      .then((media) => {
        streamRef.current = media;
        setStream(media);
        setPermission('granted');
        setDeniedMessage(null);
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Camera permission denied';
        setPermission('denied');
        setDeniedMessage(message);
        emit({ eventType: 'client_telemetry', severity: 'medium', metadata: buildCameraDeniedMetadata(message) });
      });
  }, [emit]);

  useEffect(() => {
    if (!isActive) return;
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || permission !== 'granted') return;
    const interval = setInterval(() => {
      const track = streamRef.current?.getVideoTracks()[0] ?? null;
      emit({ eventType: 'camera_frame', severity: 'info', metadata: buildCameraFrameMetadata(track) });
    }, CAMERA_FRAME_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isActive, permission, emit]);

  useEffect(() => {
    if (!isActive || typeof document === 'undefined') return;
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        emit({ eventType: 'client_telemetry', severity: 'high', metadata: buildClientTelemetry('tab_hidden') });
      }
    };
    const handleBlur = () => {
      emit({ eventType: 'client_telemetry', severity: 'low', metadata: buildClientTelemetry('window_blur') });
    };
    const handleOffline = () => {
      emit({ eventType: 'connection_lost', severity: 'high', metadata: buildClientTelemetry('offline') });
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('offline', handleOffline);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isActive, emit]);

  return { permission, stream, deniedMessage, requestCamera };
}
