import { cn } from '@/lib/utils';
import type { CurriculumCode } from '@/modules/school-search/types/filter.types';

interface CurriculumBadgeProps {
  codes: readonly CurriculumCode[];
  className?: string;
}

export function CurriculumBadge({ codes, className }: CurriculumBadgeProps) {
  if (codes.length === 0) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill bg-indigo-100 px-1 py-0 text-xs font-medium text-indigo-800',
        className,
      )}
    >
      {codes.join(' / ')}
    </span>
  );
}
