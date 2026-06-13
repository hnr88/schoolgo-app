'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type {
  FitSortOrder,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitSortButtonProps {
  label: string;
  active: boolean;
  order: FitSortOrder;
  onClick: () => void;
}

export function FitSortButton({ label, active, order, onClick }: FitSortButtonProps) {
  const Icon = !active ? ArrowUpDown : order === 'desc' ? ArrowDown : ArrowUp;
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex items-center gap-1 font-medium hover:text-ink-900'
      aria-pressed={active}
    >
      {label}
      <Icon className='h-3.5 w-3.5' aria-hidden='true' />
    </button>
  );
}
