import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

const ITEMS: Array<{ key: 'intakes' | 'englishTests' | 'boarding'; seed: string }> = [
  { key: 'intakes', seed: 'admissions-intakes' },
  { key: 'englishTests', seed: 'english-tests' },
  { key: 'boarding', seed: 'boarding-day-school' },
];

export async function ParentsArticles() {
  const t = await getTranslations('ParentsArticles');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {ITEMS.map((item) => (
            <article
              key={item.key}
              className='group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3'
            >
              <div className='relative aspect-[4/3] w-full bg-muted'>
                <Image
                  src={`https://picsum.photos/seed/${item.seed}/720/540`}
                  alt=''
                  fill
                  sizes='(max-width: 768px) 100vw, 400px'
                  className='object-cover'
                  aria-hidden='true'
                />
              </div>
              <div className='flex flex-1 flex-col gap-3 p-6'>
                <h3 className='text-h4 font-semibold leading-snug text-ink-900'>
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className='text-caption text-foggy'>{t(`items.${item.key}.meta`)}</p>
                <Link
                  href='/'
                  className='mt-auto inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary no-underline hover:underline'
                >
                  {t('readMore')}
                  <ArrowRight
                    className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
                    strokeWidth={2}
                    aria-hidden='true'
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
