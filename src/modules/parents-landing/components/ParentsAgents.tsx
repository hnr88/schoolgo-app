import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, AgentCard } from '@/modules/design-system';
import { getFeaturedAgents } from '../lib/featured-agents';

export async function ParentsAgents() {
  const [t, tContact, agents] = await Promise.all([
    getTranslations('ParentsAgents'),
    getTranslations('ContactAgent'),
    getFeaturedAgents(),
  ]);

  return (
    <section id='trusted-agents' className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        {agents.length === 0 ? (
          <p className='text-body text-foggy'>{t('empty')}</p>
        ) : (
          <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
            <div className='flex w-max snap-x snap-mandatory gap-4 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:grid-cols-4'>
              {agents.map((agent) => (
                <div key={agent.documentId} className='w-72 snap-start sm:w-auto'>
                  <AgentCard
                    href={`/parent/agents/${agent.slug ?? agent.documentId}`}
                    name={agent.name}
                    photoUrl={agent.photoUrl}
                    headline={agent.headline}
                    countries={agent.countriesServed}
                    verified={agent.verified}
                    verifiedLabel={t('verifiedLabel')}
                    partnerSchoolsCount={agent.partnerSchoolsCount}
                    partnerSchoolsLabel={t('partnerSchools', { count: agent.partnerSchoolsCount })}
                    agentDocumentId={agent.documentId}
                    talkLabel={tContact('cardTriggerLabel')}
                    className='h-full'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}
