import { contentCategories } from '@/modules/content-pages/constants/content-categories.constants';
import {
  CONTENT_PAGE_SIZE,
} from '@/modules/content-pages/constants/content-page-generation.constants';
import { contentPageSeeds } from '@/modules/content-pages/constants/content-page-seeds.constants';
import {
  createContentPage,
  getResourcePagePath,
} from '@/modules/content-pages/lib/content-page-builder';
import type {
  ContentCategory,
  ContentPage,
} from '@/modules/content-pages/types/content-pages.types';

export { CONTENT_PAGE_SIZE, contentCategories };

const categoryBySlug = Object.fromEntries(
  contentCategories.map((category) => [category.slug, category]),
) as Record<string, ContentCategory>;

export const contentPages = contentPageSeeds.map((seed, index) =>
  createContentPage(seed, index, categoryBySlug),
);

export const contentPageRegistry = Object.fromEntries(
  contentPages.map((page) => [page.slug, page]),
) as Record<string, ContentPage>;

export const contentSlugs = contentPages.map((page) => page.slug);

export const contentCategorySlugs = contentCategories.map((category) => category.slug);

export const contentTotalPages = Math.ceil(contentPages.length / CONTENT_PAGE_SIZE);

export function getContentPage(slug: string) {
  return contentPageRegistry[slug];
}

export function getContentCategory(categorySlug: string) {
  return categoryBySlug[categorySlug];
}

export function getContentPagesByCategory(categorySlug: string) {
  return contentPages.filter((page) => page.category === categorySlug);
}

export function getPaginatedContentPages(page: number) {
  const start = (page - 1) * CONTENT_PAGE_SIZE;
  return contentPages.slice(start, start + CONTENT_PAGE_SIZE);
}

export function getRelatedContentPages(page: ContentPage, limit = 3) {
  const sameCategory = contentPages.filter(
    (item) => item.category === page.category && item.slug !== page.slug,
  );
  const sameAudience = contentPages.filter(
    (item) => item.audience === page.audience && item.slug !== page.slug,
  );

  return [...sameCategory, ...sameAudience]
    .filter((item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index)
    .slice(0, limit);
}

export function getContentHref(page: ContentPage) {
  return getResourcePagePath(page.slug);
}
