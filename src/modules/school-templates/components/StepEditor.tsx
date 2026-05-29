'use client';

import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DocumentsEditor } from '@/modules/school-templates/components/DocumentsEditor';
import { TestsEditor } from '@/modules/school-templates/components/TestsEditor';
import type { TemplateStep, TemplateStepError } from '@/modules/school-templates/types/school-templates.types';

interface StepEditorProps {
  step: TemplateStep;
  index: number;
  disabled?: boolean;
  error?: TemplateStepError;
  onChange: (patch: Partial<TemplateStep>) => void;
  onRemove: () => void;
}

export function StepEditor({ step, index, disabled, error, onChange, onRemove }: StepEditorProps) {
  const t = useTranslations('SchoolTemplates');

  return (
    <Card data-testid={`step-${index}`} className='border-border'>
      <CardHeader className='flex flex-row items-center justify-between gap-2 pb-2'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-xs font-medium text-foggy'>{t('stepBadge', { number: index + 1 })}</span>
          <span className='text-base font-semibold text-ink-900'>{t(`stepType_${step.stepType}`)}</span>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <Switch checked={step.required ?? false} disabled={disabled} onCheckedChange={(c) => onChange({ required: c })} aria-label={t('requiredLabel')} />
            <span className='text-xs text-foggy'>{t('requiredLabel')}</span>
          </div>
          {!disabled && (
            <Button type='button' variant='ghost' size='icon' aria-label={t('removeStep')} onClick={onRemove}>
              <Trash2 className='h-4 w-4' />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {step.stepType === 'documents' && (
          <DocumentsEditor documents={step.requiredDocuments ?? []} disabled={disabled} onChange={(d) => onChange({ requiredDocuments: d })} />
        )}
        {step.stepType === 'english_test' && (
          <TestsEditor tests={step.acceptedTests ?? []} disabled={disabled} onChange={(a) => onChange({ acceptedTests: a })} />
        )}
        {step.stepType === 'fee' && (
          <div className='flex flex-col gap-3 sm:flex-row sm:items-end'>
            <div className='flex flex-1 flex-col gap-1'>
              <Label className='text-xs text-foggy'>{t('amountLabel')}</Label>
              <Input type='number' min='0' value={step.amount ?? 0} disabled={disabled} onChange={(e) => onChange({ amount: Number(e.target.value) })} />
            </div>
            <div className='flex items-center gap-2'>
              <Switch checked={step.refundable ?? false} disabled={disabled} onCheckedChange={(c) => onChange({ refundable: c })} aria-label={t('refundableLabel')} />
              <span className='text-xs text-foggy'>{t('refundableLabel')}</span>
            </div>
          </div>
        )}
        {step.stepType === 'personal_statement' && (
          <div className='flex flex-col gap-1'>
            <Label className='text-xs text-foggy'>{t('wordLimitLabel')}</Label>
            <Input type='number' min='1' value={step.wordLimit ?? 500} disabled={disabled} onChange={(e) => onChange({ wordLimit: Number(e.target.value) })} />
          </div>
        )}
        {step.stepType === 'custom' && (
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <Label className='text-xs text-foggy'>{t('customNameLabel')}</Label>
              <Input value={step.name ?? ''} disabled={disabled} placeholder={t('customNamePlaceholder')} onChange={(e) => onChange({ name: e.target.value })} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label className='text-xs text-foggy'>{t('customInstructionsLabel')}</Label>
              <Textarea value={step.instructions ?? ''} disabled={disabled} placeholder={t('customInstructionsPlaceholder')} onChange={(e) => onChange({ instructions: e.target.value })} />
            </div>
          </div>
        )}
        {error && (
          <ul className='list-disc rounded-lg bg-rausch-50 px-6 py-2 text-xs text-rausch-700'>
            {error.errors.map((msg, i) => (<li key={i}>{msg}</li>))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
