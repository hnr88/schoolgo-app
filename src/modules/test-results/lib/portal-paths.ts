import type { Portal } from '@/lib/portal-url';

export function newStudentPath(portal: Portal): string {
  return portal === 'agent' ? '/dashboard/students/new' : '/parent/students/new';
}
