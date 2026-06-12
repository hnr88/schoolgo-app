import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import { portalAgentProfilePath } from '@/modules/agent-search/lib/agent-paths';
import type { AgentHit } from '@/modules/agent-search/types/agent-search.types';

interface AgentDirectoryListProps {
  hits: AgentHit[];
  activePortal: Portal;
  locale: string;
}

export async function AgentDirectoryList({ hits, activePortal, locale }: AgentDirectoryListProps) {
  if (hits.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'AgentSearch.directory' });

  return (
    <section aria-label={t('label')} className='sr-only'>
      <h2>{t('heading')}</h2>
      <ul>
        {hits.map((agent) => (
          <li key={agent.documentId}>
            <Link href={portalAgentProfilePath(activePortal, agent.slug ?? agent.documentId)}>
              {agent.name}
              {agent.headline ? ` — ${agent.headline}` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
