import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { SchoolPublicQuestions } from '@/modules/parent-ask-school';

interface AskSchoolSectionProps {
  schoolDocumentId: string;
}

export async function AskSchoolSection({ schoolDocumentId }: AskSchoolSectionProps) {
  const t = await getTranslations('SchoolDetail.questions');

  return (
    <section
      id="questions"
      aria-labelledby="questions-heading"
      className="rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="questions-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-2 max-w-3xl text-body-sm text-foggy">{t('intro')}</p>
      <div className="mt-6">
        <SchoolPublicQuestions schoolDocumentId={schoolDocumentId} />
      </div>
    </section>
  );
}
