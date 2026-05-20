import { BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { contentBlockDefinitions } from '@/modules/content-blocks/lib/block-registry';
import { contentPageDesigns } from '@/modules/content-blocks/lib/content-block-designs';
import { contentSectionRoutes } from '@/modules/content-pages/constants/content-section-routes.constants';
import { ContentListStructuredData } from '@/modules/content-pages/components/ContentListStructuredData';
import { ContentDirectoryGrid } from '@/modules/content-pages/components/ContentDirectoryGrid';
import { ContentPagination } from '@/modules/content-pages/components/ContentPagination';
import {
  contentCategories,
  contentPages,
  getContentHref,
  getPaginatedContentPages,
} from '@/modules/content-pages/data/content-pages';
import {
  getContentSectionDescription,
  getContentSectionLabel,
  getContentSectionRootHref,
} from '@/modules/content-pages/lib/content-section-routes';

export function ContentIndexPage({ currentPage = 1 }: { currentPage?: number }) {
  const pages = getPaginatedContentPages(currentPage);

  return (
    <>
      <ContentListStructuredData
        name='SchoolGo resource page examples'
        description='Dummy content pages composed from reusable SchoolGo content blocks.'
        href='/resources'
        items={contentPages.map((page) => ({
          name: page.title,
          description: page.description,
          href: getContentHref(page),
        }))}
      />
      <section className='border-b border-divider bg-muted pt-28 md:pt-40'>
        <SectionContainer className='pb-12 md:pb-16'>
          <div className='flex items-center gap-2 text-primary'>
            <BookOpen className='h-5 w-5' aria-hidden='true' />
            <span className='text-sm font-semibold uppercase'>Resources</span>
          </div>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            Example content pages for every SchoolGo journey
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
            Browse 60 dummy pages across admissions, fees, curriculum, boarding, events, agents, schools, and company content.
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <Link href='/resources/blocks' className='rounded-pill bg-primary px-5 py-3 text-sm font-semibold text-on-primary no-underline shadow-brand'>
              View {contentBlockDefinitions.length} reusable blocks
            </Link>
            <Link href='/resources/designs' className='rounded-pill border border-border bg-card px-5 py-3 text-sm font-semibold text-hof no-underline hover:bg-muted'>
              View {contentPageDesigns.length} page designs
            </Link>
          </div>
        </SectionContainer>
      </section>
      <section className='border-b border-divider bg-background py-10'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Public routes'
            heading='Dummy pages outside resources'
            subheading='These section hubs expose the same block-composed pages through top-level public URLs.'
          />
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {contentSectionRoutes.map((section) => (
              <Link
                key={section}
                href={getContentSectionRootHref(section)}
                className='rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3'
              >
                <span className='font-semibold text-ink-900'>{getContentSectionLabel(section)}</span>
                <span className='mt-2 block text-sm leading-6 text-foggy'>
                  {getContentSectionDescription(section)}
                </span>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </section>
      <section className='border-b border-divider bg-background py-10'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Categories'
            heading='Content hubs'
            subheading='Each category has its own page and links into detailed examples.'
          />
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {contentCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/resources/category/${category.slug}`}
                className='rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3'
              >
                <span className='font-semibold text-ink-900'>{category.label}</span>
                <span className='mt-2 block text-sm leading-6 text-foggy'>{category.description}</span>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </section>
      <ContentDirectoryGrid
        title={currentPage === 1 ? 'Latest page examples' : `Page examples ${currentPage}`}
        description='Every item below is a concrete URL rendered through reusable content components.'
        pages={pages}
      />
      <SectionContainer className='pb-16'>
        <ContentPagination currentPage={currentPage} />
      </SectionContainer>
    </>
  );
}
