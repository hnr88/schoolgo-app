import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { cva } from 'class-variance-authority';

import type { EyebrowProps, TrustVariant } from '../types/design-system.types';

export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-brand hover:bg-rausch-600 active:bg-rausch-700 active:translate-y-px active:shadow-none',
        secondary:
          'border border-border bg-white text-hof hover:bg-muted active:border-quill',
        tertiary:
          'bg-transparent text-hof underline underline-offset-4 decoration-border hover:decoration-hof',
        dark:
          'bg-ink-900 text-white hover:bg-ink-900/90 active:bg-ink-900/80',
        trust:
          'bg-babu-500 text-on-primary hover:bg-babu-600 active:bg-babu-700',
        featured:
          'bg-arches-500 text-on-primary hover:bg-arches-600 active:bg-arches-700',
        link: 'px-0 bg-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-[13px]',
        md: 'px-4.5 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export const chipStyles = cva(
  'inline-flex items-center gap-1.5 rounded-pill text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  {
    variants: {
      variant: {
        default: 'border border-border bg-card text-hof hover:bg-muted',
        selected: 'border border-primary bg-primary text-on-primary shadow-brand',
        soft: 'border border-transparent bg-muted text-hof',
      },
      size: {
        sm: 'px-2.5 py-1',
        md: 'px-3.5 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export const ctaLinkStyles = cva(
  'inline-flex items-center gap-2 rounded-pill font-semibold no-underline',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-brand hover:bg-rausch-600 active:bg-rausch-700',
        secondary:
          'border border-border bg-white text-hof hover:bg-muted',
        dark:
          'bg-ink-900 text-white hover:bg-ink-900/90 active:bg-ink-900/80',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-[13px]',
        md: 'px-4.5 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export const statusBadgeStyles = cva(
  'inline-flex items-center gap-1 rounded-pill text-[11px] font-semibold tracking-wide',
  {
    variants: {
      tone: {
        brand: 'bg-rausch-50 text-rausch-700',
        trust: 'bg-babu-50 text-babu-700',
        featured: 'bg-arches-50 text-arches-700',
        danger: 'bg-rausch-50 text-rausch-700',
        muted: 'bg-muted text-hof',
      },
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-2.5 py-1',
      },
    },
    defaultVariants: {
      tone: 'featured',
      size: 'sm',
    },
  },
);

export const TONE_CLASSES: Record<NonNullable<EyebrowProps['tone']>, string> = {
  default: 'text-foggy',
  brand: 'text-primary',
  trust: 'text-babu-700',
  featured: 'text-arches-700',
};

export const TRUST_BADGE_ICONS: Record<TrustVariant, typeof ShieldCheck> = {
  cricos: ShieldCheck,
  qeac: BadgeCheck,
  claimed: BadgeCheck,
};
