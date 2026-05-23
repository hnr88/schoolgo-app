import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
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
    <Breadcrumb>
      <SectionContainer size="wide" className="py-3">
        <BreadcrumbList className="text-sm text-foggy">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={homeHref} />} className="text-hof underline hover:text-ink-900">
              {t('breadcrumbs.home')}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-quill" />

          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={searchHref} />} className="text-hof underline hover:text-ink-900">
              {t('breadcrumbs.schools')}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {school.state && (
            <>
              <BreadcrumbSeparator className="text-quill" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href={`${searchHref}?state=${school.state.toLowerCase()}`} />}
                  className="text-hof underline hover:text-ink-900"
                >
                  {school.state}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {school.suburb && (
            <>
              <BreadcrumbSeparator className="text-quill" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href={`${searchHref}?city=${encodeURIComponent(school.suburb.toLowerCase())}`} />}
                  className="text-hof underline hover:text-ink-900"
                >
                  {school.suburb}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator className="text-quill" />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-hof">
              {school.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </SectionContainer>
    </Breadcrumb>
  );
}
