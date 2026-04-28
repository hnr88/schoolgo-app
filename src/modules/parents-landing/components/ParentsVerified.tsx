import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, SchoolCard } from '@/modules/design-system';

const CARDS: Array<{ key: 'a' | 'b' | 'c' | 'd'; image: string }> = [
  { key: 'a', image: 'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'b', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'c', image: 'https://images.unsplash.com/photo-1651313976327-f10851420a08?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'd', image: 'https://images.unsplash.com/photo-1751510397614-e289eb4ce57a?auto=format&fit=crop&w=640&h=480&q=80' },
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
              photoUrl={card.image}
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
