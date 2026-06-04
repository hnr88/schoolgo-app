'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { TemplateValidationResult } from '@/modules/school-templates/types/school-templates.types';

export function ValidationPanel({ result }: { result: TemplateValidationResult }) {
  const t = useTranslations('SchoolTemplates');

  return (
    <div data-testid='validation-panel' className='flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4 shadow-1'>
      <div className='flex items-center gap-2 text-sm font-semibold'>
        {result.valid ? (
          <>
            <CheckCircle2 className='h-4 w-4 text-babu-700' aria-hidden='true' />
            <span className='text-babu-700'>{t('validatePassed')}</span>
          </>
        ) : (
          <>
            <XCircle className='h-4 w-4 text-rausch-700' aria-hidden='true' />
            <span className='text-rausch-700'>{t('validateFailed')}</span>
          </>
        )}
      </div>

      {result.stepErrors.length > 0 && (
        <div className='flex flex-col gap-1'>
          <span className='text-xs font-semibold text-rausch-700'>{t('errorsTitle')}</span>
          <ul className='list-disc pl-5 text-xs text-rausch-700'>
            {result.stepErrors.flatMap((se) =>
              se.errors.map((msg, i) => (
                <li key={`${se.stepIndex}-${i}`}>
                  {t('stepBadge', { number: se.stepIndex + 1 })}: {msg}
                </li>
              )),
            )}
          </ul>
        </div>
      )}

      {result.warnings.length > 0 && (
        <div className='flex flex-col gap-1'>
          <span className='flex items-center gap-1 text-xs font-semibold text-arches-700'>
            <AlertTriangle className='h-3.5 w-3.5' aria-hidden='true' />
            {t('warningsTitle')}
          </span>
          <ul className='list-disc pl-5 text-xs text-arches-700'>
            {result.warnings.map((w, i) => (<li key={i}>{w.message}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}
