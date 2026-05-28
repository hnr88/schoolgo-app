import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaLink } from '@/modules/design-system';
import { Link } from '@/i18n/navigation';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

export async function ApplyCard({
  school,
  activePortal,
}: {
  school: SchoolDetail;
  activePortal?: Portal;
}) {
  const t = await getTranslations('SchoolDetail.sidebar.apply');

  const primaryUrl = school.internationalEnrolmentUrl ?? school.schoolHomepageUrl;

  return (
    <section aria-labelledby="apply-heading" className="rounded-xl border border-border bg-card p-5 shadow-2">
      <h2 id="apply-heading" className="text-xl font-semibold text-ink-900">{t('heading')}</h2>
      <p className="mt-4 text-body-sm text-foggy">{t('intro')}</p>

      <div className="mt-5 space-y-4">
        {activePortal === 'agent' && (
          <Link
            href={`/dashboard/applications/new?school=${school.documentId}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-body-sm font-semibold text-on-primary shadow-brand hover:bg-rausch-600"
          >
            {t('startApplicationCta')}
          </Link>
        )}

        {primaryUrl && (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-body-sm font-semibold text-on-primary shadow-brand hover:bg-rausch-600"
          >
            {t('intlCta')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}

        {school.schoolHomepageUrl && (
          <a
            href={school.schoolHomepageUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-card px-4 py-3 text-body-sm font-semibold text-hof hover:bg-muted"
          >
            {t('websiteCta')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}

        <CtaLink
          href="/search"
          variant="secondary"
          size="lg"
          justify
        >
          {t('shortlistCta')}
        </CtaLink>
      </div>

      {school.schoolHomepageUrl && (
        <p className="mt-5 text-center text-caption text-quill">
          {t('domesticHint')}{' '}
          <a
            href={`${school.schoolHomepageUrl}/enrolments`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline"
          >
            {t('domesticLink')}
          </a>
        </p>
      )}
    </section>
  );
}
