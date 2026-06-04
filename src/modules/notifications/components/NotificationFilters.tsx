'use client';

import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NOTIFICATION_EVENT_FILTER_ALL,
  NOTIFICATION_EVENT_FILTER_OPTIONS,
} from '../constants/notification.constants';
import type { NotificationEventFilter } from '../hooks/useNotificationFilters';

interface NotificationFiltersProps {
  unreadOnly: boolean;
  onUnreadOnlyChange: (value: boolean) => void;
  eventFilter: NotificationEventFilter;
  onEventFilterChange: (value: NotificationEventFilter) => void;
}

export function NotificationFilters({
  unreadOnly,
  onUnreadOnlyChange,
  eventFilter,
  onEventFilterChange,
}: NotificationFiltersProps) {
  const t = useTranslations('ParentNotifications');

  const labelFor = (value: NotificationEventFilter): string =>
    value === NOTIFICATION_EVENT_FILTER_ALL
      ? t('filterEventAll')
      : t(`eventType_${value}`);

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <label className='flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-ink-900'>
        <Switch
          checked={unreadOnly}
          onCheckedChange={onUnreadOnlyChange}
          aria-label={t('filterUnreadOnly')}
        />
        {t('filterUnreadOnly')}
      </label>

      <Select
        value={eventFilter}
        onValueChange={(value) =>
          onEventFilterChange(value as NotificationEventFilter)
        }
      >
        <SelectTrigger className='h-11 w-full sm:w-64' aria-label={t('filterEventLabel')}>
          <SelectValue>
            {(value: NotificationEventFilter | null) =>
              value ? labelFor(value) : t('filterEventAll')
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={NOTIFICATION_EVENT_FILTER_ALL}>
            {t('filterEventAll')}
          </SelectItem>
          {NOTIFICATION_EVENT_FILTER_OPTIONS.map((eventType) => (
            <SelectItem key={eventType} value={eventType}>
              {t(`eventType_${eventType}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
