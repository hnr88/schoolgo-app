import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, SchoolCard } from '@/modules/design-system';

const CARDS: Array<{ key: 'a' | 'b' | 'c' | 'd'; seed: string }> = [
  { key: 'a', seed: 'scotch-college-hawthorn' },
  { key: 'b', seed: 'sydney-grammar-darlinghurst' },
  { key: 'c', seed: 'brisbane-grammar-spring-hill' },
  { key: 'd', seed: 'christ-church-grammar-claremont' },
];

export async function ParentsVerified() {
  const t = await getTranslations('ParentsVerified');
  const tc = await getTranslations('Common');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {CARDS.map((card) => (
            <SchoolCard
              key={card.key}
              photoUrl={`https://picsum.photos/seed/${card.seed}/640/480`}
              name={t(`cards.${card.key}.name`)}
              location={`${t(`cards.${card.key}.location`)} · ${t(`cards.${card.key}.sector`)}`}
              cricosLabel={tc('cricosVerified')}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
