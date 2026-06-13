'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmitAssessment } from '@/modules/agent-training/queries/use-submit-assessment.mutation';
import {
  assessmentSubmissionSchema,
  type AssessmentSubmissionValues,
} from '@/modules/agent-training/schemas/assessment-submission.schema';
import type { AssessmentResult } from '@/modules/agent-training/types/agent-training.types';

const DEFAULT_ANSWER_COUNT = 4;

function makeDefaults(count: number): AssessmentSubmissionValues {
  return { answers: Array.from({ length: count }, () => ({ value: 0 })) };
}

/** Owns the answer-index field array, submission, and the graded result. */
export function useAssessmentForm(assessmentDocumentId: string) {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const submitMutation = useSubmitAssessment();

  const form = useForm<AssessmentSubmissionValues>({
    resolver: zodResolver(assessmentSubmissionSchema),
    defaultValues: makeDefaults(DEFAULT_ANSWER_COUNT),
  });

  const fieldArray = useFieldArray({ control: form.control, name: 'answers' });

  async function onSubmit(values: AssessmentSubmissionValues) {
    const graded = await submitMutation.mutateAsync({
      documentId: assessmentDocumentId,
      answers: values.answers.map((a) => a.value),
    });
    setResult(graded);
  }

  function reset() {
    setResult(null);
    form.reset(makeDefaults(fieldArray.fields.length || DEFAULT_ANSWER_COUNT));
  }

  return {
    form,
    fields: fieldArray.fields,
    addAnswer: () => fieldArray.append({ value: 0 }),
    removeAnswer: (index: number) => fieldArray.remove(index),
    onSubmit,
    reset,
    result,
    isSubmitting: submitMutation.isPending,
  };
}
