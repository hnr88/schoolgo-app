'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type { PerformanceSortDirection } from '@/modules/school-agent-performance/types/agent-performance.types';

interface SortHeaderButtonProps {
  label: string;
  active: boolean;
  direction: PerformanceSortDirection;
  onClick: () => void;
}

export function SortHeaderButton({ label, active, direction, onClick }: SortHeaderButtonProps) {
  const Icon = !active ? ArrowUpDown : direction === 'desc' ? ArrowDown : ArrowUp;
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
