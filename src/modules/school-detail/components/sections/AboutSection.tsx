import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface AboutSectionProps {
  school: SchoolDetail;
}

export async function AboutSection({ school }: AboutSectionProps) {
  const t = await getTranslations('SchoolDetail.about');

  const now = new Date();
  const lastReviewedIso = school.claimedAt
    ? school.claimedAt
    : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

  const lastReviewedFormatted = new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(lastReviewedIso));

  const heading = school.description
    ? t('heading', { name: school.name })
    : t('defaultHeading', { name: school.name });

  const paragraphs: string[] = school.description
    ? school.description
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [t('defaultDescription', { name: school.name })];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2
        id="about-heading"
        className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl"
      >
        {heading}
      </h2>
      <div className="mt-4 rounded-lg border border-babu-100 bg-babu-50 p-4">
        <p className="text-body-sm leading-relaxed text-babu-800">
          <strong>{t('intlNoticeLead')}</strong>{' '}
          {t('intlNoticeBody', { name: school.name })}
        </p>
      </div>
      <div className="mt-6 max-w-3xl space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-body leading-relaxed text-foggy">
            {p}
          </p>
        ))}
        {school.welcomeMessage && (
          <p className="text-body leading-relaxed text-foggy">
            {school.welcomeMessage}
          </p>
        )}
      </div>
      <div className="mt-6 rounded-lg bg-muted p-4 text-body-sm leading-relaxed text-foggy">
        {t('sourceNote')}{' '}
        <time dateTime={lastReviewedIso}>
          {t('lastReviewed', { date: lastReviewedFormatted })}
        </time>
      </div>
    </section>
  );
}
