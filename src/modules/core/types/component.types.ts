import type React from 'react';

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface StatusBadgeProps {
  status: string;
  label: string;
  styles: Record<string, { dot: string; bg: string; text: string }>;
}

export interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** When true, renders inside a designed dashed-border card with brand-soft icon chip. */
  framed?: boolean;
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  /** When true, renders inside a designed dashed-border card. */
  framed?: boolean;
}

export interface StatTileDelta {
  direction: 'up' | 'down' | 'flat';
  label: string;
}

export interface StatTileProps {
  icon: SvgIcon;
  label: string;
  value: React.ReactNode;
  /** Color classes for the quiet accent icon; any `bg-*` token is ignored (no filled box). */
  iconClassName?: string;
  subMetric?: string;
  delta?: StatTileDelta;
  href?: string;
  isLoading?: boolean;
  className?: string;
}
