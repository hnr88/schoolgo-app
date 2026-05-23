import { BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { contentBlockDefinitions, contentPageDesigns } from '@/modules/content-blocks';
import { contentSectionRoutes } from '@/modules/content-pages/constants/content-section-routes.constants';
import { ContentListStructuredData } from '@/modules/content-pages/components/ContentListStructuredData';
import { ContentDirectoryGrid } from '@/modules/content-pages/components/ContentDirectoryGrid';
import { ContentPagination } from '@/modules/content-pages/components/ContentPagination';
import { ContentStaticRoutesGrid } from '@/modules/content-pages/components/ContentStaticRoutesGrid';
import {
  contentCategories,
  contentPages,
  getPaginatedContentPages,
} from '@/modules/content-pages/data/content-pages';
import {
  getContentSectionDescription,
  getContentSectionLabel,
  getContentSectionRootHref,
} from '@/modules/content-pages/lib/content-section-routes';
import { getContentStaticPageHref } from '@/modules/content-pages/lib/content-static-routes';
import type { ContentIndexPageProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentIndexPage({ currentPage = 1 }: ContentIndexPageProps) {
  const pages = getPaginatedContentPages(currentPage);

  return (
    <>
      <ContentListStructuredData
        name='SchoolGo resource page examples'
        description='Structured content pages composed from reusable SchoolGo content blocks.'
        href='/resources'
        items={contentPages.map((page) => ({
          name: page.title,
          description: page.description,
          href: getContentStaticPageHref(page),
        }))}
      />
      <section className='border-b border-divider bg-muted pt-24 md:pt-32'>
        <SectionContainer className='pb-8 md:pb-12'>
          <div className='flex items-center gap-2 text-rausch-700'>
            <BookOpen className='h-5 w-5' aria-hidden='true' />
            <span className='text-sm font-semibold uppercase'>Resources</span>
          </div>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            Example content pages for every SchoolGo journey
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
            Browse {contentPages.length} structured pages across admissions, fees, curriculum, boarding, events, agents, schools, company content, and replaceable public policy pages.
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <Link href='/resources/blocks' className='rounded-pill bg-rausch-700 px-5 py-3 text-sm font-semibold text-background no-underline shadow-brand'>
              View {contentBlockDefinitions.length} reusable blocks
            </Link>
            <Link href='/resources/designs' className='rounded-pill border border-border bg-card px-5 py-3 text-sm font-semibold text-hof no-underline hover:bg-muted'>
              View {contentPageDesigns.length} page designs
            </Link>
          </div>
        </SectionContainer>
      </section>
      <ContentStaticRoutesGrid />
      <section className='border-b border-divider bg-background py-12 md:py-16'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Public routes'
            heading='Pages outside resources'
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
      <section className='border-b border-divider bg-background py-12 md:py-16'>
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
