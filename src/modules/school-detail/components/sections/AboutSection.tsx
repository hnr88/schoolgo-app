import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface AboutSectionProps {
  school: SchoolDetail;
}

export async function AboutSection({ school }: AboutSectionProps) {
  const isIntlRelevant = Boolean(
    school.cricosCode || school.internationalEnrolmentUrl || school.internationalStudentDescription,
  );

  if (!school.description && !school.welcomeMessage && !isIntlRelevant && !school.claimedAt) {
    return null;
  }

  const t = await getTranslations('SchoolDetail.about');

  const paragraphs: string[] = school.description
    ? school.description
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const lastReviewedFormatted = school.claimedAt
    ? new Intl.DateTimeFormat('en-AU', { month: 'long', year: 'numeric' }).format(
        new Date(school.claimedAt),
      )
    : null;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2
        id="about-heading"
        className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl"
      >
        {t('heading', { name: school.name })}
      </h2>
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
      {isIntlRelevant && (
        <div className="mt-6 rounded-lg border border-babu-100 bg-babu-50 p-4">
          <p className="text-body-sm leading-relaxed text-babu-800">
            <strong>{t('intlNoticeLead')}</strong> {t('intlNoticeBody', { name: school.name })}
          </p>
        </div>
      )}
      {school.claimedAt && lastReviewedFormatted && (
        <div className="mt-6 rounded-lg bg-muted p-4 text-body-sm leading-relaxed text-foggy">
          {t('sourceNote')}{' '}
          <time dateTime={school.claimedAt}>{t('lastReviewed', { date: lastReviewedFormatted })}</time>
        </div>
      )}
    </section>
  );
}
