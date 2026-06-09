import type {
  AcceptedTestEntry,
  RequiredDocumentEntry,
  TemplateData,
} from '@/modules/school-templates';

export interface ExtractedRequirements {
  documents: RequiredDocumentEntry[];
  tests: AcceptedTestEntry[];
}

export function extractRequirements(templateData: TemplateData): ExtractedRequirements {
  const documents: RequiredDocumentEntry[] = [];
  const tests: AcceptedTestEntry[] = [];

  for (const step of templateData.steps) {
    if (step.stepType === 'documents' && step.requiredDocuments) {
      documents.push(...step.requiredDocuments.filter((d) => d.documentType));
    }
    if (step.stepType === 'english_test' && step.acceptedTests) {
      tests.push(...step.acceptedTests.filter((t) => t.testType));
    }
  }

  return { documents, tests };
}

export function fallbackRequirementLabel(value: string): string {
  const words = value.replace(/_/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
