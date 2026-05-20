import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { ContentDirectoryGrid } from '@/modules/content-pages/components/ContentDirectoryGrid';
import { ContentListStructuredData } from '@/modules/content-pages/components/ContentListStructuredData';
import {
  getContentSectionDescription,
  getContentSectionLabel,
  getContentSectionPageHref,
  getContentSectionPages,
  getContentSectionRootHref,
} from '@/modules/content-pages/lib/content-section-routes';
import type { ContentSectionIndexPageProps } from '@/modules/content-pages/types/content-section-routes.types';

export function ContentSectionIndexPage({
  section,
}: ContentSectionIndexPageProps) {
  const label = getContentSectionLabel(section);
  const description = getContentSectionDescription(section);
  const pages = getContentSectionPages(section);
  const firstPage = pages[0];
  const sectionHref = getContentSectionRootHref(section);

  return (
    <>
      <ContentListStructuredData
        name={`${label} page examples`}
        description={description}
        href={sectionHref}
        items={pages.map((page) => ({
          name: page.title,
          description: page.description,
          href: getContentSectionPageHref(page),
        }))}
      />
      <MarketingHeader activePortal='parent' />
      <main id='main-content'>
        <section className='border-b border-divider bg-muted pt-28 md:pt-40'>
          <SectionContainer className='pb-12 md:pb-16'>
            <p className='text-sm font-semibold uppercase text-rausch-700'>Public section</p>
            <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
              {label} page examples
            </h1>
            <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
              {description}
            </p>
            <div className='mt-7 flex flex-wrap gap-3'>
              {firstPage ? (
                <Link
                  href={getContentSectionPageHref(firstPage)}
                  className='rounded-pill bg-rausch-700 px-5 py-3 text-sm font-semibold text-background no-underline shadow-brand'
                >
                  Open first example
                </Link>
              ) : null}
              <Link
                href='/resources/designs'
                className='rounded-pill border border-border bg-card px-5 py-3 text-sm font-semibold text-hof no-underline hover:bg-muted'
              >
                View reusable designs
              </Link>
            </div>
          </SectionContainer>
        </section>
        <section className='border-b border-divider bg-background py-10'>
          <SectionContainer>
            <SectionHeader
              eyebrow='Top-level routes'
              heading='Clickable pages outside resources'
              subheading='These pages use the same reusable block components, but live under a public section path.'
            />
          </SectionContainer>
        </section>
        <ContentDirectoryGrid
          title={`${label} examples`}
          description='Each item renders as a real top-level section URL and links onward through reusable content blocks.'
          pages={pages}
          getPageHref={getContentSectionPageHref}
        />
      </main>
      <MarketingFooter activePortal='parent' />
    </>
  );
}
