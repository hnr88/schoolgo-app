'use client';

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import {
  TableHead,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type SortDirection = 'asc' | 'desc';

export interface DataTableSortHeaderProps {
  field: string;
  activeField: string | null;
  direction: SortDirection;
  onSort: (field: string) => void;
  label: string;
  className?: string;
}

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: string;
  activeField: string | null;
  direction: SortDirection;
}) {
  if (activeField !== field) return <ArrowUpDown className='ml-1 h-3 w-3 text-quill' />;
  if (direction === 'asc') return <ArrowUp className='ml-1 h-3 w-3 text-primary' />;
  return <ArrowDown className='ml-1 h-3 w-3 text-primary' />;
}

export function DataTableSortHeader({
  field,
  activeField,
  direction,
  onSort,
  label,
  className,
}: DataTableSortHeaderProps) {
  const isActive = activeField === field;

  return (
    <TableHead
      className={cn(
        'text-xs font-semibold uppercase tracking-wider text-foggy select-none',
        className,
      )}
      aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type='button'
        className='inline-flex items-center rounded-sm text-left hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        onClick={() => onSort(field)}
      >
        {label}
        <SortIcon field={field} activeField={activeField} direction={direction} />
      </button>
    </TableHead>
  );
}
