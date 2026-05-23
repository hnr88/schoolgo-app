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

export function ContentBreadcrumbs({ category, title }: ContentBreadcrumbsProps) {
  return (
    <Breadcrumb>
      <nav className='border-b border-divider bg-muted pt-24 md:pt-32'>
        <div className='mx-auto flex max-w-content flex-wrap items-center gap-y-1 px-5 py-3 text-sm md:px-8'>
          <BreadcrumbList className='text-foggy'>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/' />} className='text-foggy underline hover:text-ink-900'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='mx-2 text-quill' />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/resources' />} className='text-foggy underline hover:text-ink-900'>
                Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator className='mx-2 text-quill' />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href={`/resources/category/${category.slug}`} />}
                    className='text-foggy underline hover:text-ink-900'
                  >
                    {category.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator className='mx-2 text-quill' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-foggy'>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
      </nav>
    </Breadcrumb>
  );
}
