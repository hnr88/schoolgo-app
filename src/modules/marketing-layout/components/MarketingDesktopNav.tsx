import { cn } from '@/lib/utils';
import type { MarketingDesktopNavProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingDesktopNav({ navLinks, ariaLabel }: MarketingDesktopNavProps) {
  return (
    <nav aria-label={ariaLabel} className='hidden items-center gap-1 md:flex'>
      {navLinks.map((link) => {
        const isActive = link.isActive;
        return (
          <a
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-pill border px-3 py-1 text-sm font-semibold no-underline transition-colors',
              isActive
                ? 'border-primary bg-primary text-on-primary shadow-brand'
                : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted',
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
