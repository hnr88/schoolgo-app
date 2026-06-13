'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAssessmentForm } from '@/modules/agent-training/hooks/useAssessmentForm';
import { AssessmentResultPanel } from '@/modules/agent-training/components/AssessmentResultPanel';
import { ASSESSMENT_OPTION_INDICES } from '@/modules/agent-training/constants/assessment.constants';

interface AssessmentFormProps {
  assessmentDocumentId: string;
  passMark?: number | null;
}

export function AssessmentForm({ assessmentDocumentId, passMark }: AssessmentFormProps) {
  const t = useTranslations('AgentTraining');
  const { form, fields, addAnswer, removeAnswer, onSubmit, reset, result, isSubmitting } =
    useAssessmentForm(assessmentDocumentId);

  if (result) {
    return <AssessmentResultPanel result={result} onRetake={reset} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <p className='text-sm text-foggy'>
          {t('assessmentInstructions', { passMark: passMark ?? 70 })}
        </p>
        <div className='flex flex-col gap-3'>
          {fields.map((fieldItem, index) => (
            <FormField
              key={fieldItem.id}
              control={form.control}
              name={`answers.${index}.value`}
              render={({ field }) => (
                <FormItem className='flex flex-row items-center gap-3'>
                  <FormLabel className='w-28 shrink-0 text-sm text-ink-900'>
                    {t('questionLabel', { number: index + 1 })}
                  </FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger className='w-32'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ASSESSMENT_OPTION_INDICES.map((optionIndex) => (
                        <SelectItem key={optionIndex} value={String(optionIndex)}>
                          {t('optionLabel', { letter: String.fromCharCode(65 + optionIndex) })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fields.length > 1 ? (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => removeAnswer(index)}
                      aria-label={t('removeQuestion')}
                    >
                      <Trash2 className='h-4 w-4 text-foggy' aria-hidden='true' />
                    </Button>
                  ) : null}
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <Button type='button' variant='outline' size='sm' onClick={addAnswer}>
            <Plus className='mr-1.5 h-4 w-4' aria-hidden='true' />
            {t('addQuestion')}
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
            {t('submitAssessment')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
