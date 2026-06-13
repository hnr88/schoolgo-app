'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ForecastRow } from '@/modules/agent-pipeline-forecast/components/ForecastRow';
import type { ForecastItem } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface ForecastTableProps {
  items: ForecastItem[];
}

export function ForecastTable({ items }: ForecastTableProps) {
  const t = useTranslations('AgentForecast');

  return (
    <section className='flex flex-col gap-4 rounded-lg border border-divider bg-card p-6 shadow-2'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-base font-semibold text-ink-900'>{t('tableTitle')}</h2>
        <p className='text-sm text-foggy'>{t('tableCaption')}</p>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('colStudent')}</TableHead>
              <TableHead>{t('colSchool')}</TableHead>
              <TableHead>{t('colCurrentStage')}</TableHead>
              <TableHead>{t('colNextStage')}</TableHead>
              <TableHead>{t('colProjected')}</TableHead>
              <TableHead>{t('colRisk')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <ForecastRow key={item.documentId} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
