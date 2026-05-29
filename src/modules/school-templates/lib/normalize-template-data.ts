import type {
  TemplateData,
  TemplateStep,
  TemplateStepType,
} from '@/modules/school-templates/types/school-templates.types';

const VALID_STEP_TYPES: TemplateStepType[] = [
  'english_test',
  'documents',
  'fee',
  'personal_statement',
  'interview',
  'entrance_exam',
  'custom',
];

function isStepType(value: unknown): value is TemplateStepType {
  return typeof value === 'string' && VALID_STEP_TYPES.includes(value as TemplateStepType);
}

function coerceStep(raw: Record<string, unknown>): TemplateStep | null {
  if (!isStepType(raw.stepType)) return null;
  // Stored data may nest fields under `config` (legacy shape) or inline (canonical shape).
  const config = (raw.config && typeof raw.config === 'object'
    ? (raw.config as Record<string, unknown>)
    : {}) as Record<string, unknown>;
  const merged = { ...config, ...raw };

  const step: TemplateStep = { stepType: raw.stepType };
  if (typeof merged.required === 'boolean') step.required = merged.required;

  if (raw.stepType === 'documents' && Array.isArray(merged.requiredDocuments)) {
    step.requiredDocuments = (merged.requiredDocuments as Record<string, unknown>[]).map((d) => ({
      documentType: String(d.documentType ?? ''),
      required: d.required === true,
      ...(typeof d.instructions === 'string' ? { instructions: d.instructions } : {}),
    }));
  }
  if (raw.stepType === 'english_test' && Array.isArray(merged.acceptedTests)) {
    step.acceptedTests = (merged.acceptedTests as Record<string, unknown>[]).map((t) => ({
      testType: String(t.testType ?? ''),
      minimumScore: typeof t.minimumScore === 'number' ? t.minimumScore : null,
    }));
  }
  if (raw.stepType === 'fee') {
    if (typeof merged.amount === 'number') step.amount = merged.amount;
    if (typeof merged.refundable === 'boolean') step.refundable = merged.refundable;
  }
  if (raw.stepType === 'personal_statement' && typeof merged.wordLimit === 'number') {
    step.wordLimit = merged.wordLimit;
  }
  if (raw.stepType === 'custom') {
    if (typeof merged.name === 'string') step.name = merged.name;
    if (typeof merged.instructions === 'string') step.instructions = merged.instructions;
  }
  return step;
}

export function normalizeTemplateData(input: unknown): TemplateData {
  if (!input || typeof input !== 'object') return { steps: [] };
  const td = input as Record<string, unknown>;
  const source = Array.isArray(td.steps)
    ? td.steps
    : Array.isArray(td.preSubmissionSteps)
      ? td.preSubmissionSteps
      : [];

  const steps = (source as unknown[])
    .filter((s): s is Record<string, unknown> => Boolean(s) && typeof s === 'object')
    .map(coerceStep)
    .filter((s): s is TemplateStep => s !== null);

  return { steps };
}
