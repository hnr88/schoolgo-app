import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SectionContainer } from '@/modules/design-system';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';
import type { Portal } from '@/lib/portal-url';

interface AgentBreadcrumbNavProps {
  agent: AgentDetail;
  activePortal: Portal;
}

function resolveName(agent: AgentDetail): string {
  return agent.displayName || agent.tradingName || agent.companyName || agent.contactName;
}

export async function AgentBreadcrumbNav({ agent, activePortal }: AgentBreadcrumbNavProps) {
  const t = await getTranslations('AgentDetail.breadcrumbs');

  const homeHref = activePortal === 'parent' ? '/' : `/${activePortal}`;
  const agentsHref = activePortal === 'parent' ? '/search?mode=agents' : `/${activePortal}/agents`;

  return (
    <Breadcrumb>
      <SectionContainer size="wide" className="py-3">
        <BreadcrumbList className="text-sm text-foggy">
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={homeHref} />}
              className="text-hof underline hover:text-ink-900"
            >
              {t('home')}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-quill" />

          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={agentsHref} />}
              className="text-hof underline hover:text-ink-900"
            >
              {t('agents')}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-quill" />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-hof">{resolveName(agent)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </SectionContainer>
    </Breadcrumb>
  );
}
