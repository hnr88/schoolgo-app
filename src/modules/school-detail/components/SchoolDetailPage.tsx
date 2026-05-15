import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { SectionContainer } from '@/modules/design-system';
import { getSimilarSchools } from '@/modules/school-detail/lib/school-detail-api';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';
import { IntlBanner } from '@/modules/school-detail/components/sections/IntlBanner';
import { BreadcrumbNav } from '@/modules/school-detail/components/sections/BreadcrumbNav';
import { Hero } from '@/modules/school-detail/components/sections/Hero';
import { StatsStrip } from '@/modules/school-detail/components/sections/StatsStrip';
import { AboutSection } from '@/modules/school-detail/components/sections/AboutSection';
import { CurriculumSection } from '@/modules/school-detail/components/sections/CurriculumSection';
import { FeesSection } from '@/modules/school-detail/components/sections/FeesSection';
import { EnglishRequirementsSection } from '@/modules/school-detail/components/sections/EnglishRequirementsSection';
import { AdmissionsSection } from '@/modules/school-detail/components/sections/AdmissionsSection';
import { BoardingSection } from '@/modules/school-detail/components/sections/BoardingSection';
import { CoCurricularSection } from '@/modules/school-detail/components/sections/CoCurricularSection';
import { LocationSection } from '@/modules/school-detail/components/sections/LocationSection';
import { CompareSection } from '@/modules/school-detail/components/sections/CompareSection';
import { FaqSchoolSection } from '@/modules/school-detail/components/sections/FaqSchoolSection';
import { StructuredData } from '@/modules/school-detail/components/sections/StructuredData';
import { ApplyCard } from '@/modules/school-detail/components/sections/sidebar/ApplyCard';
import { ContactCard } from '@/modules/school-detail/components/sections/sidebar/ContactCard';
import { TocCard } from '@/modules/school-detail/components/sections/sidebar/TocCard';
import { KeyFactsCard } from '@/modules/school-detail/components/sections/sidebar/KeyFactsCard';

interface SchoolDetailPageProps {
  school: SchoolDetail;
  activePortal: Portal;
  locale?: string;
}

export async function SchoolDetailPage({ school, activePortal, locale }: SchoolDetailPageProps) {
  const similarSchools = await getSimilarSchools(school);

  return (
    <>
      <MarketingHeader activePortal={activePortal} variant="dark" />
      <IntlBanner />
      <main className="bg-background">
        <BreadcrumbNav school={school} activePortal={activePortal} />
        <Hero school={school} activePortal={activePortal} />
        <StatsStrip school={school} />

        <SectionContainer size="wide" className="py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="space-y-6">
              <AboutSection school={school} />
              <CurriculumSection school={school} />
              <FeesSection school={school} />
              <EnglishRequirementsSection school={school} />
              <AdmissionsSection school={school} />
              <BoardingSection school={school} />
              <CoCurricularSection school={school} />
              <LocationSection school={school} />
              <CompareSection similarSchools={similarSchools} activePortal={activePortal} />
              <FaqSchoolSection school={school} />
            </article>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <ApplyCard school={school} />
              <ContactCard school={school} />
              <TocCard />
              <KeyFactsCard school={school} activePortal={activePortal} />
            </aside>
          </div>
        </SectionContainer>

        <StructuredData school={school} activePortal={activePortal} locale={locale} />
      </main>
      <MarketingFooter activePortal={activePortal} />
    </>
  );
}
