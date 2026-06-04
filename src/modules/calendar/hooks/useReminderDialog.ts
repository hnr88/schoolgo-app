'use client';

import { useState } from 'react';

import type { Reminder } from '@/modules/calendar/types/reminder.types';

interface ReminderDialogState {
  isOpen: boolean;
  reminder: Reminder | null;
  presetDate: Date | null;
}

const CLOSED: ReminderDialogState = { isOpen: false, reminder: null, presetDate: null };

export function useReminderDialog() {
  const [state, setState] = useState<ReminderDialogState>(CLOSED);

  function openCreate(presetDate?: Date) {
    setState({ isOpen: true, reminder: null, presetDate: presetDate ?? null });
  }

  function openEdit(reminder: Reminder) {
    setState({ isOpen: true, reminder, presetDate: null });
  }

  function setOpen(isOpen: boolean) {
    setState((current) => (isOpen ? { ...current, isOpen } : CLOSED));
  }

  return {
    isOpen: state.isOpen,
    reminder: state.reminder,
    presetDate: state.presetDate,
    openCreate,
    openEdit,
    setOpen,
  };
}
