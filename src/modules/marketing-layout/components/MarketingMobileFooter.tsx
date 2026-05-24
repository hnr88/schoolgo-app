import { Link } from '@/i18n/navigation';
import { LanguageSelector } from '@/modules/layout/components/LanguageSelector';
import type { MarketingMobileFooterProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileFooter({ isSearchPage, onLinkClick, labels }: MarketingMobileFooterProps) {
  return (
    <div className='flex items-center gap-2 border-t border-divider px-4 py-3'>
      <Link
        href='/search'
        onClick={onLinkClick}
        data-slot='button'
        className='flex-1 rounded-pill border border-border px-3 py-2 text-center text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted'
      >
        {labels.signIn}
      </Link>
      {!isSearchPage && (
        <Link
          href='/search'
          onClick={onLinkClick}
          data-slot='button'
          className='flex-1 rounded-pill bg-primary px-3 py-2 text-center text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
        >
          {labels.findSchools}
        </Link>
      )}
      <LanguageSelector placement='up' compact />
    </div>
  );
}
