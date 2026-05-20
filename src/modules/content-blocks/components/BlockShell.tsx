import type { ReactNode } from 'react';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { cn } from '@/lib/utils';

interface BlockShellProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'plain' | 'muted' | 'dark' | 'brand' | 'trust' | 'featured' | 'ink';
  children: ReactNode;
}

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
        'py-14 md:py-20',
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
