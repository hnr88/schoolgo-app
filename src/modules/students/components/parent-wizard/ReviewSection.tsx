'use client';

import type { ReactNode } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DsButton } from '@/modules/design-system';

interface ReviewSectionProps {
  title: string;
  stepIndex: number;
  onEdit: (stepIndex: number) => void;
  children: ReactNode;
}

export function ReviewSection({ title, stepIndex, onEdit, children }: ReviewSectionProps) {
  const t = useTranslations('StudentWizard');

  return (
    <section className='flex flex-col gap-6 rounded-xl border border-gray-100 bg-card p-6 shadow-1 lg:p-8'>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='font-display text-xl font-semibold tracking-tight text-ink-900'>
          {title}
        </h3>
        <DsButton
          type='button'
          variant='secondary'
          size='sm'
          onClick={() => onEdit(stepIndex)}
        >
          <Pencil className='size-4' aria-hidden='true' />
          {t('editStep')}
        </DsButton>
      </div>
      {children}
    </section>
  );
}
