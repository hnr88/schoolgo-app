import { cn } from '@/lib/utils';
import type { MarketingMobileNavLinksProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileNavLinks({ navLinks, onLinkClick }: MarketingMobileNavLinksProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-2 px-1 py-2'>
        {navLinks.map((link) => {
          const isActive = link.isActive;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={onLinkClick}
              className={cn(
                'rounded-pill border px-3 py-2 text-sm font-semibold no-underline transition-colors',
                isActive
                  ? 'border-primary bg-primary text-on-primary shadow-brand'
                  : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted',
              )}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
