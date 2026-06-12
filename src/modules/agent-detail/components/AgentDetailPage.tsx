import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { SectionContainer } from '@/modules/design-system';
import type { Portal } from '@/lib/portal-url';
import type {
  AgentContactContext,
  AgentDetail,
} from '@/modules/agent-detail/types/agent-detail.types';
import { AgentHeroSection } from './sections/AgentHeroSection';
import { AgentBreadcrumbNav } from './sections/AgentBreadcrumbNav';
import { AgentStatsStrip } from './sections/AgentStatsStrip';
import { AgentAboutSection } from './sections/AgentAboutSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { PartnerSchoolsSection } from './sections/PartnerSchoolsSection';
import { OfficesSection } from './sections/OfficesSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { ContactChannelsSection } from './sections/ContactChannelsSection';
import { ServicesSection } from './sections/ServicesSection';
import { WelfareSection } from './sections/WelfareSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { SuccessStoriesSection } from './sections/SuccessStoriesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { MembershipsSection } from './sections/MembershipsSection';
import { AwardsSection } from './sections/AwardsSection';
import { MarketsSection } from './sections/MarketsSection';
import { DestinationsSection } from './sections/DestinationsSection';
import { ProcessSection } from './sections/ProcessSection';
import { MediaGallerySection } from './sections/MediaGallerySection';
import { PressSection } from './sections/PressSection';
import { FaqSection } from './sections/FaqSection';
import { CustomSectionRenderer } from './sections/CustomSectionRenderer';
import { AgentStructuredData } from './sections/AgentStructuredData';
import { KeyFactsCard } from './sections/KeyFactsCard';
import { ContactAgentCard } from './sections/ContactAgentCard';
import { AgentTocCard } from './sections/AgentTocCard';

interface AgentDetailPageProps {
  agent: AgentDetail;
  activePortal: Portal;
  locale?: string;
  schoolDocumentId?: string;
}

function resolveName(agent: AgentDetail): string {
  return agent.displayName || agent.tradingName || agent.companyName || agent.contactName;
}

function buildContactContext(
  agent: AgentDetail,
  schoolDocumentId?: string,
): AgentContactContext {
  return {
    agentDocumentId: agent.documentId,
    agentSlug: agent.slug,
    agentName: resolveName(agent),
    schoolDocumentId: schoolDocumentId ?? null,
  };
}

export function AgentDetailPage({
  agent,
  activePortal,
  locale,
  schoolDocumentId,
}: AgentDetailPageProps) {
  const sections = agent.sections;
  const contactContext = buildContactContext(agent, schoolDocumentId);

  return (
    <>
      <MarketingHeader activePortal={activePortal} />
      <main className="bg-background">
        <AgentHeroSection agent={agent} />
        <AgentBreadcrumbNav agent={agent} activePortal={activePortal} />
        <AgentStatsStrip agent={agent} />

        <SectionContainer size="wide" className="py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="space-y-6">
              <AgentAboutSection agent={agent} />
              <CredentialsSection agent={agent} />
              <PartnerSchoolsSection agent={agent} activePortal={activePortal} />
              <OfficesSection offices={sections.officeLocations} />
              <LanguagesSection languages={sections.spokenLanguages} />
              <ContactChannelsSection channels={sections.contactChannels} />
              <ServicesSection services={sections.services} />
              <WelfareSection capabilities={sections.welfareCapabilities} />
              <TestimonialsSection testimonials={sections.testimonials} />
              <SuccessStoriesSection stories={sections.successStories} />
              <ExperienceSection entries={sections.experienceEntries} />
              <MembershipsSection memberships={sections.professionalMemberships} />
              <AwardsSection awards={sections.awards} />
              <MarketsSection markets={sections.marketsServed} />
              <DestinationsSection destinations={sections.destinations} />
              <ProcessSection steps={sections.processSteps} />
              <MediaGallerySection mediaItems={sections.mediaItems} />
              <PressSection pressItems={sections.pressItems} />
              <FaqSection faqs={sections.faqs} />
              <CustomSectionRenderer customSections={sections.customSections} />
            </article>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <KeyFactsCard agent={agent} />
              <ContactAgentCard context={contactContext} />
              <AgentTocCard agent={agent} />
            </aside>
          </div>
        </SectionContainer>

        <AgentStructuredData agent={agent} activePortal={activePortal} locale={locale} />
      </main>
      <MarketingFooter activePortal={activePortal} />
    </>
  );
}
