'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SchoolOption } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface SchoolStatsSelectProps {
  options: SchoolOption[];
  value: string | undefined;
  onChange: (documentId: string) => void;
}

export function SchoolStatsSelect({ options, value, onChange }: SchoolStatsSelectProps) {
  const t = useTranslations('AgentForecast');

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger className='w-64' aria-label={t('schoolSelectLabel')}>
        <SelectValue placeholder={t('schoolSelectPlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.documentId} value={option.documentId}>
            {option.name ?? t('unnamedSchool')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
