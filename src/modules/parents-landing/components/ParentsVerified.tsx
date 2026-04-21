import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer, TrustBadge } from '@/modules/design-system';

const CARDS: Array<{ key: 'a' | 'b' | 'c' | 'd'; seed: string }> = [
  { key: 'a', seed: 'scotch-college-hawthorn' },
  { key: 'b', seed: 'sydney-grammar-darlinghurst' },
  { key: 'c', seed: 'brisbane-grammar-spring-hill' },
  { key: 'd', seed: 'christ-church-grammar-claremont' },
];

export async function ParentsVerified() {
  const t = await getTranslations('ParentsVerified');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-2xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {CARDS.map((card) => (
            <article
              key={card.key}
              className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3'
            >
              <div className='relative aspect-[4/3] w-full bg-muted'>
                <Image
                  src={`https://picsum.photos/seed/${card.seed}/640/480`}
                  alt=''
                  fill
                  sizes='(max-width: 640px) 100vw, 320px'
                  className='object-cover'
                  aria-hidden='true'
                />
              </div>
              <div className='flex flex-1 flex-col gap-2 p-5'>
                <h3 className='text-h4 font-semibold text-ink-900'>
                  {t(`cards.${card.key}.name`)}
                </h3>
                <p className='text-body-sm text-foggy'>
                  {t(`cards.${card.key}.location`)} · {t(`cards.${card.key}.sector`)}
                </p>
                <div className='mt-auto pt-3'>
                  <TrustBadge variant='cricos' />
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
