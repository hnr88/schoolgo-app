'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSchoolApplicationAction } from '@/modules/school-applications/queries/use-school-application-action.mutation';
import type { SchoolActionKey } from '@/modules/school-applications/types/school-applications.types';
import type { DialogFieldConfig } from '@/modules/school-applications/lib/dialog-fields';

interface Props {
  documentId: string;
  action: SchoolActionKey;
  titleKey: string;
  fields: DialogFieldConfig[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transform?: (values: Record<string, string>) => Record<string, unknown>;
}

export function FieldDialog({
  documentId,
  action,
  titleKey,
  fields,
  open,
  onOpenChange,
  transform,
}: Props) {
  const t = useTranslations('SchoolApplications');
  const mutation = useSchoolApplicationAction(documentId, action);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState(false);

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const missing = fields.some((f) => f.required && !values[f.name]?.trim());
    if (missing) {
      setError(true);
      return;
    }
    setError(false);
    const payload = transform
      ? transform(values)
      : Object.fromEntries(Object.entries(values).filter(([, v]) => v !== ''));
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success(t('actionSuccess'));
        onOpenChange(false);
        setValues({});
      },
      onError: () => toast.error(t('actionError')),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(titleKey)}</DialogTitle>
          <DialogDescription>{t('fieldDialogDescription')}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          {fields.map((f) => (
            <div key={f.name} className='flex flex-col gap-2'>
              <Label htmlFor={`fd-${f.name}`}>{t(f.labelKey)}</Label>
              {f.type === 'textarea' ? (
                <Textarea
                  id={`fd-${f.name}`}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setValue(f.name, e.target.value)}
                />
              ) : f.type === 'select' ? (
                <Select value={values[f.name] ?? ''} onValueChange={(v) => setValue(f.name, v ?? '')}>
                  <SelectTrigger id={`fd-${f.name}`}>
                    <SelectValue placeholder={t(f.labelKey)} />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`fd-${f.name}`}
                  type={f.type as 'text' | 'date' | 'datetime-local' | 'number'}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setValue(f.name, e.target.value)}
                />
              )}
            </div>
          ))}
          {error && <p className='text-sm text-rausch-600'>{t('fieldDialogRequired')}</p>}
        </div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            {t('confirmCancel')}
          </Button>
          <Button type='button' onClick={handleSubmit} disabled={mutation.isPending}>
            {t('confirmConfirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
