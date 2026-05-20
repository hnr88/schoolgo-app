import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  ContentIndexPage,
  contentTotalPages,
  getContentDefaultCanonical,
  getContentDefaultLanguages,
} from '@/modules/content-pages';

interface PageProps {
  params: Promise<{ locale: string; page: string }>;
}

export function generateStaticParams() {
  return Array.from({ length: contentTotalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `SchoolGo Resource Examples Page ${page} | SchoolGo`,
    description: 'Browse paginated SchoolGo content page examples.',
    alternates: {
      canonical: getContentDefaultCanonical(`/resources/page/${page}`),
      languages: getContentDefaultLanguages(`/resources/page/${page}`),
    },
  };
}

export default async function ResourcesPaginatedPage({ params }: PageProps) {
  const { locale, page } = await params;
  const currentPage = Number(page);
  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > contentTotalPages) {
    notFound();
  }
  setRequestLocale(locale);

  return <ContentIndexPage currentPage={currentPage} />;
}
