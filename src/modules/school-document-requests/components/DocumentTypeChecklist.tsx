'use client';

import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { REQUESTABLE_DOCUMENT_TYPES } from '@/modules/school-document-requests/constants/school-document-requests.constants';

interface Props {
  value: string[];
  onChange: (next: string[]) => void;
}

export function DocumentTypeChecklist({ value, onChange }: Props) {
  const tDoc = useTranslations('Students');

  function toggle(type: string, checked: boolean) {
    onChange(checked ? [...value, type] : value.filter((v) => v !== type));
  }

  return (
    <div className='grid max-h-64 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-border p-3 sm:grid-cols-2'>
      {REQUESTABLE_DOCUMENT_TYPES.map((type) => (
        <Label
          key={type}
          className='flex cursor-pointer items-center gap-2 text-sm font-normal text-ink-900'
        >
          <Checkbox
            checked={value.includes(type)}
            onCheckedChange={(checked) => toggle(type, checked === true)}
          />
          {tDoc(`docType_${type}`)}
        </Label>
      ))}
    </div>
  );
}
