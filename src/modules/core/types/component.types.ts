import type React from 'react';

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
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}
