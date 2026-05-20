import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { contentStaticRoutes } from '@/modules/content-pages/constants/content-static-routes.constants';
import {
  getContentStaticPage,
  getContentStaticRootHref,
} from '@/modules/content-pages/lib/content-static-routes';

export function ContentStaticRoutesGrid() {
  const staticPages = contentStaticRoutes.flatMap((route) => {
    const page = getContentStaticPage(route);
    return page ? [{ route, page }] : [];
  });

  return (
    <section className='border-b border-divider bg-background py-10'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Static public pages'
          heading='Replaceable company and school-style pages'
          subheading='These pages are top-level URLs for the content families most schools, universities, and education companies expose.'
        />
        <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {staticPages.map(({ route, page }) => (
            <Link
              key={route}
              href={getContentStaticRootHref(route)}
              className='rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3'
            >
              <span className='font-semibold text-ink-900'>{page.title}</span>
              <span className='mt-2 block text-sm leading-6 text-foggy'>
                {page.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
