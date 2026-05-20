import type { ReactNode } from 'react';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { cn } from '@/lib/utils';

interface BlockShellProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'plain' | 'muted' | 'dark';
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
        tone === 'dark' && 'bg-ink-900 text-background',
      )}
    >
      <SectionContainer>
        <SectionHeader
          eyebrow={eyebrow}
          heading={title}
          subheading={description}
          theme={tone === 'dark' ? 'dark' : 'light'}
        />
        <div className='mt-8'>{children}</div>
      </SectionContainer>
    </section>
  );
}
