import type { Reminder } from '@/modules/calendar/types/reminder.types';

export type CalendarEventType =
  | 'application_submitted'
  | 'application_status'
  | 'deadline'
  | 'offer_deadline'
  | 'reminder';

export interface CalendarEvent {
  id: string;
  date: string;
  type: CalendarEventType;
  title: string;
  href?: string;
  school?: string;
  note?: string | null;
  reminderId?: string;
}

export interface CalendarEventStyle {
  icon: import('@/modules/design-system').IconComponent;
  badge: string;
  dot: string;
  labelKey: string;
}

export interface EventTypeBadgeProps {
  type: CalendarEventType;
}

export interface CalendarEventChipProps {
  event: CalendarEvent;
}

export interface CalendarBoardProps {
  month: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDay: (day: Date) => void;
  onToday: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddReminder: () => void;
}

export interface CalendarDayCellProps {
  day: Date;
  month: Date;
  isSelected: boolean;
  events: CalendarEvent[];
  onSelectDay: (day: Date) => void;
}

export interface DayPanelProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onAddReminder: () => void;
  onEditReminder: (reminder: Reminder) => void;
}

export interface DayAgendaItemProps {
  event: CalendarEvent;
  onEditReminder: (reminder: Reminder) => void;
}
