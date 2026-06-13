import { z } from 'zod';

export const COURSE_LEVELS = ['foundation', 'intermediate', 'advanced'] as const;

export const CERTIFICATION_STATUSES = ['in_progress', 'passed', 'expired'] as const;

export const courseLevelSchema = z.enum(COURSE_LEVELS);

export const trainingCourseSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  // Loosened from z.enum: an unknown backend level must not break the catalog.
  level: z.string(),
  description: z.string().nullish(),
  mandatoryFor: z.array(z.string()).nullish(),
  active: z.boolean().optional(),
});

export const trainingCoursesResponseSchema = z.object({
  data: z.array(trainingCourseSchema),
  meta: z.object({}).passthrough(),
});

export const trainingLessonSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  content: z.string().nullish(),
  order: z.number().nullish(),
});

export const trainingAssessmentSummarySchema = z.object({
  documentId: z.string(),
  title: z.string().nullish(),
  passMark: z.number().nullish(),
});

export const trainingCourseDetailSchema = trainingCourseSchema.extend({
  lessons: z.array(trainingLessonSchema),
  assessments: z.array(trainingAssessmentSummarySchema),
});

export const trainingCourseDetailResponseSchema = z.object({
  data: trainingCourseDetailSchema,
  meta: z.object({}).passthrough(),
});

const certificationCourseSchema = z.object({
  documentId: z.string(),
  title: z.string().nullish(),
  level: z.string().nullish(),
});

export const certificationSchema = z.object({
  documentId: z.string(),
  score: z.number().nullish(),
  issuedAt: z.string().nullish(),
  expiresAt: z.string().nullish(),
  status: z.string(),
  active: z.boolean().optional(),
  course: certificationCourseSchema.nullish(),
});

export const certificationsResponseSchema = z.object({
  data: z.array(certificationSchema),
  meta: z.object({}).passthrough(),
});

export const assessmentResultSchema = z.object({
  assessmentDocumentId: z.string(),
  courseDocumentId: z.string(),
  total: z.number(),
  correct: z.number(),
  score: z.number(),
  passMark: z.number(),
  passed: z.boolean(),
  certification: z.object({
    documentId: z.string(),
    status: z.string(),
    score: z.number().nullish(),
    issuedAt: z.string().nullish(),
    expiresAt: z.string().nullish(),
  }),
});

export const assessmentResultResponseSchema = z.object({
  data: assessmentResultSchema,
  meta: z.object({}).passthrough(),
});
