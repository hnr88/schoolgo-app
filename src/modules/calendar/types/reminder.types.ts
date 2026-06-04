export interface Reminder {
  documentId: string;
  title: string;
  remindAt: string;
  note: string | null;
}

export interface RemindersResponse {
  data: Reminder[];
}

export interface ReminderResponse {
  data: Reminder;
}

export interface ReminderPayload {
  title: string;
  remindAt: string;
  note: string | null;
}

export type { ReminderFormValues } from '@/modules/calendar/schemas/reminder.schema';
