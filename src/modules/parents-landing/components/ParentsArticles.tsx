import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { guideRegistry } from '@/modules/guides/data';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';
import type { GuideSlug } from '@/modules/guides/constants/guides.constants';

const ARTICLE_GUIDE_MAP: Array<{ key: string; slug: string }> = [
  { key: 'intakes', slug: 'term-dates-intakes' },
  { key: 'englishTests', slug: 'english-requirements' },
  { key: 'boarding', slug: 'accommodation' },
];

export async function ParentsArticles() {
  const t = await getTranslations('ParentsArticles');
  return (
    <section className='py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {ARTICLE_GUIDE_MAP.map(({ key, slug }) => {
            const guide = guideRegistry[slug as GuideSlug];
            if (!guide) return null;

            const cardImage = (GUIDE_IMAGES as Record<string, { hero: string; card?: string }>)[slug]?.card
              ?? (GUIDE_IMAGES as Record<string, { hero: string }>)[slug]?.hero;

            return (
              <article
                key={key}
                className='group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3'
              >
                <div className='relative aspect-[4/3] w-full bg-muted'>
                  {cardImage && (
                    <Image
                      src={cardImage}
                      alt=''
                      fill
                      sizes='(max-width: 768px) 100vw, 400px'
                      className='object-cover transition-transform duration-300 group-hover:scale-105'
                      aria-hidden='true'
                    />
                  )}
                </div>
                <div className='flex flex-1 flex-col gap-3 p-6'>
                  <h3 className='text-h4 font-semibold leading-snug text-ink-900'>
                    {guide.hero.breadcrumbLabel}
                  </h3>
                  <p className='line-clamp-2 text-caption text-foggy'>
                    {guide.hero.subtitle}
                  </p>
                  <Link
                    href={`/guides/${slug}`}
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
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
