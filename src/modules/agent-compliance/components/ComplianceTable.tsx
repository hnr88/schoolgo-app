'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ComplianceCellBadge } from '@/modules/agent-compliance/components/ComplianceCellBadge';
import type { ComplianceTableProps } from '@/modules/agent-compliance/types/agent-compliance.types';

export function ComplianceTable({ rows }: ComplianceTableProps) {
  const t = useTranslations('AgentCompliance');

  return (
    <section className='rounded-xl border border-divider bg-card p-6 shadow-1'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('colStudent')}</TableHead>
              <TableHead>{t('colPassport')}</TableHead>
              <TableHead>{t('colVisa')}</TableHead>
              <TableHead>{t('colOshc')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.student.documentId}>
                <TableCell>
                  <Link
                    href={`/dashboard/students/${row.student.documentId}`}
                    className='font-medium text-primary-strong hover:underline'
                  >
                    {row.student.firstName} {row.student.lastName}
                  </Link>
                </TableCell>
                <TableCell>
                  <ComplianceCellBadge cell={row.passport} />
                </TableCell>
                <TableCell>
                  <ComplianceCellBadge cell={row.visa} />
                </TableCell>
                <TableCell>
                  <ComplianceCellBadge cell={row.oshc} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
