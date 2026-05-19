import { ContentCallout } from '@/modules/content-pages/components/ContentCallout';
import { ContentChecklist } from '@/modules/content-pages/components/ContentChecklist';
import { ContentComparisonTable } from '@/modules/content-pages/components/ContentComparisonTable';
import { ContentDirectoryGrid } from '@/modules/content-pages/components/ContentDirectoryGrid';
import { ContentFaq } from '@/modules/content-pages/components/ContentFaq';
import { ContentFeatureGrid } from '@/modules/content-pages/components/ContentFeatureGrid';
import { ContentLinkPanel } from '@/modules/content-pages/components/ContentLinkPanel';
import { ContentQuote } from '@/modules/content-pages/components/ContentQuote';
import { ContentResourceList } from '@/modules/content-pages/components/ContentResourceList';
import { ContentSplitPanel } from '@/modules/content-pages/components/ContentSplitPanel';
import { ContentStepCards } from '@/modules/content-pages/components/ContentStepCards';
import { ContentTimeline } from '@/modules/content-pages/components/ContentTimeline';
import { getContentPagesByCategory } from '@/modules/content-pages/data/content-pages';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

export function ContentTemplateSections({ page }: { page: ContentPage }) {
  const categoryPages = getContentPagesByCategory(page.category).filter(
    (item) => item.slug !== page.slug,
  );

  switch (page.type) {
    case 'admissions':
      return (
        <>
          <ContentStepCards steps={page.steps} />
          <ContentTimeline items={page.timeline} />
          <ContentChecklist items={page.checklist} />
          <ContentCallout page={page} />
        </>
      );
    case 'fees':
      return (
        <>
          <ContentComparisonTable rows={page.comparison} />
          <ContentChecklist items={page.checklist} />
          <ContentResourceList resources={page.resources} />
        </>
      );
    case 'directory':
      return (
        <>
          <ContentDirectoryGrid
            title='Related directory examples'
            description='Directory layouts are useful for agents, programs, locations, contacts, and school comparison lists.'
            pages={categoryPages.slice(0, 6)}
          />
          <ContentLinkPanel links={page.links} />
          <ContentResourceList resources={page.resources} />
        </>
      );
    case 'events':
      return (
        <>
          <ContentTimeline items={page.timeline} />
          <ContentFeatureGrid
            title='Event page building blocks'
            description='Cards, timeline rows, resource links, and CTAs can support event-heavy pages.'
            features={page.features}
          />
          <ContentCallout page={page} />
        </>
      );
    case 'faq':
      return (
        <>
          <ContentChecklist items={page.checklist} />
          <ContentFaq items={page.faqs} />
          <ContentResourceList resources={page.resources} />
        </>
      );
    default:
      return (
        <>
          <ContentSplitPanel page={page} />
          <ContentFeatureGrid
            title='Reusable content blocks in this template'
            description='The page combines cards, links, stats, and structured next steps while staying inside the current design language.'
            features={page.features}
          />
          <ContentStepCards steps={page.steps} />
          <ContentLinkPanel links={page.links} />
          <ContentQuote quote={page.quote} />
        </>
      );
  }
}
