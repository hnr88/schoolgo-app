import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export function createFaqsSchema(t: SchemaTranslator) {
  return z.object({
    faqs: z.array(
      z.object({
        question: z
          .string()
          .trim()
          .min(1, { message: t('faqsQuestionRequired') })
          .max(300, { message: t('faqsQuestionMax') }),
        answer: z
          .string()
          .trim()
          .min(1, { message: t('faqsAnswerRequired') })
          .max(2000, { message: t('faqsAnswerMax') }),
        topicTag: z
          .string()
          .trim()
          .max(60, { message: t('faqsTopicTagMax') })
          .optional(),
      }),
    ),
  });
}

export type FaqsValues = z.infer<ReturnType<typeof createFaqsSchema>>;
export type FaqDraft = FaqsValues['faqs'][number];
