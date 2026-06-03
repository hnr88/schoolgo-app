import type {
  CompareAttribute,
  CompareLabels,
  SchoolHit,
} from '@/modules/school-comparison/types/comparison.types';

const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-AU');

function humanizeEnum(value: string): string {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatCompareValue(
  attribute: CompareAttribute,
  school: SchoolHit,
  labels: CompareLabels,
): string {
  const raw = school[attribute.key];

  if (attribute.format === 'boolean') {
    return raw ? labels.yes : labels.no;
  }

  if (raw == null || (typeof raw === 'string' && raw.trim() === '')) {
    return labels.empty;
  }

  switch (attribute.format) {
    case 'currency':
      return typeof raw === 'number' ? currencyFormatter.format(raw) : labels.empty;
    case 'number':
      return typeof raw === 'number' ? numberFormatter.format(raw) : labels.empty;
    case 'enum':
      return typeof raw === 'string' ? humanizeEnum(raw) : labels.empty;
    case 'text':
      return typeof raw === 'string' ? raw : labels.empty;
    default:
      return labels.empty;
  }
}
