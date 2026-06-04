import { CalendarCheck, DoorOpen, RefreshCw, Send } from 'lucide-react';

import type { CalendarEventStyle, CalendarEventType } from '@/modules/calendar/types/calendar.types';

export const MAX_DAY_DOTS = 3;

export const EVENT_STYLE: Record<CalendarEventType, CalendarEventStyle> = {
  tour_booking: {
    icon: CalendarCheck,
    badge: 'bg-vivid-mint-soft text-vivid-mint',
    dot: 'bg-vivid-mint',
    labelKey: 'typeTourBooking',
  },
  open_day: {
    icon: DoorOpen,
    badge: 'bg-vivid-iris-soft text-vivid-iris-strong',
    dot: 'bg-vivid-iris',
    labelKey: 'typeOpenDay',
  },
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
};
