import { Eyebrow } from '@/modules/design-system/components/Eyebrow';
import { cn } from '@/lib/utils';
import type { SectionHeaderProps } from '@/modules/design-system/types/design-system.types';

export function SectionHeader({
  eyebrow,
  eyebrowTone = 'brand',
  heading,
  subheading,
  as: Tag = 'h2',
  size = 'md',
  align = 'left',
  theme = 'light',
  className,
}: SectionHeaderProps) {
  const dark = theme === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        size === 'md' && 'max-w-3xl',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow
          tone={dark ? 'default' : eyebrowTone}
          className={dark ? 'text-background/70' : undefined}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          'font-display',
          size === 'md' &&
            'text-4xl font-bold leading-[1.1] tracking-[-0.02em] md:text-5xl',
          size === 'lg' &&
            'max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-[-0.025em] md:text-7xl',
          dark ? 'text-background' : 'text-ink-900',
        )}
      >
        {heading}
      </Tag>
      {subheading && (
        <p
          className={cn(
            'text-body md:text-lg',
            size === 'lg' && 'max-w-xl',
            dark ? 'text-background/75' : 'text-foggy',
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
