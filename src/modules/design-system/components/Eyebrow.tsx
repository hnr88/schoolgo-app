import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'brand' | 'trust' | 'featured';
  children: ReactNode;
}

const TONE_CLASSES: Record<NonNullable<EyebrowProps['tone']>, string> = {
  default: 'text-foggy',
  brand: 'text-primary',
  trust: 'text-babu-700',
  featured: 'text-arches-700',
};

export function Eyebrow({ tone = 'default', className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        'text-label font-semibold uppercase tracking-[0.08em]',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
