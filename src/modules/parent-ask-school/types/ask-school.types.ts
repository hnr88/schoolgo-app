import type { z } from 'zod';
import type {
  askSchoolFormSchema,
  answerQuestionFormSchema,
  questionTopicSchema,
  questionStatusSchema,
  parentQuestionSchema,
  schoolQuestionSchema,
  questionAnswerSchema,
} from '@/modules/parent-ask-school/schemas/ask-school.schema';

export type QuestionTopic = z.infer<typeof questionTopicSchema>;
export type QuestionStatus = z.infer<typeof questionStatusSchema>;
export type QuestionAnswer = z.infer<typeof questionAnswerSchema>;
export type ParentQuestion = z.infer<typeof parentQuestionSchema>;
export type SchoolQuestion = z.infer<typeof schoolQuestionSchema>;

export type AskSchoolFormValues = z.infer<typeof askSchoolFormSchema>;
export type AnswerQuestionFormValues = z.infer<typeof answerQuestionFormSchema>;

export interface AskQuestionPayload {
  schoolDocumentId: string;
  topic: QuestionTopic;
  body: string;
}

export interface AnswerQuestionPayload {
  questionDocumentId: string;
  body: string;
  publish: boolean;
}
