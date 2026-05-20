import { Link } from '@/i18n/navigation';
import { contentTotalPages } from '@/modules/content-pages/data/content-pages';
import type { ContentPaginationProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentPagination({ currentPage }: ContentPaginationProps) {
  return (
    <nav aria-label='Resource pages' className='mt-10 flex flex-wrap items-center justify-center gap-2'>
      {Array.from({ length: contentTotalPages }, (_, index) => index + 1).map((page) => (
        <Link
          key={page}
          href={page === 1 ? '/resources' : `/resources/page/${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={
            page === currentPage
              ? 'rounded-pill bg-rausch-700 px-4 py-2 text-sm font-semibold text-background no-underline shadow-brand'
              : 'rounded-pill border border-border bg-card px-4 py-2 text-sm font-semibold text-hof no-underline hover:border-rausch-700 hover:text-rausch-700'
          }
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
