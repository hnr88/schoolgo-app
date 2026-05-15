import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

interface BreadcrumbNavProps {
  school: SchoolDetail;
  activePortal: Portal;
}

export async function BreadcrumbNav({ school, activePortal }: BreadcrumbNavProps) {
  const t = await getTranslations('SchoolDetail');

  const searchHref = activePortal === 'parent' ? '/search' : `/${activePortal}/search`;
  const homeHref = activePortal === 'parent' ? '/' : `/${activePortal}`;

  return (
    <nav aria-label={t('breadcrumbs.aria')}>
      <SectionContainer size="wide" className="py-4">
        <ol className="flex flex-wrap items-center gap-2 text-body-sm text-foggy">
          <li>
            <Link href={homeHref} className="text-primary hover:underline">
              {t('breadcrumbs.home')}
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-quill" aria-hidden="true" />
          </li>

          <li>
            <Link href={searchHref} className="text-primary hover:underline">
              {t('breadcrumbs.schools')}
            </Link>
          </li>

          {school.state && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-quill" aria-hidden="true" />
              </li>
              <li>
                <Link
                  href={`${searchHref}?state=${school.state.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  {school.state}
                </Link>
              </li>
            </>
          )}

          {school.suburb && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-quill" aria-hidden="true" />
              </li>
              <li>
                <Link
                  href={`${searchHref}?city=${encodeURIComponent(school.suburb.toLowerCase())}`}
                  className="text-primary hover:underline"
                >
                  {school.suburb}
                </Link>
              </li>
            </>
          )}

          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-quill" aria-hidden="true" />
          </li>

          <li>
            <span aria-current="page" className="font-medium text-hof">
              {school.name}
            </span>
          </li>
        </ol>
      </SectionContainer>
    </nav>
  );
}
