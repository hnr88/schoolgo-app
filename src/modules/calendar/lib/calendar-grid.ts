import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { WEEK_STARTS_ON } from '@/modules/calendar/constants/calendar.constants';

export function getMonthMatrix(month: Date): Date[] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: WEEK_STARTS_ON });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: WEEK_STARTS_ON });
  return eachDayOfInterval({ start, end });
}

export function getWeekdayHeaders(): Date[] {
  const reference = new Date(2024, 0, 1);
  const start = startOfWeek(reference, { weekStartsOn: WEEK_STARTS_ON });
  return eachDayOfInterval({ start, end: endOfWeek(reference, { weekStartsOn: WEEK_STARTS_ON }) });
}
