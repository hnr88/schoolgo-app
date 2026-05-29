import type { SchoolActionKey } from '@/modules/school-applications/types/school-applications.types';

export interface DialogFieldConfig {
  name: string;
  labelKey: string;
  type: 'text' | 'date' | 'datetime-local' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: { value: string; labelKey: string }[];
}

export const FIELD_DIALOG_CONFIG: Partial<
  Record<
    SchoolActionKey,
    { titleKey: string; fields: DialogFieldConfig[]; transform?: (v: Record<string, string>) => Record<string, unknown> }
  >
> = {
  'schedule-interview': {
    titleKey: 'actionScheduleInterview',
    fields: [
      { name: 'interviewScheduledAt', labelKey: 'interviewScheduledAtLabel', type: 'datetime-local', required: true },
      {
        name: 'interviewMethod',
        labelKey: 'interviewMethodLabel',
        type: 'select',
        required: true,
        // Values MUST match the backend `interviewMethod` enum
        // (skype, zoom, wechat_video, teams, phone, in_person). Only the
        // values with an existing label key are offered here.
        options: [
          { value: 'in_person', labelKey: 'interviewMethod_in_person' },
          { value: 'phone', labelKey: 'interviewMethod_phone' },
        ],
      },
      { name: 'interviewWith', labelKey: 'interviewWithLabel', type: 'text' },
      { name: 'interviewMeetingLink', labelKey: 'interviewMeetingLinkLabel', type: 'text' },
    ],
    transform: (v) => {
      const out: Record<string, unknown> = {
        interviewScheduledAt: new Date(v.interviewScheduledAt).toISOString(),
        interviewMethod: v.interviewMethod,
      };
      if (v.interviewWith) out.interviewWith = v.interviewWith;
      if (v.interviewMeetingLink) out.interviewMeetingLink = v.interviewMeetingLink;
      return out;
    },
  },
  'complete-interview': {
    titleKey: 'actionCompleteInterview',
    fields: [
      {
        name: 'interviewOutcome',
        labelKey: 'interviewOutcomeLabel',
        type: 'select',
        required: true,
        // Values MUST match the backend `interviewOutcome` enum
        // (pending, passed, further_review, not_recommended). The existing
        // `examOutcome_*` label keys carry the correct human-readable text.
        options: [
          { value: 'passed', labelKey: 'examOutcome_passed' },
          { value: 'further_review', labelKey: 'examOutcome_further_review' },
          { value: 'not_recommended', labelKey: 'examOutcome_not_recommended' },
        ],
      },
      { name: 'interviewNotes', labelKey: 'interviewNotesLabel', type: 'textarea' },
    ],
  },
  'request-documents': {
    titleKey: 'actionRequestDocuments',
    fields: [
      { name: 'documentTypes', labelKey: 'documentTypesLabel', type: 'text', required: true },
      { name: 'note', labelKey: 'requestNoteLabel', type: 'textarea' },
    ],
    transform: (v) => {
      const out: Record<string, unknown> = {
        documentTypes: v.documentTypes
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (v.note) out.note = v.note;
      return out;
    },
  },
  'exam-outcome': {
    titleKey: 'actionRecordExamOutcome',
    fields: [
      {
        name: 'examOutcome',
        labelKey: 'examOutcomeLabel',
        type: 'select',
        required: true,
        options: [
          { value: 'passed', labelKey: 'examOutcome_passed' },
          { value: 'further_review', labelKey: 'examOutcome_further_review' },
          { value: 'not_recommended', labelKey: 'examOutcome_not_recommended' },
        ],
      },
      { name: 'examScore', labelKey: 'examScoreLabel', type: 'text' },
      { name: 'examNotes', labelKey: 'examNotesLabel', type: 'textarea' },
    ],
  },
  'issue-coe': {
    titleKey: 'actionIssueCoe',
    fields: [
      { name: 'coeNumber', labelKey: 'coeNumberLabel', type: 'text', required: true },
      { name: 'coeStartDate', labelKey: 'coeStartDateLabel', type: 'date' },
      { name: 'coeEndDate', labelKey: 'coeEndDateLabel', type: 'date' },
    ],
  },
};
