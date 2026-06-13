import { z } from 'zod';
import { QUESTION_BODY_MAX, ANSWER_BODY_MAX } from '@/modules/parent-ask-school/constants/ask-school.constants';

export const questionTopicSchema = z.enum([
  'admissions',
  'fees',
  'boarding',
  'curriculum',
  'eal',
  'visa',
  'other',
]);

export const questionStatusSchema = z.enum(['pending', 'answered', 'published', 'declined']);

export const questionAnswerSchema = z.object({
  documentId: z.string(),
  body: z.string(),
  answeredAt: z.string().nullable(),
});

const questionSchoolSchema = z.object({
  documentId: z.string(),
  name: z.string().nullable(),
  slug: z.string().nullable(),
});

const questionAskerSchema = z.object({
  documentId: z.string(),
  name: z.string().nullable(),
});

export const parentQuestionSchema = z.object({
  documentId: z.string(),
  body: z.string(),
  topic: questionTopicSchema,
  status: questionStatusSchema,
  isPublic: z.boolean(),
  askedAt: z.string(),
  school: questionSchoolSchema.nullable(),
  answer: questionAnswerSchema.nullable(),
});

export const schoolQuestionSchema = z.object({
  documentId: z.string(),
  body: z.string(),
  topic: questionTopicSchema,
  status: questionStatusSchema,
  isPublic: z.boolean(),
  askedAt: z.string(),
  askedBy: questionAskerSchema.nullable(),
  answer: questionAnswerSchema.nullable(),
});

export const parentQuestionsResponseSchema = z.object({
  data: z.array(parentQuestionSchema),
});

export const schoolQuestionsResponseSchema = z.object({
  data: z.array(schoolQuestionSchema),
});

export const askSchoolFormSchema = z.object({
  schoolDocumentId: z.string().min(1),
  schoolName: z.string().min(1),
  topic: questionTopicSchema,
  body: z.string().trim().min(1).max(QUESTION_BODY_MAX),
});

export const askAboutSchoolFormSchema = z.object({
  topic: questionTopicSchema,
  body: z.string().trim().min(1).max(QUESTION_BODY_MAX),
});

export const answerQuestionFormSchema = z.object({
  body: z.string().trim().min(1).max(ANSWER_BODY_MAX),
  publish: z.boolean(),
});
