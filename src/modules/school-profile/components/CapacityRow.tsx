'use client';

import { useState } from 'react';
import { Check, Loader2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  useDeleteCapacity,
  useUpdateCapacity,
} from '@/modules/school-profile/queries/use-capacity.mutation';
import { numberInputToValue } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolCapacity } from '@/modules/school-profile/types/school-profile.types';

interface CapacityRowProps {
  capacity: SchoolCapacity;
  disabled?: boolean;
}

export function CapacityRow({ capacity, disabled = false }: CapacityRowProps) {
  const t = useTranslations('SchoolProfile');
  const update = useUpdateCapacity();
  const remove = useDeleteCapacity();
  const [places, setPlaces] = useState(String(capacity.totalPlaces ?? 0));
  const [autoWaitlist, setAutoWaitlist] = useState(capacity.autoWaitlist);

  const parsed = numberInputToValue(places);
  const isDirty =
    (parsed !== null && parsed !== (capacity.totalPlaces ?? 0)) ||
    autoWaitlist !== capacity.autoWaitlist;

  return (
    <TableRow>
      <TableCell className='font-medium'>{capacity.yearLevel}</TableCell>
      <TableCell>{capacity.intakePeriod}</TableCell>
      <TableCell>
        <Input
          type='number'
          min={0}
          inputMode='numeric'
          aria-label={t('capacityTotalLabel')}
          disabled={disabled}
          value={places}
          onChange={(e) => setPlaces(e.target.value)}
          className='max-w-28'
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={autoWaitlist}
          disabled={disabled}
          aria-label={t('capacityAutoWaitlistLabel')}
          onCheckedChange={setAutoWaitlist}
        />
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-end gap-2'>
          <Button
            type='button'
            size='sm'
            variant='outline'
            disabled={disabled || !isDirty || update.isPending}
            onClick={() =>
              parsed !== null &&
              update.mutate({ documentId: capacity.documentId, totalPlaces: parsed, autoWaitlist })
            }
          >
            {update.isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
            ) : (
              <Check className='h-4 w-4' aria-hidden='true' />
            )}
            <span className='sr-only'>{t('save')}</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button type='button' size='sm' variant='ghost' />}
              disabled={disabled || remove.isPending}
            >
              <Trash2 className='h-4 w-4' aria-hidden='true' />
              <span className='sr-only'>{t('removeCapacity')}</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('removeCapacityTitle')}</AlertDialogTitle>
                <AlertDialogDescription>{t('removeCapacityDesc')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => remove.mutate(capacity.documentId)}>
                  {t('removeConfirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
