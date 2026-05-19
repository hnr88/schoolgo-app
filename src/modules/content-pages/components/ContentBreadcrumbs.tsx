import { Link } from '@/i18n/navigation';
import type { ContentCategory } from '@/modules/content-pages/types/content-pages.types';

interface ContentBreadcrumbsProps {
  category?: ContentCategory;
  title: string;
}

export function ContentBreadcrumbs({ category, title }: ContentBreadcrumbsProps) {
  return (
    <nav aria-label='Breadcrumb' className='border-b border-divider bg-muted pt-16 md:pt-24'>
      <div className='mx-auto flex max-w-content flex-wrap items-center gap-y-1 px-5 py-3 text-sm md:px-8'>
        <Link href='/' className='text-foggy underline hover:text-ink-900'>
          Home
        </Link>
        <span className='mx-2 text-quill'>/</span>
        <Link href='/resources' className='text-foggy underline hover:text-ink-900'>
          Resources
        </Link>
        {category && (
          <>
            <span className='mx-2 text-quill'>/</span>
            <Link
              href={`/resources/category/${category.slug}`}
              className='text-foggy underline hover:text-ink-900'
            >
              {category.label}
            </Link>
          </>
        )}
        <span className='mx-2 text-quill'>/</span>
        <span className='text-foggy'>{title}</span>
      </div>
    </nav>
  );
}
