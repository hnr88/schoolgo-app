import Image from 'next/image';
import type { MarketingHeaderLogoProps } from '@/modules/marketing-layout/types/header.types';

export function MarketingHeaderLogo({
  href,
  onClick,
  className = '',
  imageClassName = '',
  priority = false,
}: MarketingHeaderLogoProps) {
  return (
    <a
      href={href}
      className={`flex shrink-0 items-center ${className}`}
      aria-label='SchoolGo home'
      onClick={onClick}
    >
      <Image
        src='/logos/logo-red-text.png'
        alt='SchoolGo'
        width={559}
        height={125}
        priority={priority}
        className={`h-4 w-auto ${imageClassName}`}
      />
    </a>
  );
}
