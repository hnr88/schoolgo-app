import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

export interface ProfileCompleteness {
  percent: number;
  completed: number;
  total: number;
  isComplete: boolean;
}

export function getProfileCompleteness(student: ParentStudentDetail): ProfileCompleteness {
  const checks = [
    Boolean(student.photo?.url),
    Boolean(student.voiceIntro?.url),
    Boolean(student.targetEntryTerm),
    Boolean(student.dateOfBirth),
  ];

  const total = checks.length;
  const completed = checks.filter(Boolean).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { percent, completed, total, isComplete: completed === total };
}
