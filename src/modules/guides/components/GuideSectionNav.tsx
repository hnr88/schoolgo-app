'use client';

import { useMemo } from 'react';
import { SectionContainer } from '@/modules/design-system';
import { useActiveSection } from '@/modules/guides/hooks/useActiveSection';
import type { GuideNavItem } from '@/modules/guides/types/guides.types';

export function GuideSectionNav({ navItems }: { navItems: GuideNavItem[] }) {
  const ids = useMemo(() => navItems.map((item) => item.id), [navItems]);
  const activeId = useActiveSection(ids);

  return (
    <nav className='sticky top-20 z-30 border-b border-border bg-background md:top-22'>
      <SectionContainer className='flex gap-0 overflow-x-auto'>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-medium transition ${
              activeId === item.id
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-foggy hover:border-quill hover:text-hof'
            }`}
          >
            {item.label}
          </a>
        ))}
      </SectionContainer>
    </nav>
  );
}
