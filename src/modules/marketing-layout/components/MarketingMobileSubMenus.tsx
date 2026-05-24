import { Link } from '@/i18n/navigation';
import type { MarketingMobileSubMenusProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingMobileSubMenus({ subMenus, onLinkClick }: MarketingMobileSubMenusProps) {
  return (
    <>
      {subMenus.map((menu) => (
        <div key={menu.label} className='mt-2 flex flex-col border-t border-divider pt-2'>
          <span className='px-3 py-1.5 text-xs font-semibold uppercase text-foggy'>
            {menu.label}
          </span>
          {menu.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={onLinkClick}
              className='rounded-lg px-3 py-1.5 text-sm font-medium text-foreground no-underline hover:bg-muted'
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}
