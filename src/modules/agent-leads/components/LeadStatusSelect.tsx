'use client';

import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LEAD_STATUS_OPTIONS } from '@/modules/agent-leads/constants/agent-leads.constants';
import { useUpdateLeadStatus } from '@/modules/agent-leads/queries/use-update-lead-status.mutation';
import type { LeadStatus } from '@/modules/agent-leads/types/agent-leads.types';

interface LeadStatusSelectProps {
  documentId: string;
  status: string;
}

export function LeadStatusSelect({ documentId, status }: LeadStatusSelectProps) {
  const t = useTranslations('AgentLeads');
  const mutation = useUpdateLeadStatus();

  return (
    <Select
      value={status}
      disabled={mutation.isPending}
      onValueChange={(value) => mutation.mutate({ documentId, status: value as LeadStatus })}
    >
      <SelectTrigger className='w-40' aria-label={t('statusLabel')}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUS_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {t(`status_${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
