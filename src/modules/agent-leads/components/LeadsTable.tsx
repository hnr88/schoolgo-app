'use client';

import { useTranslations, useFormatter } from 'next-intl';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/modules/core';
import {
  LEAD_STATUS_BADGE_STYLES,
  resolveLeadStatusLabelKey,
} from '@/modules/agent-leads/constants/agent-leads.constants';
import { LeadStatusSelect } from '@/modules/agent-leads/components/LeadStatusSelect';
import type { AgentLead } from '@/modules/agent-leads/types/agent-leads.types';

interface LeadsTableProps {
  leads: AgentLead[];
}

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function LeadsTable({ leads }: LeadsTableProps) {
  const t = useTranslations('AgentLeads');
  const format = useFormatter();

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
            <TableHead className={`pl-5 ${HEAD_CLASS}`}>{t('columnParent')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnContact')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnChildAge')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnSchool')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnMessage')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnReceived')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('columnStatus')}</TableHead>
            <TableHead className={`pr-5 ${HEAD_CLASS}`}>{t('columnUpdate')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.documentId}
              className='border-b border-divider align-top transition-colors hover:bg-muted/60'
              data-testid='lead-row'
            >
              <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>
                {lead.parentName}
              </TableCell>
              <TableCell className='py-3.5 text-sm text-ink-900'>
                <span className='block'>{lead.parentEmail}</span>
                {lead.parentPhone ? (
                  <span className='block text-foggy'>{lead.parentPhone}</span>
                ) : null}
              </TableCell>
              <TableCell className='py-3.5 text-sm text-ink-900'>
                {lead.childAge ?? '—'}
              </TableCell>
              <TableCell className='py-3.5 text-sm text-foggy'>
                {lead.school?.name ?? '—'}
              </TableCell>
              <TableCell className='py-3.5 text-sm text-foggy'>
                <span className='line-clamp-3 max-w-xs'>{lead.message}</span>
              </TableCell>
              <TableCell className='py-3.5 text-sm text-foggy whitespace-nowrap'>
                {format.dateTime(new Date(lead.createdAt), {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell className='py-3.5'>
                <StatusBadge
                  status={lead.status}
                  label={t(resolveLeadStatusLabelKey(lead.status))}
                  styles={LEAD_STATUS_BADGE_STYLES}
                />
              </TableCell>
              <TableCell className='pr-5 py-3.5'>
                <LeadStatusSelect documentId={lead.documentId} status={lead.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
