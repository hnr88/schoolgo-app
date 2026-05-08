import { GuideAccordion } from '@/modules/guides/components/GuideAccordion';
import { GuideCTA } from '@/modules/guides/components/GuideCTA';
import { GuideContent } from '@/modules/guides/components/GuideContent';
import { GuideHero } from '@/modules/guides/components/GuideHero';
import { GuideSplitFeature } from '@/modules/guides/components/GuideSplitFeature';
import type { GuidePageData } from '@/modules/guides/types/guides.types';

export function GuidePageRenderer({ guide }: { guide: GuidePageData }) {
  return (
    <>
      <GuideHero {...guide.hero} />
      {guide.sections.map((section, i) => {
        switch (section.type) {
          case 'content':
            return <GuideContent key={i} {...section} />;
          case 'split':
            return <GuideSplitFeature key={i} {...section} />;
          case 'accordion':
            return <GuideAccordion key={i} {...section} />;
        }
      })}
      <GuideCTA {...guide.cta} relatedGuides={guide.relatedGuides} />
    </>
  );
}
