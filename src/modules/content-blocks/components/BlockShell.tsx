import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { cn } from '@/lib/utils';
import type { BlockShellProps } from '@/modules/content-blocks/types/content-blocks.types';

export function BlockShell({
  id,
  eyebrow,
  title,
  description,
  tone = 'plain',
  children,
}: BlockShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16',
        tone === 'plain' && 'bg-background',
        tone === 'muted' && 'bg-muted',
        tone === 'brand' && 'bg-rausch-50',
        tone === 'trust' && 'bg-babu-50',
        tone === 'featured' && 'bg-arches-50',
        tone === 'ink' && 'bg-ink-900 text-background',
        tone === 'dark' && 'bg-ink-900 text-background',
      )}
    >
      <SectionContainer>
        <SectionHeader
          eyebrow={eyebrow}
          heading={title}
          subheading={description}
          theme={tone === 'dark' || tone === 'ink' ? 'dark' : 'light'}
        />
        <div className='mt-8'>{children}</div>
      </SectionContainer>
    </section>
  );
}
