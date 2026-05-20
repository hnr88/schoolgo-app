import { Link } from '@/i18n/navigation';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function BreadcrumbTrailBlock({
  page,
  getCategoryHref = (categorySlug) => `/resources/category/${categorySlug}`,
  sectionLabel = 'Resources',
}: ContentBlockProps) {
  const sectionHref = sectionLabel === 'Resources' ? '/resources' : getCategoryHref(page.category);
  const linkClass = 'text-hof underline hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch-700';

  return (
    <nav aria-label='Breadcrumb' className='border-b border-divider bg-muted pt-12 md:pt-16'>
      <ol className='mx-auto flex max-w-content flex-wrap items-center gap-y-1 px-5 py-3 text-sm md:px-8'>
        <li><Link href='/' className={linkClass}>Home</Link></li>
        <li className='mx-2 text-quill' aria-hidden='true'>/</li>
        <li><Link href={sectionHref} className={linkClass}>{sectionLabel}</Link></li>
        <li className='mx-2 text-quill' aria-hidden='true'>/</li>
        <li><Link href={getCategoryHref(page.category)} className={linkClass}>{page.eyebrow}</Link></li>
        <li className='mx-2 text-quill' aria-hidden='true'>/</li>
        <li className='text-hof' aria-current='page'>{page.title}</li>
      </ol>
    </nav>
  );
}
