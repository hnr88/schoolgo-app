import type { z } from 'zod';
import type {
  assessmentResultSchema,
  certificationSchema,
  courseLevelSchema,
  trainingAssessmentSummarySchema,
  trainingCourseDetailSchema,
  trainingCourseSchema,
  trainingLessonSchema,
} from '@/modules/agent-training/schemas/agent-training.schema';

export type CourseLevel = z.infer<typeof courseLevelSchema>;
export type TrainingCourse = z.infer<typeof trainingCourseSchema>;
export type TrainingCourseDetail = z.infer<typeof trainingCourseDetailSchema>;
export type TrainingLesson = z.infer<typeof trainingLessonSchema>;
export type TrainingAssessmentSummary = z.infer<typeof trainingAssessmentSummarySchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type AssessmentResult = z.infer<typeof assessmentResultSchema>;

export interface SubmitAssessmentPayload {
  documentId: string;
  answers: number[];
}

export type TrainingTier = 'none' | 'foundation' | 'intermediate' | 'advanced';
