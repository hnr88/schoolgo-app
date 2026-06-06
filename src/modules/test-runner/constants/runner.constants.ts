export const AUTOSAVE_DEBOUNCE_MS = 1200;
export const TIMER_TICK_MS = 1000;
export const ADAPTIVE_TEST_MODE = 'practice_prep';
export const CAMERA_FRAME_INTERVAL_MS = 30000;
export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
  audio: false,
};
