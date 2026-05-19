import { ContentBreadcrumbs } from '@/modules/content-pages/components/ContentBreadcrumbs';
import { ContentCtaBand } from '@/modules/content-pages/components/ContentCtaBand';
import { ContentFactsPanel } from '@/modules/content-pages/components/ContentFactsPanel';
import { ContentHero } from '@/modules/content-pages/components/ContentHero';
import { ContentRelatedPages } from '@/modules/content-pages/components/ContentRelatedPages';
import { ContentSectionNav } from '@/modules/content-pages/components/ContentSectionNav';
import { ContentStatStrip } from '@/modules/content-pages/components/ContentStatStrip';
import { ContentTemplateSections } from '@/modules/content-pages/components/ContentTemplateSections';
import {
  getContentCategory,
  getRelatedContentPages,
} from '@/modules/content-pages/data/content-pages';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

export function ContentPageView({ page }: { page: ContentPage }) {
  const category = getContentCategory(page.category);
  const relatedPages = getRelatedContentPages(page);

  return (
    <>
      <ContentBreadcrumbs category={category} title={page.title} />
      <ContentHero page={page} />
      <ContentSectionNav
        items={[
          { label: 'Overview', href: '#overview' },
          { label: 'Key facts', href: '#key-facts' },
          { label: 'Details', href: '#details' },
          { label: 'Next steps', href: '#next-steps' },
          { label: 'Related', href: '#related' },
        ]}
      />
      <ContentStatStrip metrics={page.metrics} />
      <ContentFactsPanel facts={page.facts} />
      <ContentTemplateSections page={page} />
      <ContentRelatedPages pages={relatedPages} />
      <ContentCtaBand page={page} />
    </>
  );
}
