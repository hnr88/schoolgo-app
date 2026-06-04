'use client';

import { useTranslations } from 'next-intl';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  PARENT_CONTACT_CHANNEL_ICONS,
  PARENT_CONTACT_CHANNEL_OPTIONS,
} from '@/modules/students/constants/parent-wizard.constants';

interface ContactChannelCardsProps {
  value?: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
}

export function ContactChannelCards({
  value,
  onValueChange,
  ariaLabel,
}: ContactChannelCardsProps) {
  const t = useTranslations('StudentWizard');

  return (
    <RadioGroup
      value={value ?? ''}
      onValueChange={onValueChange}
      aria-label={ariaLabel}
      className='grid grid-cols-2 gap-3 sm:grid-cols-4'
    >
      {PARENT_CONTACT_CHANNEL_OPTIONS.map((channel) => {
        const Icon = PARENT_CONTACT_CHANNEL_ICONS[channel];
        return (
          <label
            key={channel}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-background px-4 py-5 text-center text-sm font-medium text-ink-900 transition-colors',
              'hover:bg-muted/40',
              'has-[[data-checked]]:border-primary has-[[data-checked]]:bg-rausch-50 has-[[data-checked]]:text-primary-strong',
              'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
            )}
          >
            <RadioGroupItem value={channel} className='sr-only' />
            <Icon className='size-5' strokeWidth={1.75} aria-hidden='true' />
            {t(`channel_${channel}`)}
          </label>
        );
      })}
    </RadioGroup>
  );
}
