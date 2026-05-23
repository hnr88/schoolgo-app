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
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function BreadcrumbTrailBlock({
  page,
  getCategoryHref = (categorySlug) => `/resources/category/${categorySlug}`,
  sectionLabel = 'Resources',
}: ContentBlockProps) {
  const sectionHref = sectionLabel === 'Resources' ? '/resources' : getCategoryHref(page.category);

  return (
    <Breadcrumb>
      <nav
        aria-label='Breadcrumb'
        className='border-b border-divider bg-muted pt-[var(--header-height)]'
      >
        <SectionContainer className='py-3'>
          <BreadcrumbList className='text-sm text-foggy'>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href='/' />}
                className='text-hof underline hover:text-ink-900'
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='text-quill' />

            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href={sectionHref} />}
                className='text-hof underline hover:text-ink-900'
              >
                {sectionLabel}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='text-quill' />

            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href={getCategoryHref(page.category)} />}
                className='text-hof underline hover:text-ink-900'
              >
                {page.eyebrow}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='text-quill' />

            <BreadcrumbItem>
              <BreadcrumbPage className='text-hof'>{page.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </SectionContainer>
      </nav>
    </Breadcrumb>
  );
}
