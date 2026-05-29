import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { cva } from 'class-variance-authority';

import type {
  EyebrowProps,
  TrustVariant,
} from '@/modules/design-system/types/design-system.types';

export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-rausch-700 text-background shadow-brand hover:bg-rausch-600 active:bg-rausch-700 active:translate-y-px active:shadow-none',
        secondary:
          'border border-border bg-background text-hof hover:bg-muted active:border-quill',
        tertiary:
          'bg-transparent text-hof underline underline-offset-4 decoration-border hover:decoration-hof',
        dark:
          'bg-ink-900 text-primary-foreground hover:bg-ink-900/90 active:bg-ink-900/80',
        trust:
          'bg-babu-700 text-background hover:bg-babu-600 active:bg-babu-700',
        featured:
          'bg-arches-700 text-background hover:bg-arches-700 active:bg-arches-700',
        link: 'px-0 bg-transparent text-rausch-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-sm',
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
  'inline-flex items-center gap-1.5 rounded-pill text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  {
    variants: {
      variant: {
        default: 'border border-transparent bg-muted text-hof hover:bg-ink-200',
        selected: 'border border-rausch-700 bg-rausch-700 text-background shadow-brand',
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
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-pill font-semibold no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-rausch-700 text-background shadow-brand hover:bg-rausch-600 active:bg-rausch-700',
        secondary:
          'border border-border bg-background text-hof hover:bg-muted',
        dark:
          'bg-ink-900 text-primary-foreground hover:bg-ink-900/90 active:bg-ink-900/80',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-sm',
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
  'inline-flex items-center gap-1 rounded-pill text-xs font-semibold tracking-wide',
  {
    variants: {
      tone: {
        brand: 'bg-rausch-50 text-rausch-700',
        trust: 'bg-babu-50 text-babu-700',
        featured: 'bg-arches-50 text-arches-700',
        danger: 'bg-rausch-50 text-rausch-700',
        muted: 'bg-muted text-hof',
        submitted: 'bg-babu-50 text-babu-700',
        underReview: 'bg-vivid-iris-soft text-vivid-iris-strong',
        accepted: 'bg-vivid-mint-soft text-babu-700',
        rejected: 'bg-rausch-50 text-rausch-700',
        enrolled: 'bg-vivid-mint-soft text-babu-700',
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
  brand: 'text-rausch-700',
  trust: 'text-babu-700',
  featured: 'text-arches-700',
};

export const TRUST_BADGE_ICONS: Record<TrustVariant, typeof ShieldCheck> = {
  cricos: ShieldCheck,
  qeac: BadgeCheck,
  claimed: BadgeCheck,
};
