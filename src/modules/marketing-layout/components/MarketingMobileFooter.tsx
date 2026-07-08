import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import type { Portal } from '@/lib/portal-url';
import type { MarketingMobileFooterProps } from '@/modules/marketing-layout/types/header.types';

interface ExtendedMarketingMobileFooterProps extends MarketingMobileFooterProps {
  activePortal?: Portal;
}

export function MarketingMobileFooter({ isSearchPage, onLinkClick, labels, activePortal }: ExtendedMarketingMobileFooterProps) {
  const showFindSchools = activePortal === 'parent' && !isSearchPage;

  return (
    <div className='flex items-center gap-2 border-t border-divider px-4 py-3'>
      {!PUBLIC_ONLY && (
        <Link
          href='/sign-in'
          onClick={onLinkClick}
          data-slot='button'
          className='flex min-h-11 flex-1 items-center justify-center rounded-pill border border-border px-3 text-center text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted'
        >
          {labels.signIn}
        </Link>
      )}
      {showFindSchools && (
        <Link
          href='/search'
          onClick={onLinkClick}
          data-slot='button'
          className='flex min-h-11 flex-1 items-center justify-center rounded-pill bg-primary px-3 text-center text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
        >
          {labels.findSchools}
        </Link>
      )}
      <LanguageSelector placement='up' compact />
    </div>
  );
}
