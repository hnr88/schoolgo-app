import { Link } from '@/i18n/navigation';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function BreadcrumbTrailBlock({
  page,
  getCategoryHref = (categorySlug) => `/resources/category/${categorySlug}`,
  sectionLabel = 'Resources',
}: ContentBlockProps) {
  const sectionHref = sectionLabel === 'Resources' ? '/resources' : getCategoryHref(page.category);

  return (
    <nav aria-label='Breadcrumb' className='border-b border-divider bg-muted pt-16 md:pt-24'>
      <div className='mx-auto flex max-w-content flex-wrap items-center gap-y-1 px-5 py-3 text-sm md:px-8'>
        <Link href='/' className='text-foggy underline hover:text-ink-900'>Home</Link>
        <span className='mx-2 text-quill'>/</span>
        <Link href={sectionHref} className='text-foggy underline hover:text-ink-900'>{sectionLabel}</Link>
        <span className='mx-2 text-quill'>/</span>
        <Link href={getCategoryHref(page.category)} className='text-foggy underline hover:text-ink-900'>{page.eyebrow}</Link>
        <span className='mx-2 text-quill'>/</span>
        <span className='text-foggy'>{page.title}</span>
      </div>
    </nav>
  );
}
