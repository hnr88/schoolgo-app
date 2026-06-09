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
import type { SchoolApplicationListItem } from '@/modules/school-applications';
import { OfferCountdownChip } from '@/modules/school-offers/components/OfferCountdownChip';
import {
  daysUntilDeadline,
  formatDeadline,
  offerDeadlineBucket,
} from '@/modules/school-offers/lib/offer-deadline';

interface Props {
  offers: SchoolApplicationListItem[];
  now: number;
}

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function SchoolOffersTable({ offers, now }: Props) {
  const t = useTranslations('SchoolOffers');

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-divider hover:bg-transparent'>
          <TableHead className={`pl-5 ${HEAD_CLASS}`}>{t('columnStudent')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnYearLevel')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnIntake')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnAgent')}</TableHead>
          <TableHead className={HEAD_CLASS}>{t('columnDeadline')}</TableHead>
          <TableHead className={`pr-5 text-right ${HEAD_CLASS}`}>{t('columnCountdown')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer) => (
          <TableRow key={offer.documentId} className='group h-14 hover:bg-muted'>
            <TableCell className='pl-5 py-3.5'>
              <Link
                href={`/dashboard/applications/${offer.documentId}`}
                className='rounded-md font-semibold text-ink-900 no-underline hover:text-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                {offer.student?.name ?? '—'}
              </Link>
              {offer.student?.nationality && (
                <div className='text-xs text-foggy'>{offer.student.nationality}</div>
              )}
            </TableCell>
            <TableCell className='py-3.5 text-sm text-foggy'>
              {offer.targetYearLevel ?? '—'}
            </TableCell>
            <TableCell className='py-3.5 text-sm text-foggy'>{offer.targetIntake ?? '—'}</TableCell>
            <TableCell className='py-3.5 text-sm text-foggy'>
              {offer.agent?.name ?? offer.agent?.companyName ?? '—'}
            </TableCell>
            <TableCell className='py-3.5 text-sm text-foggy'>
              {formatDeadline(offer.offerDeadline)}
            </TableCell>
            <TableCell className='pr-5 py-3.5 text-right'>
              <OfferCountdownChip
                bucket={offerDeadlineBucket(offer.offerDeadline, now)}
                daysLeft={daysUntilDeadline(offer.offerDeadline, now)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
