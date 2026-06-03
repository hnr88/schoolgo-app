export type CalendarEventType =
  | 'tour_booking'
  | 'open_day'
  | 'application_submitted'
  | 'application_status';

export interface CalendarEvent {
  id: string;
  date: string;
  type: CalendarEventType;
  title: string;
  href: string;
  school?: string;
}

export interface CalendarEventStyle {
  icon: import('@/modules/design-system').IconComponent;
  badge: string;
  dot: string;
  labelKey: string;
}

export interface AgendaItemProps {
  event: CalendarEvent;
}

export interface EventTypeBadgeProps {
  type: CalendarEventType;
}

export interface AgendaListProps {
  events: CalendarEvent[];
  selectedDate: Date | undefined;
  onClearFilter: () => void;
}

export interface CalendarMonthProps {
  events: CalendarEvent[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}
