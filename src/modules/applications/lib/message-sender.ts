import type { MessageThreadSender } from '@/modules/applications/types/detail.types';

export function initialsFromLabel(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function messageSenderInitials(
  sender: MessageThreadSender | null,
  fallbackLabel: string,
): string {
  const first = sender?.firstName?.trim();
  const last = sender?.lastName?.trim();
  if (first || last) {
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase() || initialsFromLabel(fallbackLabel);
  }
  if (sender?.username) return initialsFromLabel(sender.username);
  return initialsFromLabel(fallbackLabel);
}
