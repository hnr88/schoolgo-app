import { formatFeeAud, parseFeeAud } from '@/lib/schools/format-fee';
import {
  MIN_SCORES,
  SCHOLARSHIPS_MAP,
  TESTS_MAP,
} from '@/modules/parents-landing/constants/comparison.constants';
import { boardingBedsForSchool } from '@/modules/parents-landing/lib/comparison';
import type { ComparisonRow } from '@/modules/parents-landing/types/parents-comparison.types';
import type { ComparisonSchool } from '@/modules/parents-landing/lib/comparison';

export function buildComparisonRows(t: (key: string) => string): ComparisonRow[] {
  return [
    {
      key: 'fee',
      value: (s: ComparisonSchool) => ({
        text: formatFeeAud(parseFeeAud(s.annualFeeAud)) ?? t('notPublished'),
      }),
    },
    {
      key: 'stateSector',
      value: (s: ComparisonSchool) => ({
        text: `${s.state} \u00B7 ${s.sector || t('notPublished')}`,
      }),
    },
    {
      key: 'curriculum',
      value: (_s: ComparisonSchool, i: number) => ({
        text: ['VCE', 'HSC', 'IB'][i] ?? t('notPublished'),
      }),
    },
    {
      key: 'boarding',
      value: (s: ComparisonSchool) => {
        const val = s.boardingAvailable?.toLowerCase();
        if (val === 'yes' || val?.includes('yes')) {
          return {
            text: `Yes \u00B7 ${boardingBedsForSchool(s)} beds`,
            highlight: true,
          };
        }
        return { text: t('dayOnly'), muted: true };
      },
    },
    {
      key: 'tests',
      value: (s: ComparisonSchool) => ({ text: TESTS_MAP[s.state] ?? 'AEAS' }),
    },
    {
      key: 'minScore',
      value: (s: ComparisonSchool) => ({ text: MIN_SCORES[s.state] ?? '70' }),
    },
    {
      key: 'scholarships',
      value: (s: ComparisonSchool) => {
        const val = SCHOLARSHIPS_MAP[s.state];
        if (val) return { text: val, highlight: true };
        return { text: t('noneIntl'), muted: true };
      },
    },
    {
      key: 'intakes',
      value: (s: ComparisonSchool) => ({
        text: s.intakePeriods || 'Feb \u00B7 Jul',
      }),
    },
  ];
}
