import { z } from 'zod';

/**
 * Take-an-assessment form. The training endpoints intentionally withhold the
 * question text/options (they contain the answer key), so the agent submits one
 * selected option index per question. The server grades and enforces the exact
 * question count; this schema only guarantees every answer is a chosen integer.
 */
export const assessmentSubmissionSchema = z.object({
  answers: z
    .array(
      z.object({
        value: z.number().int().min(0),
      }),
    )
    .min(1),
});

export type AssessmentSubmissionValues = z.infer<typeof assessmentSubmissionSchema>;
