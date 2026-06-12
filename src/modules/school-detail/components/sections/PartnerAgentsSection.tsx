'use client';

import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/modules/design-system';
import { useSchoolPartnerAgents } from '@/modules/school-detail/queries/use-school-partner-agents.query';
import { PartnerAgentCard } from '@/modules/school-detail/components/sections/PartnerAgentCard';

export function PartnerAgentsSection({ schoolDocumentId }: { schoolDocumentId: string }) {
  const t = useTranslations('SchoolDetail.partnerAgents');
  const { data: agents } = useSchoolPartnerAgents(schoolDocumentId);

  if (!agents || agents.length === 0) return null;

  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="agents-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-4 max-w-3xl text-body leading-relaxed text-foggy">{t('intro')}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {agents.map((agent) => (
          <PartnerAgentCard
            key={agent.documentId}
            agent={agent}
            schoolDocumentId={schoolDocumentId}
            verifiedLabel={t('verifiedLabel')}
            profileLabel={t('viewProfile')}
            talkLabel={t('talkCta')}
          />
        ))}
      </div>
    </section>
  );
}
