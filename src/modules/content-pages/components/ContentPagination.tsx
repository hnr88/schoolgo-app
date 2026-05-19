import { Link } from '@/i18n/navigation';
import { contentTotalPages } from '@/modules/content-pages/data/content-pages';

export function ContentPagination({ currentPage }: { currentPage: number }) {
  return (
    <nav aria-label='Resource pages' className='mt-10 flex flex-wrap items-center justify-center gap-2'>
      {Array.from({ length: contentTotalPages }, (_, index) => index + 1).map((page) => (
        <Link
          key={page}
          href={page === 1 ? '/resources' : `/resources/page/${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={
            page === currentPage
              ? 'rounded-pill bg-primary px-4 py-2 text-sm font-semibold text-on-primary no-underline shadow-brand'
              : 'rounded-pill border border-border bg-card px-4 py-2 text-sm font-semibold text-hof no-underline hover:border-primary hover:text-primary'
          }
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
