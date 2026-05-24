import { cn } from '@/lib/utils';
import type { MarketingMobileSheetProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileSheet({
  sheetRef,
  mobileOpen,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  children,
}: MarketingMobileSheetProps) {
  return (
    <div
      ref={sheetRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={cn(
        'absolute inset-x-0 bottom-0 flex flex-col rounded-t-3xl bg-background shadow-5 transition-transform duration-300',
        mobileOpen ? 'translate-y-0' : 'translate-y-full',
      )}
      style={{
        top: 'var(--header-height-mobile)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
