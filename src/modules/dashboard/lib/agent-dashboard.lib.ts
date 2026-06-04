import { Activity } from 'lucide-react';
import {
  ACTION_PRIORITY_TONE,
  ACTIVITY_COLOR,
  ACTIVITY_COLOR_FALLBACK,
  ACTIVITY_ICON,
  AGENT_STAT_TILE_CONFIG,
  DEADLINE_TONE,
} from '@/modules/dashboard/constants/agent-dashboard.constants';
import type {
  ActionRowView,
  ActivityRowView,
  AgentActionItem,
  AgentActivityEvent,
  AgentDashboardStats,
  AgentDeadlineItem,
  DeadlineRowView,
  StatCardView,
  StatTileView,
} from '@/modules/dashboard/types/agent-dashboard.types';

const APPLICATIONS_HREF = '/dashboard/applications';
const STUDENTS_HREF = '/dashboard/students';

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

export function formatRelativeTime(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffMs < MS_PER_HOUR) {
    return rtf.format(-Math.max(1, Math.round(diffMs / MS_PER_MINUTE)), 'minute');
  }
  if (diffMs < MS_PER_DAY) {
    return rtf.format(-Math.round(diffMs / MS_PER_HOUR), 'hour');
  }
  if (diffMs < 7 * MS_PER_DAY) {
    return rtf.format(-Math.round(diffMs / MS_PER_DAY), 'day');
  }
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

export function mapStatCards(stats: AgentDashboardStats): StatCardView[] {
  return [
    {
      labelKey: 'activeStudents',
      count: stats.activeStudents.count,
      delta: stats.activeStudents.delta,
      href: STUDENTS_HREF,
    },
    {
      labelKey: 'appsInProgress',
      count: stats.appsInProgress.count,
      delta: stats.appsInProgress.delta,
      href: APPLICATIONS_HREF,
    },
    {
      labelKey: 'offersReceived',
      count: stats.offersReceived.count,
      delta: stats.offersReceived.delta,
      href: APPLICATIONS_HREF,
    },
    {
      labelKey: 'enrolledThisTerm',
      count: stats.enrolledThisTerm.count,
      delta: stats.enrolledThisTerm.delta,
      href: APPLICATIONS_HREF,
    },
  ];
}

export function mapStatTiles(stats: AgentDashboardStats): StatTileView[] {
  const counts: Record<string, { count: number; delta: number; href: string }> = {
    activeStudents: { ...stats.activeStudents, href: STUDENTS_HREF },
    appsInProgress: { ...stats.appsInProgress, href: APPLICATIONS_HREF },
    offersReceived: { ...stats.offersReceived, href: APPLICATIONS_HREF },
    enrolledThisTerm: { ...stats.enrolledThisTerm, href: APPLICATIONS_HREF },
  };

  return AGENT_STAT_TILE_CONFIG.map((config) => {
    const stat = counts[config.labelKey];
    return {
      labelKey: config.labelKey,
      count: stat.count,
      delta: stat.delta,
      href: stat.href,
      icon: config.icon,
      iconClassName: config.iconClassName,
    };
  });
}

export function mapActivityRows(
  events: AgentActivityEvent[],
  locale: string,
): ActivityRowView[] {
  return events.map((event) => {
    const studentName = event.application?.student
      ? `${event.application.student.firstName} ${event.application.student.lastName}`
      : null;
    const schoolName = event.application?.school?.name ?? null;
    const context = [studentName, schoolName].filter(Boolean).join(' · ');
    const text = context ? `${context} — ${event.description}` : event.description;

    return {
      id: event.documentId,
      icon: ACTIVITY_ICON[event.iconHint] ?? Activity,
      colorClass: ACTIVITY_COLOR[event.eventType] ?? ACTIVITY_COLOR_FALLBACK,
      text,
      timestamp: formatRelativeTime(event.createdAt, locale),
      href: event.application
        ? `${APPLICATIONS_HREF}/${event.application.documentId}`
        : APPLICATIONS_HREF,
    };
  });
}

export function mapDeadlineRows(
  items: AgentDeadlineItem[],
  locale: string,
): DeadlineRowView[] {
  return items.map((item, index) => {
    const date = item.date ? new Date(item.date) : null;
    const valid = date && !Number.isNaN(date.getTime());
    const day = valid ? date.toLocaleDateString(locale, { day: 'numeric' }) : '—';
    const month = valid ? date.toLocaleDateString(locale, { month: 'short' }) : '';
    const label = item.studentName ?? item.description;
    const description = item.schoolName ?? '';

    return {
      id: item.applicationDocumentId ?? `${item.type}-${index}`,
      day,
      month,
      toneClass: DEADLINE_TONE[item.urgency] ?? DEADLINE_TONE.grey,
      label,
      description,
      href: item.applicationDocumentId
        ? `${APPLICATIONS_HREF}/${item.applicationDocumentId}`
        : STUDENTS_HREF,
    };
  });
}

export function mapActionRows(items: AgentActionItem[]): ActionRowView[] {
  return items.map((item) => ({
    id: item.id,
    text: item.description,
    priority: item.priority,
    href: item.applicationDocumentId
      ? `${APPLICATIONS_HREF}/${item.applicationDocumentId}`
      : item.studentName
        ? STUDENTS_HREF
        : APPLICATIONS_HREF,
  }));
}

export { ACTION_PRIORITY_TONE };
