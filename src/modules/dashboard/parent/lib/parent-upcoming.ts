import { Gift } from 'lucide-react';
import { PARENT_UPCOMING_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type { ParentApplication } from '@/modules/applications';
import type { ParentUpcomingItem } from '@/modules/dashboard/parent/types/parent-dashboard.types';

const OFFER_ICON_CLASS = 'bg-vivid-mint-soft text-babu-700';

/**
 * Upcoming preview built from real offer deadlines on the parent's applications.
 * Only future-dated, still-actionable offers are surfaced; sorted soonest-first.
 */
export function deriveUpcoming(applications: ParentApplication[]): ParentUpcomingItem[] {
  const now = Date.now();

  return applications
    .filter((app) => app.offerDeadline && app.status === 'offer_made')
    .map((app) => ({ app, time: new Date(app.offerDeadline as string).getTime() }))
    .filter(({ time }) => !Number.isNaN(time) && time >= now)
    .sort((a, b) => a.time - b.time)
    .slice(0, PARENT_UPCOMING_LIMIT)
    .map(
      ({ app }): ParentUpcomingItem => ({
        id: `${app.documentId}-offer`,
        kind: 'offerDeadline',
        icon: Gift,
        iconClassName: OFFER_ICON_CLASS,
        title: app.school.name,
        subtitle: `${app.student.firstName} ${app.student.lastName}`,
        iso: app.offerDeadline as string,
        href: `/parent/applications/${app.documentId}`,
      }),
    );
}
