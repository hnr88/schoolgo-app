'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRepeatableSection } from '@/modules/agent-profile/hooks/useRepeatableSection';
import { RepeatableRow } from '@/modules/agent-profile/components/RepeatableRow';
import type { RepeatableSectionProps } from '@/modules/agent-profile/types/repeatable-section.types';

/**
 * Generic repeatable-list editor primitive shared by every per-section editor.
 * Owns add / remove / up-down reorder; defers each row's fields to `renderItem`
 * (render prop). Controlled: it never holds state — `onChange` returns the next
 * array (replace-array semantics, with `order` re-stamped by the logic hook).
 * Reorder uses order buttons (dnd-kit not needed for this scale).
 */
export function RepeatableSection<T>({
  items,
  onChange,
  makeItem,
  renderItem,
  labels,
  maxItems,
  reorderable = true,
  disabled = false,
  className,
}: RepeatableSectionProps<T>) {
  const { rows, canAdd, add, remove, update, move } = useRepeatableSection<T>({
    items,
    onChange,
    makeItem,
    maxItems,
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {rows.length === 0 ? (
        <p className='text-sm text-muted-foreground'>{labels.emptyLabel}</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {rows.map((item, index) => (
            <RepeatableRow
              key={index}
              index={index}
              total={rows.length}
              labels={labels}
              reorderable={reorderable}
              disabled={disabled}
              onRemove={() => remove(index)}
              onMove={(direction) => move(index, direction)}
            >
              {renderItem({
                item,
                index,
                update: (patch) => update(index, patch),
                setField: (key, value) => update(index, { [key]: value } as unknown as Partial<T>),
              })}
            </RepeatableRow>
          ))}
        </div>
      )}

      <Button
        type='button'
        variant='outline'
        size='sm'
        className='self-start gap-1.5'
        disabled={disabled || !canAdd}
        onClick={add}
      >
        <Plus aria-hidden='true' />
        {labels.addLabel}
      </Button>
    </div>
  );
}
