'use client';

import { useTranslations, useFormatter } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ManagedTour } from '@/modules/school-tours-manage/types/school-tours-manage.types';

interface ToursTableProps {
  tours: ManagedTour[];
  isAdmin: boolean;
  onEdit: (tour: ManagedTour) => void;
  onDelete: (tour: ManagedTour) => void;
}

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function ToursTable({ tours, isAdmin, onEdit, onDelete }: ToursTableProps) {
  const t = useTranslations('SchoolTours');
  const format = useFormatter();

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
          <TableHead className={`pl-5 ${HEAD_CLASS}`}>{t('columnTitle')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnStartsAt')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnLocation')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnCapacity')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnBookings')}</TableHead>
          {isAdmin && <TableHead className={`pr-5 text-right ${HEAD_CLASS}`}>{t('columnActions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.map((tour) => (
          <TableRow key={tour.documentId} className='border-b border-divider transition-colors hover:bg-muted/60' data-testid='tour-row'>
            <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>{tour.title}</TableCell>
            <TableCell className='py-3.5 text-sm text-ink-900'>
              {format.dateTime(new Date(tour.startsAt), {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </TableCell>
            <TableCell className='py-3.5 text-sm text-foggy'>{tour.location || '—'}</TableCell>
            <TableCell className='py-3.5 text-sm text-ink-900'>{tour.capacity}</TableCell>
            <TableCell className='py-3.5'>
              <Badge variant={tour.bookingsCount > 0 ? 'default' : 'secondary'}>
                {tour.bookingsCount}
              </Badge>
            </TableCell>
            {isAdmin && (
              <TableCell className='pr-5 py-3.5'>
                <div className='flex justify-end gap-2'>
                  <Button size='sm' variant='outline' onClick={() => onEdit(tour)}>
                    <Pencil className='h-4 w-4' />
                    {t('edit')}
                  </Button>
                  <Button size='sm' variant='outline' onClick={() => onDelete(tour)}>
                    <Trash2 className='h-4 w-4' />
                    {t('delete')}
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
