import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAlternateLanguages, getCanonicalPath } from '@/lib/seo';
import { SectionContainer } from '@/modules/design-system';
import { GUIDE_SLUGS } from '@/modules/guides';
import { guideRegistry } from '@/modules/guides/data';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Guides for International Families | SchoolGo',
    description:
      'Free guides to help international families navigate Australian schooling — from choosing a school and understanding fees to visa requirements and student welfare.',
    alternates: {
      canonical: getCanonicalPath('/guides', locale),
      languages: getAlternateLanguages('/guides'),
    },
    openGraph: {
      title: 'Guides for International Families | SchoolGo',
      description:
        'Free guides to help international families navigate Australian schooling.',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className='border-b border-divider bg-gradient-to-b from-muted/50 to-background pt-28 md:pt-40'>
        <SectionContainer className='pb-12 md:pb-16'>
          <div className='flex items-center gap-2 text-primary'>
            <BookOpen className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
            <span className='text-caption font-semibold uppercase'>Guides</span>
          </div>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            Everything you need to know about Australian schools
          </h1>
          <p className='mt-4 max-w-2xl text-lg text-foggy'>
            Free, practical guides for international families and education agents navigating the Australian school system.
          </p>
        </SectionContainer>
      </section>

      <SectionContainer className='py-12 md:py-16'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {GUIDE_SLUGS.map((slug) => {
            const guide = guideRegistry[slug];
            const cardImage = (GUIDE_IMAGES as Record<string, { hero: string; card?: string }>)[slug]?.card
              ?? (GUIDE_IMAGES as Record<string, { hero: string }>)[slug]?.hero;
            const title = guide.hero.breadcrumbLabel;

            return (
              <Link
                key={slug}
                href={`/guides/${slug}`}
                className='group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2 transition-shadow hover:shadow-3'
              >
                <div className='relative aspect-3-2 w-full overflow-hidden bg-muted'>
                  {cardImage && (
                    <Image
                      src={cardImage}
                      alt=''
                      fill
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='object-cover transition-transform duration-300 group-hover:scale-105'
                      aria-hidden='true'
                    />
                  )}
                </div>
                <div className='flex flex-1 flex-col gap-2 p-5'>
                  <h2 className='text-lg font-semibold text-ink-900'>{title}</h2>
                  <p className='line-clamp-2 text-body-sm text-foggy'>
                    {guide.meta.description.replace(/ \| SchoolGo$/, '').replace(/\. Free on SchoolGo\.?$/, '.')}
                  </p>
                  <span className='mt-auto inline-flex items-center gap-1 pt-2 text-body-sm font-semibold text-primary transition-colors group-hover:text-rausch-600'>
                    Read guide
                    <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </>
  );
}
