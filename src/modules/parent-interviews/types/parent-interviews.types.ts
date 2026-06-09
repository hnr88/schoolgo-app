import type {
  InterviewMethod,
  InterviewOutcome,
  ParentApplication,
} from '@/modules/applications/types/parent-application.types';

export type { InterviewMethod, InterviewOutcome };

export type ParentInterviewApplication = Pick<
  ParentApplication,
  | 'documentId'
  | 'student'
  | 'school'
  | 'interviewScheduledAt'
  | 'interviewMethod'
  | 'interviewMeetingLink'
  | 'interviewOutcome'
>;

export interface InterviewItem {
  applicationDocumentId: string;
  childName: string;
  schoolName: string;
  scheduledAt: string;
  method: InterviewMethod | null;
  meetingLink: string | null;
  outcome: InterviewOutcome | null;
}

export interface InterviewBuckets {
  upcoming: InterviewItem[];
  past: InterviewItem[];
}
