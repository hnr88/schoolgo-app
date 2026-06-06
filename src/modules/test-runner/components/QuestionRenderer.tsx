'use client';

import { useTranslations } from 'next-intl';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { TestItem } from '@/modules/test-runner/types/test-session.types';

interface QuestionRendererProps {
  item: TestItem;
  index: number;
  total: number;
  value: string;
  onChange: (value: string) => void;
}

export function QuestionRenderer({ item, index, total, value, onChange }: QuestionRendererProps) {
  const t = useTranslations('TestRunner');
  const hasOptions = Array.isArray(item.options) && item.options.length > 0;
  const band = item.difficulty?.trim();

  return (
    <fieldset className='flex flex-col gap-4'>
      <legend className='flex flex-col gap-1'>
        <span className='flex flex-wrap items-center gap-2'>
          <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t('runner.questionCounter', { current: index + 1, total })}
          </span>
          {band ? (
            <Badge variant='outline' className='text-xs font-medium'>
              {t('runner.difficultyLabel', { band })}
            </Badge>
          ) : null}
        </span>
        <span className='text-base font-medium text-ink-900'>{item.prompt}</span>
      </legend>

      {hasOptions ? (
        <RadioGroup value={value} onValueChange={(next) => onChange(String(next))} className='gap-3'>
          {item.options?.map((option) => {
            const optionId = `${item.id}-${option}`;
            return (
              <div key={optionId} className='flex items-center gap-3'>
                <RadioGroupItem value={option} id={optionId} />
                <Label htmlFor={optionId} className='font-normal'>
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      ) : (
        <div className='flex flex-col gap-2'>
          <Label htmlFor={`${item.id}-answer`}>{t('runner.freeTextLabel')}</Label>
          <Textarea
            id={`${item.id}-answer`}
            value={value}
            rows={4}
            placeholder={t('runner.freeTextPlaceholder')}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      )}
    </fieldset>
  );
}
