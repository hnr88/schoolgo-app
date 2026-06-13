import { z } from 'zod';

// Weights are whole-ish numbers in [0, 100]; thresholds are fractions in [0, 1].
// The server enforces the same bounds plus the monotonic safety >= match >= reach
// invariant — we mirror it here so the form blocks an unreachable banding config.
const weightField = z
  .number({ message: 'weightRequired' })
  .min(0, 'weightMin')
  .max(100, 'weightMax');

const thresholdField = z
  .number({ message: 'thresholdRequired' })
  .min(0, 'thresholdMin')
  .max(1, 'thresholdMax');

export const fitConfigFormSchema = z
  .object({
    age: weightField,
    english: weightField,
    gender: weightField,
    documents: weightField,
    quality: weightField,
    curriculum: weightField,
    capacity: weightField,
    reach: thresholdField,
    match: thresholdField,
    safety: thresholdField,
  })
  .refine((v) => v.safety >= v.match && v.match >= v.reach, {
    message: 'thresholdsMonotonic',
    path: ['safety'],
  });

export type FitConfigFormValues = z.infer<typeof fitConfigFormSchema>;
