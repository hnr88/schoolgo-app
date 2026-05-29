'use client';

import { useCallback, useState } from 'react';
import type {
  TemplateStep,
  TemplateStepType,
} from '@/modules/school-templates/types/school-templates.types';

function makeStep(stepType: TemplateStepType): TemplateStep {
  switch (stepType) {
    case 'documents':
      return { stepType, required: true, requiredDocuments: [{ documentType: 'passport', required: true }] };
    case 'english_test':
      return { stepType, required: false, acceptedTests: [{ testType: 'ielts', minimumScore: null }] };
    case 'fee':
      return { stepType, required: true, amount: 0, refundable: false };
    case 'personal_statement':
      return { stepType, required: false, wordLimit: 500 };
    case 'custom':
      return { stepType, required: false, name: '', instructions: '' };
    default:
      return { stepType, required: false };
  }
}

export function useTemplateBuilder(initialSteps: TemplateStep[]) {
  const [steps, setSteps] = useState<TemplateStep[]>(initialSteps);

  const addStep = useCallback((stepType: TemplateStepType) => {
    setSteps((prev) => [...prev, makeStep(stepType)]);
  }, []);

  const removeStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateStep = useCallback((index: number, patch: Partial<TemplateStep>) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }, []);

  return { steps, setSteps, addStep, removeStep, updateStep };
}
