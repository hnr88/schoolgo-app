import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import type { MarketingDesktopActionsProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingDesktopActions({ isSearchPage, labels }: MarketingDesktopActionsProps) {
  return (
    <div className='ml-auto hidden shrink-0 items-center gap-2 md:flex'>
      <Link
        href='/search'
        data-slot='button'
        className='rounded-pill px-3 py-1.5 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted'
      >
        {labels.signIn}
      </Link>
      {!isSearchPage && (
        <Link
          href='/search'
          data-slot='button'
          className='inline-flex items-center justify-center rounded-pill bg-primary px-4 py-1.5 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          {labels.findSchools}
        </Link>
      )}
      <LanguageSelector placement='down' compact />
    </div>
  );
}
