import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeStyles = cva(
  'inline-flex items-center gap-1.5 rounded-pill text-caption font-semibold',
  {
    variants: {
      tone: {
        brand: 'bg-rausch-50 text-primary',
        trust: 'bg-babu-50 text-babu-700',
        featured: 'bg-arches-50 text-arches-700',
        muted: 'bg-muted text-foggy',
      },
      size: {
        sm: 'px-2.5 py-0.5',
        md: 'px-2.5 py-1',
      },
    },
    defaultVariants: {
      tone: 'featured',
      size: 'sm',
    },
  },
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeStyles> {
  children: ReactNode;
  className?: string;
}

export function StatusBadge({
  tone,
  size,
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeStyles({ tone, size }), className)}>
      {children}
    </span>
  );
}
