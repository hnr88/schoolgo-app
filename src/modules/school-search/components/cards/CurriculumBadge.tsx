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
        'inline-flex items-center rounded-pill bg-muted px-2 py-0.5 text-caption font-semibold text-foreground ring-1 ring-inset ring-border',
        className,
      )}
    >
      {codes.join(' / ')}
    </span>
  );
}
