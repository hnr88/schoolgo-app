import { Award, RefreshCw, Send } from 'lucide-react';
import { PARENT_TIMELINE_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type { ParentApplication } from '@/modules/applications';
import type {
  ParentTimelineItem,
  ParentTimelineKind,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

const OFFER_STATUSES = new Set(['offer_made', 'offer_accepted']);

const KIND_ICON = {
  submitted: Send,
  statusChanged: RefreshCw,
  offerReceived: Award,
} as const;

const KIND_ICON_CLASS: Record<ParentTimelineKind, string> = {
  submitted: 'bg-babu-50 text-babu-700',
  statusChanged: 'bg-vivid-iris-soft text-vivid-iris',
  offerReceived: 'bg-vivid-mint-soft text-babu-700',
};

function pushEvent(
  events: ParentTimelineItem[],
  app: ParentApplication,
  kind: ParentTimelineKind,
  iso: string | null,
): void {
  if (!iso) return;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return;

  events.push({
    id: `${app.documentId}-${kind}`,
    kind,
    icon: KIND_ICON[kind],
    iconClassName: KIND_ICON_CLASS[kind],
    schoolName: app.school.name,
    studentName: `${app.student.firstName} ${app.student.lastName}`,
    timestamp: iso,
    iso,
    href: `/parent/applications/${app.documentId}`,
  });
}

export function deriveTimeline(applications: ParentApplication[]): ParentTimelineItem[] {
  const events: ParentTimelineItem[] = [];

  for (const app of applications) {
    pushEvent(events, app, 'submitted', app.submittedAt);
    if (OFFER_STATUSES.has(app.status)) {
      pushEvent(events, app, 'offerReceived', app.statusChangedAt ?? app.updatedAt);
    } else if (app.statusChangedAt && app.statusChangedAt !== app.submittedAt) {
      pushEvent(events, app, 'statusChanged', app.statusChangedAt);
    }
  }

  return events
    .sort((a, b) => new Date(b.iso).getTime() - new Date(a.iso).getTime())
    .slice(0, PARENT_TIMELINE_LIMIT);
}
