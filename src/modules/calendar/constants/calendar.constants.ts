import { AlarmClock, CalendarClock, RefreshCw, Send } from 'lucide-react';

import type { CalendarEventStyle, CalendarEventType } from '@/modules/calendar/types/calendar.types';

export const MAX_CELL_EVENTS = 3;

export const WEEK_STARTS_ON = 1;

export const EVENT_STYLE: Record<CalendarEventType, CalendarEventStyle> = {
  application_submitted: {
    icon: Send,
    badge: 'bg-vivid-coral-soft text-vivid-coral-strong',
    dot: 'bg-vivid-coral',
    labelKey: 'typeApplicationSubmitted',
  },
  application_status: {
    icon: RefreshCw,
    badge: 'bg-vivid-amber-soft text-arches-700',
    dot: 'bg-vivid-amber',
    labelKey: 'typeApplicationStatus',
  },
  offer_deadline: {
    icon: CalendarClock,
    badge: 'bg-rausch-50 text-rausch-700',
    dot: 'bg-rausch-500',
    labelKey: 'typeOfferDeadline',
  },
  reminder: {
    icon: AlarmClock,
    badge: 'bg-vivid-iris-soft text-vivid-iris-strong',
    dot: 'bg-vivid-iris',
    labelKey: 'typeReminder',
  },
};
