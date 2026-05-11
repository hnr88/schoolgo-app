import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  faqPageJsonLd,
  getAlternateLanguages,
  getCanonicalPath,
} from '@/modules/seo';
import { GuidePageRenderer, GUIDE_SLUGS } from '@/modules/guides';
import { guideRegistry } from '@/modules/guides/data';
import type { GuideSlug } from '@/modules/guides/constants/guides.constants';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = guideRegistry[slug as GuideSlug];
  if (!guide) return {};

  const path = `/guides/${slug}`;
  return {
    title: guide.meta.title,
    description: guide.meta.description,
    alternates: {
      canonical: getCanonicalPath(path, locale),
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title: guide.meta.title,
      description: guide.meta.description,
      type: 'article',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = guideRegistry[slug as GuideSlug];
  if (!guide) notFound();

  const faqSection = guide.sections.find((s) => s.type === 'accordion');
  const faqItems =
    faqSection?.type === 'accordion'
      ? faqSection.items.map((item) => ({
          question: item.question,
          answer: item.paragraphs.join(' '),
        }))
      : [];

  return (
    <>
      <GuidePageRenderer guide={guide} />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(faqItems)),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.meta.title,
            description: guide.meta.description,
            publisher: {
              '@type': 'Organization',
              name: 'SchoolGo',
            },
          }),
        }}
      />
    </>
  );
}
