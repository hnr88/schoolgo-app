import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import type { ContentBreadcrumbsProps } from '@/modules/content-pages/types/content-component-props.types';

import { SectionContainer } from '@/modules/design-system';

export function ContentBreadcrumbs({ category, title }: ContentBreadcrumbsProps) {
  return (
    <Breadcrumb>
      <nav
        aria-label='Breadcrumb'
        className='border-b border-divider bg-muted pt-16 md:pt-24'
      >
        <SectionContainer className='py-3'>
          <BreadcrumbList className='text-sm text-foggy'>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/' />} className='text-hof underline hover:text-ink-900'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-quill' />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/resources' />} className='text-hof underline hover:text-ink-900'>
                Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator className='text-quill' />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href={`/resources/category/${category.slug}`} />}
                    className='text-hof underline hover:text-ink-900'
                  >
                    {category.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator className='text-quill' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-hof'>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </SectionContainer>
      </nav>
    </Breadcrumb>
  );
}
