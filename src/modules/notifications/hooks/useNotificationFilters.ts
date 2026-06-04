'use client';

import { useState } from 'react';
import {
  NOTIFICATION_EVENT_FILTER_ALL,
} from '../constants/notification.constants';
import type { NotificationEventType } from '../types/notification.types';

export type NotificationEventFilter =
  | typeof NOTIFICATION_EVENT_FILTER_ALL
  | NotificationEventType;

export function useNotificationFilters() {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [eventFilter, setEventFilter] = useState<NotificationEventFilter>(
    NOTIFICATION_EVENT_FILTER_ALL,
  );

  const eventType =
    eventFilter === NOTIFICATION_EVENT_FILTER_ALL ? undefined : eventFilter;
  const read = unreadOnly ? false : undefined;

  const isFiltered = unreadOnly || eventFilter !== NOTIFICATION_EVENT_FILTER_ALL;

  const resetFilters = () => {
    setUnreadOnly(false);
    setEventFilter(NOTIFICATION_EVENT_FILTER_ALL);
  };

  return {
    unreadOnly,
    setUnreadOnly,
    eventFilter,
    setEventFilter,
    eventType,
    read,
    isFiltered,
    resetFilters,
  };
}
