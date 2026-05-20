import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  ContentCategoryPage,
  contentCategorySlugs,
  getContentDefaultCanonical,
  getContentDefaultLanguages,
  getContentCategory,
} from '@/modules/content-pages';

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export function generateStaticParams() {
  return contentCategorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getContentCategory(category);
  if (!categoryData) return {};

  const path = `/resources/category/${category}`;
  return {
    title: `${categoryData.label} Resources | SchoolGo`,
    description: categoryData.description,
    alternates: {
      canonical: getContentDefaultCanonical(path),
      languages: getContentDefaultLanguages(path),
    },
  };
}

export default async function ResourceCategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  if (!contentCategorySlugs.includes(category)) notFound();
  setRequestLocale(locale);

  return <ContentCategoryPage categorySlug={category} />;
}
