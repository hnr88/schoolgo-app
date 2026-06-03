'use client';

import type { ReactNode } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ReviewSectionProps {
  title: string;
  stepIndex: number;
  onEdit: (stepIndex: number) => void;
  children: ReactNode;
}

export function ReviewSection({ title, stepIndex, onEdit, children }: ReviewSectionProps) {
  const t = useTranslations('StudentWizard');

  return (
    <section className='flex flex-col gap-4 rounded-lg border border-border bg-card/40 p-5'>
      <div className='flex items-center justify-between gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{title}</h3>
        <button
          type='button'
          onClick={() => onEdit(stepIndex)}
          className='inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors duration-200 ease-out-quart hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <Pencil className='size-3.5' aria-hidden='true' />
          {t('editStep')}
        </button>
      </div>
      {children}
    </section>
  );
}
