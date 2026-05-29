'use client';

import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ENGLISH_TEST_TYPES } from '@/modules/school-templates/lib/template-options';
import type { AcceptedTestEntry } from '@/modules/school-templates/types/school-templates.types';

interface TestsEditorProps {
  tests: AcceptedTestEntry[];
  disabled?: boolean;
  onChange: (tests: AcceptedTestEntry[]) => void;
}

export function TestsEditor({ tests, disabled, onChange }: TestsEditorProps) {
  const t = useTranslations('SchoolTemplates');

  const update = (index: number, patch: Partial<AcceptedTestEntry>) =>
    onChange(tests.map((t2, i) => (i === index ? { ...t2, ...patch } : t2)));

  return (
    <div className='flex flex-col gap-3'>
      <Label className='text-sm font-semibold text-ink-900'>{t('testsTitle')}</Label>
      {tests.map((test, index) => (
        <div key={index} className='flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-end'>
          <div className='flex flex-1 flex-col gap-1'>
            <Label className='text-xs text-foggy'>{t('testTypeLabel')}</Label>
            <Select value={test.testType} disabled={disabled} onValueChange={(v) => update(index, { testType: v ?? '' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ENGLISH_TEST_TYPES.map((tt) => (
                  <SelectItem key={tt} value={tt}>{t(`test_${tt}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-1 flex-col gap-1'>
            <Label className='text-xs text-foggy'>{t('minimumScoreLabel')}</Label>
            <Input
              type='number'
              step='0.5'
              value={test.minimumScore ?? ''}
              disabled={disabled}
              placeholder={t('minimumScorePlaceholder')}
              onChange={(e) => update(index, { minimumScore: e.target.value === '' ? null : Number(e.target.value) })}
            />
          </div>
          <Button type='button' variant='ghost' size='icon' disabled={disabled} aria-label={t('removeTest')} onClick={() => onChange(tests.filter((_, i) => i !== index))}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ))}
      {!disabled && (
        <Button type='button' variant='outline' size='sm' className='self-start' onClick={() => onChange([...tests, { testType: 'ielts', minimumScore: null }])}>
          <Plus className='mr-1 h-4 w-4' />{t('addTest')}
        </Button>
      )}
    </div>
  );
}
