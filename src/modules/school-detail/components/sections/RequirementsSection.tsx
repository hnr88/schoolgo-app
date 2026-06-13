'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { Eyebrow, StatusBadge } from '@/modules/design-system';
import { useSchoolRequirements } from '@/modules/school-detail/queries/use-school-requirements.query';
import {
  extractRequirements,
  fallbackRequirementLabel,
} from '@/modules/school-detail/lib/extract-requirements';

export function RequirementsSection({ schoolDocumentId }: { schoolDocumentId: string }) {
  const t = useTranslations('SchoolDetail.requirements');
  const tTemplates = useTranslations('SchoolTemplates');
  const { data, isPending, isError } = useSchoolRequirements(schoolDocumentId);

  const docLabel = (type: string) =>
    tTemplates.has(`doc_${type}`) ? tTemplates(`doc_${type}`) : fallbackRequirementLabel(type);
  const testLabel = (type: string) =>
    tTemplates.has(`test_${type}`) ? tTemplates(`test_${type}`) : fallbackRequirementLabel(type);

  const requirements = data ? extractRequirements(data.templateData) : null;
  const hasContent = Boolean(
    requirements && (requirements.documents.length > 0 || requirements.tests.length > 0),
  );

  return (
    <section
      id='requirements'
      aria-labelledby='requirements-heading'
      className='rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8'
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id='requirements-heading' className='text-2xl font-bold text-ink-900 mt-2 md:text-3xl'>
        {t('heading')}
      </h2>

      {isPending && (
        <div className='mt-6 space-y-3'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-2/3' />
        </div>
      )}

      {isError && <p className='mt-6 text-sm text-foggy'>{t('error')}</p>}

      {!isPending && !isError && !hasContent && (
        <p className='mt-6 text-sm text-foggy'>{t('empty')}</p>
      )}

      {!isPending && !isError && data && requirements && hasContent && (
        <div className='mt-6 space-y-8'>
          <p className='text-xs text-foggy'>{t('versionLabel', { version: data.version })}</p>

          {requirements.documents.length > 0 && (
            <div>
              <h3 className='text-sm font-semibold text-ink-900'>{t('documentsHeading')}</h3>
              <ul className='mt-3 space-y-2'>
                {requirements.documents.map((doc, index) => (
                  <li
                    key={`${doc.documentType}-${index}`}
                    className='flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2'
                  >
                    <div className='min-w-0'>
                      <p className='text-sm font-medium text-ink-900'>
                        {docLabel(doc.documentType)}
                      </p>
                      {doc.instructions && (
                        <p className='mt-0.5 text-xs text-foggy'>{doc.instructions}</p>
                      )}
                    </div>
                    <StatusBadge tone={doc.required ? 'trust' : 'muted'} size='sm'>
                      {doc.required ? t('requiredBadge') : t('optionalBadge')}
                    </StatusBadge>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements.tests.length > 0 && (
            <div>
              <h3 className='text-sm font-semibold text-ink-900'>{t('testsHeading')}</h3>
              <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                {requirements.tests.map((test, index) => (
                  <StatusBadge
                    key={`${test.testType}-${index}`}
                    tone='muted'
                    size='md'
                    className='justify-between rounded-lg px-3 py-2'
                  >
                    <span>{testLabel(test.testType)}</span>
                    <span className='font-bold text-ink-900'>
                      {test.minimumScore != null ? String(test.minimumScore) : t('noMinScore')}
                    </span>
                  </StatusBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
