'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STEP_TYPES } from '@/modules/school-templates/lib/template-options';
import type { TemplateStepType } from '@/modules/school-templates/types/school-templates.types';

export function AddStepControl({ onAdd }: { onAdd: (stepType: TemplateStepType) => void }) {
  const t = useTranslations('SchoolTemplates');

  return (
    <div className='flex flex-col gap-1'>
      <Label className='flex items-center gap-1 text-sm font-semibold text-ink-900'>
        <Plus className='h-4 w-4' aria-hidden='true' />
        {t('addStep')}
      </Label>
      <Select value='' onValueChange={(v) => v && onAdd(v as TemplateStepType)}>
        <SelectTrigger className='w-full sm:w-64' data-testid='add-step-trigger'>
          <SelectValue placeholder={t('stepTypeLabel')} />
        </SelectTrigger>
        <SelectContent>
          {STEP_TYPES.map((st) => (
            <SelectItem key={st} value={st}>{t(`stepType_${st}`)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
