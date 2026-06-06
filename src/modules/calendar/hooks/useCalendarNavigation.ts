'use client';

import { useState } from 'react';

import { addMonths, startOfMonth, startOfToday } from 'date-fns';

export function useCalendarNavigation() {
  const [month, setMonth] = useState<Date>(() => startOfMonth(startOfToday()));
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfToday());

  function goToday() {
    const today = startOfToday();
    setMonth(startOfMonth(today));
    setSelectedDate(today);
  }

  function goPrevMonth() {
    setMonth((current) => addMonths(current, -1));
  }

  function goNextMonth() {
    setMonth((current) => addMonths(current, 1));
  }

  function selectDay(day: Date) {
    setSelectedDate(day);
    setMonth(startOfMonth(day));
  }

  return { month, selectedDate, goToday, goPrevMonth, goNextMonth, selectDay };
}
