import type {
  SchoolActivityEvent,
  SchoolActivityRowView,
  SchoolDashboardData,
  SchoolDashboardSummary,
  SchoolOnboardingState,
  SchoolOnboardingStepView,
  SchoolStatCardView,
} from '@/modules/school-dashboard/types/school-dashboard.types';

const APPLICATIONS_HREF = '/dashboard/applications';

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

export function mapStatCards(summary: SchoolDashboardSummary): SchoolStatCardView[] {
  return [
    {
      labelKey: 'cardNewApplications',
      count: summary.unacknowledged,
      href: `${APPLICATIONS_HREF}?status=submitted`,
    },
    {
      labelKey: 'cardUnderReview',
      count: summary.inReview,
      href: `${APPLICATIONS_HREF}?status=under_review`,
    },
    {
      labelKey: 'cardOffersMade',
      count: summary.offersOutstanding,
      href: `${APPLICATIONS_HREF}?status=offer_made`,
    },
    {
      labelKey: 'cardEnrolledThisTerm',
      count: summary.enrolledThisYear,
      href: `${APPLICATIONS_HREF}?status=enrolled`,
    },
  ];
}

function activityHref(event: SchoolActivityEvent): string {
  return event.applicationDocumentId
    ? `${APPLICATIONS_HREF}/${event.applicationDocumentId}`
    : APPLICATIONS_HREF;
}

export function mapActivityRows(
  events: SchoolActivityEvent[],
  locale: string,
): SchoolActivityRowView[] {
  return events.map((event, index) => ({
    id: `${event.createdAt}-${index}`,
    text: event.studentName
      ? `${event.studentName} — ${event.description}`
      : event.description,
    timestamp: formatRelativeTime(event.createdAt, locale),
    href: activityHref(event),
  }));
}

export function mapOnboardingSteps(
  state: SchoolOnboardingState,
): SchoolOnboardingStepView[] {
  return [
    { labelKey: 'onboardingStepProfile', done: state.step1_profile_reviewed },
    { labelKey: 'onboardingStepApplications', done: state.step2_applications_viewed },
    { labelKey: 'onboardingStepTemplate', done: state.step3_template_configured },
  ];
}

export function countCompletedSteps(steps: SchoolOnboardingStepView[]): number {
  return steps.filter((step) => step.done).length;
}

export function isOnboardingComplete(state: SchoolOnboardingState): boolean {
  return (
    state.step1_profile_reviewed
    && state.step2_applications_viewed
    && state.step3_template_configured
  );
}

export function staffDisplayName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  fallback: string,
): string {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return name.length > 0 ? name : fallback;
}

export function hasActionRequired(dashboard: SchoolDashboardData): boolean {
  return (
    dashboard.actionRequired.newApplications > 0
    || dashboard.actionRequired.expiringOffers > 0
  );
}
