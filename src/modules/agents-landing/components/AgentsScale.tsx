import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader, TrustBadge } from '@/modules/design-system';

const AGENTS: Array<{ key: 'a' | 'b' | 'c' | 'd'; seed: string }> = [
  { key: 'a', seed: 'schoolgo-agent-shanghai' },
  { key: 'b', seed: 'schoolgo-agent-hcmc' },
  { key: 'c', seed: 'schoolgo-agent-kl' },
  { key: 'd', seed: 'schoolgo-agent-seoul' },
];

export async function AgentsScale() {
  const t = await getTranslations('AgentsScale');
  const tc = await getTranslations('Common');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {AGENTS.map((agent) => (
            <article
              key={agent.key}
              className='flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-2 transition-shadow hover:shadow-3'
            >
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-pill border border-border bg-muted'>
                  <Image
                    src={`https://picsum.photos/seed/${agent.seed}/160/160`}
                    alt=''
                    fill
                    sizes='48px'
                    className='object-cover'
                    aria-hidden='true'
                  />
                </div>
                <TrustBadge variant='qeac' label={tc('qeacVerified')} />
              </div>
              <div className='flex flex-col'>
                <span className='text-body-sm font-semibold text-ink-900'>
                  {t(`agents.${agent.key}.name`)}
                </span>
                <span className='text-caption text-foggy'>{t(`agents.${agent.key}.region`)}</span>
              </div>
              <p className='text-caption text-foggy'>{t(`agents.${agent.key}.meta`)}</p>
            </article>
          ))}
        </div>

        <div>
          <CtaLink href='/agents' arrow>
            {t('cta')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
