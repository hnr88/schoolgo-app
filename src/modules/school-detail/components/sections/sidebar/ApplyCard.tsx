import { ExternalLink, Users } from 'lucide-react';
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
  const isAgent = activePortal === 'agent';

  return (
    <section id="apply" aria-labelledby="apply-heading" className="rounded-lg border border-divider bg-card p-6 shadow-2">
      <h2 id="apply-heading" className="text-xl font-semibold text-ink-900">
        {isAgent ? t('heading') : t('agentHeading')}
      </h2>
      <p className="mt-4 text-body-sm text-foggy">{isAgent ? t('intro') : t('agentIntro')}</p>

      <div className="mt-5 space-y-4">
        {isAgent ? (
          <>
            <Link
              href={`/dashboard/applications/new?school=${school.documentId}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('startApplicationCta')}
            </Link>

            {primaryUrl && (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-card px-4 py-3 text-body-sm font-semibold text-hof transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t('websiteCta')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </>
        ) : (
          <a
            href="#agents"
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Users className="h-4 w-4" aria-hidden="true" />
            {t('findAgentCta')}
          </a>
        )}

        <CtaLink href="/search" variant="secondary" size="lg" justify>
          {t('shortlistCta')}
        </CtaLink>
      </div>

      {isAgent && school.schoolHomepageUrl && (
        <p className="mt-5 text-center text-caption text-quill">
          {t('domesticHint')}{' '}
          <a
            href={`${school.schoolHomepageUrl}/enrolments`}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-sm text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t('domesticLink')}
          </a>
        </p>
      )}
    </section>
  );
}
