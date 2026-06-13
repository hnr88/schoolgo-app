import { format, isValid, parseISO } from 'date-fns';

export function formatQuestionDate(value: string | null | undefined): string {
  if (!value) return '';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return '';
  return format(parsed, 'd MMM yyyy');
}
