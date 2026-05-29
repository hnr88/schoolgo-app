import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import type { Portal } from '@/lib/portal-url';
import type { MarketingDesktopActionsProps } from '@/modules/marketing-layout/types/header.types';

interface ExtendedMarketingDesktopActionsProps extends MarketingDesktopActionsProps {
  activePortal?: Portal;
}

export function MarketingDesktopActions({ isSearchPage, labels, activePortal }: ExtendedMarketingDesktopActionsProps) {
  const showFindSchools = activePortal === 'parent' && !isSearchPage;

  return (
    <div className='ml-auto hidden shrink-0 items-center gap-2 md:flex'>
      <Link
        href='/sign-in'
        data-slot='button'
        className='inline-flex min-h-11 items-center justify-center rounded-pill px-3 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted'
      >
        {labels.signIn}
      </Link>
      {showFindSchools && (
        <Link
          href='/search'
          data-slot='button'
          className='inline-flex min-h-11 items-center justify-center rounded-pill bg-primary px-4 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600 active:bg-rausch-700'
        >
          {labels.findSchools}
        </Link>
      )}
      <LanguageSelector placement='down' compact />
    </div>
  );
}
