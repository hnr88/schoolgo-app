import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer, TrustBadge } from '@/modules/design-system';

const AGENTS: Array<{ key: 'a' | 'b' | 'c' | 'd'; seed: string }> = [
  { key: 'a', seed: 'schoolgo-agent-shanghai' },
  { key: 'b', seed: 'schoolgo-agent-hcmc' },
  { key: 'c', seed: 'schoolgo-agent-kl' },
  { key: 'd', seed: 'schoolgo-agent-seoul' },
];

export async function AgentsScale() {
  const t = await getTranslations('AgentsScale');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

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
                <TrustBadge variant='qeac' />
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
          <Link
            href='/agents'
            className='inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
          >
            {t('cta')}
            <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
