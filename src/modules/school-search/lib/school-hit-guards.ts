import { APPLICATION_STATUS_LABELS } from '@/modules/applications';
import type { ApplicationStatus } from '@/modules/applications';
import type {
  Accommodation,
  EnrolmentStatus,
  Sector,
} from '@/modules/school-search/types/filter.types';

export function asApplicationStatus(
  value: string | null | undefined,
): ApplicationStatus | null {
  if (value != null && value in APPLICATION_STATUS_LABELS) {
    return value as ApplicationStatus;
  }
  return null;
}

export function asSector(value: string | null | undefined): Sector | null {
  if (value === 'government' || value === 'non-government' || value === 'catholic') {
    return value;
  }
  return null;
}

export function asEnrolmentStatus(
  value: EnrolmentStatus | string | null | undefined,
): EnrolmentStatus | null {
  if (
    value === 'open' ||
    value === 'limited' ||
    value === 'waitlist' ||
    value === 'closed'
  ) {
    return value;
  }
  return null;
}

export function asAccommodation(
  value: Accommodation | string | null | undefined,
): Accommodation | null {
  if (
    value === 'boarding' ||
    value === 'homestay' ||
    value === 'both' ||
    value === 'none'
  ) {
    return value;
  }
  return null;
}
