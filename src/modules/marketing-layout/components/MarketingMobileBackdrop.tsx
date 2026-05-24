import { cn } from '@/lib/utils';
import type { MarketingMobileBackdropProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileBackdrop({ mobileOpen, onClick }: MarketingMobileBackdropProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-ink-900/40 transition-opacity duration-300',
        mobileOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0',
      )}
      onClick={onClick}
      aria-hidden='true'
    />
  );
}
