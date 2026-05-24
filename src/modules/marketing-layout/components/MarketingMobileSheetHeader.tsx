import { X } from 'lucide-react';
import { MarketingHeaderLogo } from '@/modules/marketing-layout/components/MarketingHeaderLogo';
import type { MarketingMobileSheetHeaderProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileSheetHeader({
  portalUrl,
  onLogoClick,
  onClose,
  closeLabel,
}: MarketingMobileSheetHeaderProps) {
  return (
    <>
      <div className='flex justify-center pt-2' aria-hidden='true'>
        <span className='h-1 w-8 rounded-full bg-ink-900/15' />
      </div>
      <div className='flex items-center justify-between px-5 pb-2 pt-2'>
        <MarketingHeaderLogo
          href={portalUrl}
          onClick={onLogoClick}
        />
        <button
          type='button'
          onClick={onClose}
          aria-label={closeLabel}
          className='flex h-10 w-10 items-center justify-center rounded-pill hover:bg-muted'
        >
          <X className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
        </button>
      </div>
    </>
  );
}
