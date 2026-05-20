import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  ContentIndexPage,
  getContentDefaultCanonical,
  getContentDefaultLanguages,
} from '@/modules/content-pages';

const title = 'SchoolGo Resource Page Examples | SchoolGo';
const description =
  'Browse example SchoolGo content pages for admissions, fees, curriculum, events, schools, company content, and replaceable public pages.';
const image = '/images/auth/school.jpg';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title,
    description,
    alternates: {
      canonical: getContentDefaultCanonical('/resources'),
      languages: getContentDefaultLanguages('/resources'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentIndexPage />;
}
