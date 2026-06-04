import { format, parseISO } from 'date-fns';

import type {
  Reminder,
  ReminderFormValues,
  ReminderPayload,
} from '@/modules/calendar/types/reminder.types';

const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm';
const DEFAULT_TIME = '09:00';

export function getReminderFormDefaults(
  reminder: Reminder | null,
  presetDate: Date | null,
): ReminderFormValues {
  if (reminder) {
    const parsed = parseISO(reminder.remindAt);
    return {
      title: reminder.title,
      date: format(parsed, DATE_FORMAT),
      time: format(parsed, TIME_FORMAT),
      note: reminder.note ?? '',
    };
  }

  const base = presetDate ?? new Date();
  return { title: '', date: format(base, DATE_FORMAT), time: '', note: '' };
}

export function toReminderPayload(values: ReminderFormValues): ReminderPayload {
  const time = values.time && values.time.length > 0 ? values.time : DEFAULT_TIME;
  const remindAt = new Date(`${values.date}T${time}`).toISOString();
  const note = values.note?.trim();
  return {
    title: values.title.trim(),
    remindAt,
    note: note && note.length > 0 ? note : null,
  };
}
