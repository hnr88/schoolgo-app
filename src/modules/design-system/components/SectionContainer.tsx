import { cn } from '@/lib/utils';
import type { SectionContainerProps } from '@/modules/design-system/types/design-system.types';

export function SectionContainer({
  size = 'marketing',
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 md:px-8',
        size === 'marketing' ? 'max-w-content' : 'max-w-wide',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
