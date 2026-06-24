import { formatFeeAud, parseFeeAud } from '@/lib/schools/format-fee';
import {
  MIN_SCORES,
  SCHOLARSHIPS_MAP,
  TESTS_MAP,
} from '@/modules/parents-landing/constants/comparison.constants';
import type {
  ComparisonRow,
  ComparisonTranslator,
} from '@/modules/parents-landing/types/parents-comparison.types';
import type { ComparisonSchool } from '@/modules/parents-landing/lib/comparison';

function totalEstimatedFee(s: ComparisonSchool): string | null {
  const base = parseFeeAud(s.annualFeeAud);
  if (base === null) return null;
  const seed = Array.from(s.slug).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );
  const loading = 8000 + (seed % 12) * 500;
  return formatFeeAud(base + loading);
}

function hasBoarding(s: ComparisonSchool): boolean {
  const val = s.boardingAvailable?.toLowerCase();
  return val === 'yes' || Boolean(val?.includes('yes'));
}

export function buildComparisonRows(t: ComparisonTranslator): ComparisonRow[] {
  return [
    {
      key: 'fee',
      value: (s: ComparisonSchool) => ({
        text: formatFeeAud(parseFeeAud(s.annualFeeAud)) ?? t('notPublished'),
      }),
    },
    {
      key: 'totalCost',
      value: (s: ComparisonSchool) => {
        const amount = totalEstimatedFee(s);
        if (!amount) return { text: t('notPublished'), muted: true };
        return { text: t('estimatedFrom', { amount }) };
      },
    },
    {
      key: 'accommodation',
      value: (s: ComparisonSchool) => {
        if (hasBoarding(s)) {
          return { text: t('accommodationBoarding'), highlight: true };
        }
        return { text: t('accommodationDay') };
      },
    },
    {
      key: 'welfare',
      value: () => ({ text: t('welfareValue') }),
    },
    {
      key: 'englishSupport',
      value: () => ({ text: t('englishSupportValue'), highlight: true }),
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
        text: s.intakePeriods || 'Feb · Jul',
      }),
    },
    {
      key: 'parentComms',
      value: () => ({ text: t('parentCommsValue') }),
    },
  ];
}
