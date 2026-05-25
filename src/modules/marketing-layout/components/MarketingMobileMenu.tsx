import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { MarketingMobileBackdrop } from '@/modules/marketing-layout/components/MarketingMobileBackdrop';
import { MarketingMobileSheet } from '@/modules/marketing-layout/components/MarketingMobileSheet';
import { MarketingMobileSheetHeader } from '@/modules/marketing-layout/components/MarketingMobileSheetHeader';
import { MarketingMobileNavLinks } from '@/modules/marketing-layout/components/MarketingMobileNavLinks';
import { MarketingMobileSubMenus } from '@/modules/marketing-layout/components/MarketingMobileSubMenus';
import { MarketingMobileFooter } from '@/modules/marketing-layout/components/MarketingMobileFooter';
import type { MarketingMobileMenuProps } from '@/modules/marketing-layout/types/header.types';

interface ExtendedMarketingMobileMenuProps extends MarketingMobileMenuProps {
  activePortal?: Portal;
}

export function MarketingMobileMenu({
  mobileOpen,
  setMobileOpen,
  sheetRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  navLinks,
  subMenus,
  portalUrl,
  isSearchPage,
  labels,
  activePortal,
}: ExtendedMarketingMobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 md:hidden',
        mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      role='dialog'
      aria-modal={mobileOpen}
      aria-hidden={!mobileOpen}
    >
      <MarketingMobileBackdrop mobileOpen={mobileOpen} onClick={() => setMobileOpen(false)} />
      <MarketingMobileSheet
        sheetRef={sheetRef}
        mobileOpen={mobileOpen}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MarketingMobileSheetHeader
          portalUrl={portalUrl}
          onLogoClick={() => setMobileOpen(false)}
          onClose={() => setMobileOpen(false)}
          closeLabel={labels.closeMenu}
        />
        <div data-scroll className='flex flex-1 flex-col overflow-y-auto px-4 py-2'>
          <MarketingMobileNavLinks navLinks={navLinks} onLinkClick={() => setMobileOpen(false)} />
          <MarketingMobileSubMenus subMenus={subMenus} onLinkClick={() => setMobileOpen(false)} />
        </div>
        <MarketingMobileFooter
          isSearchPage={isSearchPage}
          onLinkClick={() => setMobileOpen(false)}
          labels={{ signIn: labels.signIn, findSchools: labels.findSchools }}
          activePortal={activePortal}
        />
      </MarketingMobileSheet>
    </div>
  );
}
