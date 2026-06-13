import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { SchoolReviewsPublic } from '@/modules/parent-school-reviews';

interface ReviewsSectionProps {
  schoolDocumentId: string;
}

export async function ReviewsSection({ schoolDocumentId }: ReviewsSectionProps) {
  const t = await getTranslations('SchoolDetail.reviews');

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="reviews-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-2 max-w-3xl text-body-sm text-foggy">{t('intro')}</p>
      <div className="mt-6">
        <SchoolReviewsPublic schoolDocumentId={schoolDocumentId} />
      </div>
    </section>
  );
}
