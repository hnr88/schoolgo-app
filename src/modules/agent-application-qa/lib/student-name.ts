import type { ReadinessStudentOption } from '@/modules/agent-application-qa/types/readiness.types';

export function studentName(student: ReadinessStudentOption, fallback: string): string {
  const name = [student.firstName, student.lastName].filter(Boolean).join(' ').trim();
  return name || fallback;
}
