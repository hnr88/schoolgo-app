import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core/lib/focus-ring';
import type { ListRowProps } from '@/modules/core/types/component.types';

/**
 * Airy list row (§3.5): py-4 rhythm, rounded hover background, leading
 * avatar/logo slot. When `href` is set the entire row is one accessible
 * link — no nested-link / whole-row onClick antipattern.
 */
export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  href,
  className,
}: ListRowProps) {
  const content = (
    <>
      {leading ? <span className='flex shrink-0 items-center'>{leading}</span> : null}
      <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-sm font-semibold text-ink-900'>{title}</span>
        {subtitle ? <span className='truncate text-xs text-foggy'>{subtitle}</span> : null}
      </span>
      {trailing ? <span className='flex shrink-0 items-center gap-2'>{trailing}</span> : null}
    </>
  );

  const base = cn(
    'flex items-center gap-4 rounded-xl px-4 py-4 transition-colors duration-200 ease-out-quart',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(base, 'no-underline hover:bg-gray-50', FOCUS_RING)}>
        {content}
      </Link>
    );
  }

  return <div className={base}>{content}</div>;
}
