'use client';

import { useState } from 'react';
import { Check, Loader2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  useDeleteTuition,
  useUpdateTuition,
} from '@/modules/school-profile/queries/use-tuition.mutation';
import { numberInputToValue } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolTuition } from '@/modules/school-profile/types/school-profile.types';

interface TuitionRowProps {
  tuition: SchoolTuition;
  disabled?: boolean;
}

export function TuitionRow({ tuition, disabled = false }: TuitionRowProps) {
  const t = useTranslations('SchoolProfile');
  const update = useUpdateTuition();
  const remove = useDeleteTuition();
  const [amount, setAmount] = useState(String(tuition.annualAmountAud));

  const levelLabel = t(
    `level${tuition.level.charAt(0).toUpperCase()}${tuition.level.slice(1)}`,
  );
  const parsed = numberInputToValue(amount);
  const isDirty = parsed !== null && parsed !== tuition.annualAmountAud;

  return (
    <TableRow>
      <TableCell className='font-medium'>{levelLabel}</TableCell>
      <TableCell>
        <Input
          type='number'
          min={0}
          inputMode='numeric'
          aria-label={t('tuitionAmountLabel')}
          disabled={disabled}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='max-w-40'
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
              update.mutate({ documentId: tuition.documentId, annualAmountAud: parsed })
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
              <span className='sr-only'>{t('removeTuition')}</span>
            </AlertDialogTrigger>
            <AlertDialogContent className='sm:max-w-2xl'>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('removeTuitionTitle')}</AlertDialogTitle>
                <AlertDialogDescription>{t('removeTuitionDesc')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => remove.mutate(tuition.documentId)}>
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
