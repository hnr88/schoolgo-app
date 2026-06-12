'use client';

import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import type { RepeatableSectionLabels } from '@/modules/agent-profile/types/repeatable-section.types';

interface RepeatableRowProps {
  index: number;
  total: number;
  labels: RepeatableSectionLabels;
  reorderable: boolean;
  disabled: boolean;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  children: ReactNode;
}

/** One repeatable row: a framed card with reorder + remove controls. */
export function RepeatableRow({
  index,
  total,
  labels,
  reorderable,
  disabled,
  onRemove,
  onMove,
  children,
}: RepeatableRowProps) {
  return (
    <SurfaceCard padding='md'>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm font-semibold text-foreground'>{labels.rowLabel(index + 1)}</span>
        <div className='flex items-center gap-1'>
          {reorderable && (
            <>
              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                aria-label={labels.moveUpLabel}
                disabled={disabled || index === 0}
                onClick={() => onMove(-1)}
              >
                <ArrowUp aria-hidden='true' />
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                aria-label={labels.moveDownLabel}
                disabled={disabled || index === total - 1}
                onClick={() => onMove(1)}
              >
                <ArrowDown aria-hidden='true' />
              </Button>
            </>
          )}
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            aria-label={labels.removeLabel}
            disabled={disabled}
            onClick={onRemove}
            className='text-destructive hover:text-destructive'
          >
            <Trash2 aria-hidden='true' />
          </Button>
        </div>
      </div>
      <div className='mt-3 flex flex-col gap-3'>{children}</div>
    </SurfaceCard>
  );
}
