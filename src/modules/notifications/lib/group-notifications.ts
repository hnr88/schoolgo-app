import type {
  NotificationTimeGroup,
  ParentNotification,
} from '../types/notification.types';

export function groupByTimeGroup(
  items: ParentNotification[],
): Record<NotificationTimeGroup, ParentNotification[]> {
  const groups: Record<NotificationTimeGroup, ParentNotification[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    older: [],
  };
  for (const item of items) groups[item.timeGroup].push(item);
  return groups;
}
