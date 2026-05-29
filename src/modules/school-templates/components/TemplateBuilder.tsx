'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StepEditor } from '@/modules/school-templates/components/StepEditor';
import { AddStepControl } from '@/modules/school-templates/components/AddStepControl';
import { ValidationPanel } from '@/modules/school-templates/components/ValidationPanel';
import { useTemplateBuilder } from '@/modules/school-templates/hooks/useTemplateBuilder';
import { useTemplateBuilderActions } from '@/modules/school-templates/hooks/useTemplateBuilderActions';
import type { TemplateStep } from '@/modules/school-templates/types/school-templates.types';

interface TemplateBuilderProps {
  open: boolean;
  readOnly?: boolean;
  existingDraftId: string | null;
  initialSteps: TemplateStep[];
  titleVersion?: number;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function TemplateBuilder({
  open,
  readOnly = false,
  existingDraftId,
  initialSteps,
  titleVersion,
  onOpenChange,
  onSaved,
}: TemplateBuilderProps) {
  const t = useTranslations('SchoolTemplates');
  const { steps, addStep, removeStep, updateStep } = useTemplateBuilder(initialSteps);
  const { validation, validate, save, isValidating, isSaving } = useTemplateBuilderActions({
    existingDraftId,
    onSaved,
  });

  const stepErrorByIndex = new Map(validation?.stepErrors.map((e) => [e.stepIndex, e]) ?? []);

  const dialogTitle = readOnly
    ? t('viewTitle', { version: titleVersion ?? 0 })
    : existingDraftId
      ? t('editDraftTitle')
      : t('newDraftTitle');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-3xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            {dialogTitle}
            {!readOnly && existingDraftId && <Badge variant='secondary'>{t('editingDraftBadge')}</Badge>}
          </DialogTitle>
          <DialogDescription>
            {readOnly ? t('cannotEditPublished') : t('builderTitle')}
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4'>
          {steps.length === 0 && (
            <p className='rounded-lg bg-muted px-4 py-3 text-sm text-foggy'>{t('noStepsHint')}</p>
          )}
          {steps.map((step, index) => (
            <StepEditor
              key={index}
              step={step}
              index={index}
              disabled={readOnly}
              error={stepErrorByIndex.get(index)}
              onChange={(patch) => updateStep(index, patch)}
              onRemove={() => removeStep(index)}
            />
          ))}

          {!readOnly && <AddStepControl onAdd={addStep} />}
          {validation && <ValidationPanel result={validation} />}
        </div>

        {!readOnly && (
          <DialogFooter className='gap-2 sm:gap-2'>
            <Button type='button' variant='outline' disabled={isValidating} onClick={() => validate(steps)} data-testid='validate-button'>
              <CheckCircle2 className='mr-1 h-4 w-4' />{t('validate')}
            </Button>
            <Button type='button' disabled={isSaving || steps.length === 0} onClick={() => save(steps)} data-testid='save-draft-button'>
              <Save className='mr-1 h-4 w-4' />{t('saveDraft')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
