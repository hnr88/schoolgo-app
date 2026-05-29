'use client';

import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMarketingHeader } from '@/modules/marketing-layout/hooks/use-marketing-header';
import { MarketingHeaderLogo } from '@/modules/marketing-layout/components/MarketingHeaderLogo';
import { MarketingDesktopNav } from '@/modules/marketing-layout/components/MarketingDesktopNav';
import { MarketingDesktopActions } from '@/modules/marketing-layout/components/MarketingDesktopActions';
import { MarketingMobileMenu } from '@/modules/marketing-layout/components/MarketingMobileMenu';
import { MarketingSubHeader } from '@/modules/marketing-layout/components/MarketingSubHeader';
import type { MarketingHeaderClientProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingHeaderClient({
  subMenus,
  activePortal,
  portalUrls,
  navLinks,
  fullWidth = false,
  labels,
}: MarketingHeaderClientProps) {
  const t = useTranslations('Common');
  const {
    scrolled,
    mobileOpen,
    setMobileOpen,
    sheetRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSearchPage,
  } = useMarketingHeader();

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full border-b border-divider bg-background transition-shadow duration-200 md:bg-background/90 md:backdrop-blur-xl',
          scrolled && 'shadow-1',
        )}
      >
        <MarketingSubHeader menus={subMenus} inverted={false} fullWidth={fullWidth} />
        <div
          className={cn(
            'flex h-11 items-center gap-4 px-5 md:h-12 md:px-8',
            fullWidth ? 'w-full' : 'mx-auto max-w-content',
          )}
        >
          <MarketingHeaderLogo
            href={portalUrls[activePortal]}
            priority
            imageClassName='md:h-5'
          />
          <MarketingDesktopNav navLinks={navLinks} ariaLabel={t('primaryNavigation')} />
          <MarketingDesktopActions
            isSearchPage={isSearchPage}
            labels={{ signIn: labels.signIn, findSchools: labels.findSchools }}
            activePortal={activePortal}
          />
          <button
            type='button'
            onClick={() => setMobileOpen(true)}
            aria-label={labels.openMenu}
            className='ml-auto flex size-11 shrink-0 items-center justify-center rounded-pill text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 md:hidden'
          >
            <Menu className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
          </button>
        </div>
      </header>

      <MarketingMobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        sheetRef={sheetRef}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        navLinks={navLinks}
        subMenus={subMenus}
        portalUrl={portalUrls[activePortal]}
        isSearchPage={isSearchPage}
        labels={labels}
        activePortal={activePortal}
      />
    </>
  );
}
