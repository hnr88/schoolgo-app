import type React from 'react';

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface StatusBadgeProps {
  status: string;
  label: string;
  styles: Record<string, { dot: string; bg: string; text: string }>;
}

/** Canonical semantic status tones (§2.5). */
export type StatusTone =
  | 'neutral'
  | 'in-progress'
  | 'action'
  | 'success'
  | 'urgent';

export interface StatusPillProps {
  tone: StatusTone;
  children: React.ReactNode;
  /** Optional 12px leading icon (status glyph). */
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
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

export interface ListRowProps {
  /** Leading visual: avatar / logo / icon chip (24–32px). */
  leading?: React.ReactNode;
  /** Primary line — title / name. */
  title: React.ReactNode;
  /** Secondary line — meta / subtitle. */
  subtitle?: React.ReactNode;
  /** Trailing slot: status pill, timestamp, chevron, action. */
  trailing?: React.ReactNode;
  /** When set, the whole row becomes one accessible link (locale-aware). */
  href?: string;
  className?: string;
}

export interface DataTableShellProps {
  children: React.ReactNode;
  /** Sticky quiet header (default true). */
  stickyHeader?: boolean;
  className?: string;
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
