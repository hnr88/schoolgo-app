import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'marketing' | 'wide';
  children: ReactNode;
}

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
