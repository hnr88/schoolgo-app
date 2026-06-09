import type {
  InterviewBuckets,
  InterviewItem,
  InterviewMethod,
  ParentInterviewApplication,
} from '@/modules/parent-interviews/types/parent-interviews.types';

const URL_BEARING_METHODS: ReadonlySet<InterviewMethod> = new Set([
  'skype',
  'zoom',
  'wechat_video',
  'teams',
]);

export function isJoinableLink(
  method: InterviewMethod | null,
  meetingLink: string | null,
): meetingLink is string {
  if (!method || !URL_BEARING_METHODS.has(method)) return false;
  if (!meetingLink) return false;
  return meetingLink.startsWith('https://') || meetingLink.startsWith('http://');
}

export function deriveInterviews(
  applications: ParentInterviewApplication[],
  now: Date,
): InterviewBuckets {
  const items: InterviewItem[] = [];

  for (const app of applications) {
    if (!app.interviewScheduledAt) continue;
    const scheduledMs = new Date(app.interviewScheduledAt).getTime();
    if (Number.isNaN(scheduledMs)) continue;

    items.push({
      applicationDocumentId: app.documentId,
      childName: `${app.student.firstName} ${app.student.lastName}`.trim(),
      schoolName: app.school.name,
      scheduledAt: app.interviewScheduledAt,
      method: app.interviewMethod ?? null,
      meetingLink: app.interviewMeetingLink ?? null,
      outcome: app.interviewOutcome ?? null,
    });
  }

  const nowMs = now.getTime();
  const upcoming = items
    .filter((item) => new Date(item.scheduledAt).getTime() >= nowMs)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  const past = items
    .filter((item) => new Date(item.scheduledAt).getTime() < nowMs)
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());

  return { upcoming, past };
}
