import Image from 'next/image';
import { Filter, Headphones, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, StatusBadge, TrustBadge } from '@/modules/design-system';
import type { IconComponent } from '@/modules/design-system';

const STEPS: Array<{ key: 'listen' | 'match' | 'deliver'; icon: IconComponent; comingSoon?: true }> = [
  { key: 'listen', icon: Headphones },
  { key: 'match', icon: Filter, comingSoon: true },
  { key: 'deliver', icon: Send, comingSoon: true },
];

const INBOX_ROWS: Array<{ key: 'scotch' | 'brisbane' | 'sydney'; image: string }> = [
  { key: 'scotch', image: 'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'brisbane', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'sydney', image: 'https://images.unsplash.com/photo-1621241484978-6f60fdb68f1c?auto=format&fit=crop&w=160&h=160&q=80' },
];

export async function AgentsMatching() {
  const t = await getTranslations('AgentsMatching');
  const tc = await getTranslations('Common');
  return (
    <section id='how-it-works' className='py-20 md:py-28'>
      <SectionContainer className='grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16'>
        <div className='flex flex-col gap-6 md:col-span-6'>
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <ol className='mt-4 flex flex-col gap-6'>
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
              <li key={step.key} className='flex gap-4'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <div className='flex flex-col gap-1'>
                  <h3 className='flex items-center gap-2 text-h4 font-semibold text-ink-900'>
                    {t(`steps.${step.key}.title`)}
                    {step.comingSoon && (
                      <StatusBadge>{t(`steps.${step.key}.comingSoon`)}</StatusBadge>
                    )}
                  </h3>
                  <p className='text-body-sm text-foggy'>{t(`steps.${step.key}.description`)}</p>
                </div>
              </li>
              );
            })}
          </ol>
        </div>

        <div className='md:col-span-6'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-3'>
            <div className='flex items-center justify-between border-b border-divider bg-muted px-5 py-3'>
              <span
                className='text-label font-semibold uppercase text-foggy'
                style={{ letterSpacing: '0.08em' }}
              >
                {t('inboxLabel')}
              </span>
              <TrustBadge variant='qeac' label={tc('qeacVerified')} />
            </div>
            <ul className='divide-y divide-divider'>
              {INBOX_ROWS.map((row) => (
                <li key={row.key} className='flex items-center gap-4 px-5 py-4'>
                  <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted'>
                    <Image
                      src={row.image}
                      alt=''
                      fill
                      sizes='48px'
                      className='object-cover'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='flex min-w-0 flex-1 flex-col'>
                    <span className='text-body-sm font-semibold text-ink-900'>
                      {t(`inboxRows.${row.key}.school`)}
                    </span>
                    <span className='text-caption text-foggy'>
                      {t(`inboxRows.${row.key}.location`)}
                    </span>
                  </div>
                  <StatusBadge tone='trust' size='md'>
                    {t(`inboxRows.${row.key}.status`)}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
