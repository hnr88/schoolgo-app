'use client';

import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DOCUMENT_TYPES } from '@/modules/school-templates/lib/template-options';
import type { RequiredDocumentEntry } from '@/modules/school-templates/types/school-templates.types';

interface DocumentsEditorProps {
  documents: RequiredDocumentEntry[];
  disabled?: boolean;
  onChange: (documents: RequiredDocumentEntry[]) => void;
}

export function DocumentsEditor({ documents, disabled, onChange }: DocumentsEditorProps) {
  const t = useTranslations('SchoolTemplates');

  const update = (index: number, patch: Partial<RequiredDocumentEntry>) =>
    onChange(documents.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  return (
    <div className='flex flex-col gap-3'>
      <Label className='text-sm font-semibold text-ink-900'>{t('documentsTitle')}</Label>
      {documents.map((doc, index) => (
        <div key={index} className='flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-end'>
          <div className='flex flex-1 flex-col gap-1'>
            <Label className='text-xs text-foggy'>{t('documentTypeLabel')}</Label>
            <Select value={doc.documentType} disabled={disabled} onValueChange={(v) => update(index, { documentType: v ?? '' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((dt) => (
                  <SelectItem key={dt} value={dt}>{t(`doc_${dt}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-[2] flex-col gap-1'>
            <Label className='text-xs text-foggy'>{t('documentInstructionsLabel')}</Label>
            <Input
              value={doc.instructions ?? ''}
              disabled={disabled}
              placeholder={t('documentInstructionsPlaceholder')}
              onChange={(e) => update(index, { instructions: e.target.value })}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Switch checked={doc.required} disabled={disabled} onCheckedChange={(c) => update(index, { required: c })} aria-label={t('documentRequiredLabel')} />
            <span className='text-xs text-foggy'>{t('documentRequiredLabel')}</span>
          </div>
          <Button type='button' variant='ghost' size='icon' disabled={disabled} aria-label={t('removeDocument')} onClick={() => onChange(documents.filter((_, i) => i !== index))}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ))}
      {!disabled && (
        <Button type='button' variant='outline' size='sm' className='self-start' onClick={() => onChange([...documents, { documentType: 'passport', required: true }])}>
          <Plus className='mr-1 h-4 w-4' />{t('addDocument')}
        </Button>
      )}
    </div>
  );
}
