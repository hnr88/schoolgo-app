import type { Metadata } from "next";

import type { ArticleSeoInput, SeoInput } from "@/modules/seo/types/seo.types";
import {
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/modules/seo/constants/seo.constants";

export function generatePageMetadata(input: SeoInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    noIndex = false,
    locale = DEFAULT_LOCALE,
    alternateLocales,
    keywords,
    type = "website",
  } = input;

  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      ...(alternateLocales && {
        languages: Object.fromEntries(
          alternateLocales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`]),
        ),
      }),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: TWITTER_HANDLE,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };

  return metadata;
}

export function generateArticleMetadata(input: ArticleSeoInput): Metadata {
  const base = generatePageMetadata(input);
  const { publishedAt, modifiedAt, authors, section, tags } = input;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: publishedAt,
      ...(modifiedAt && { modifiedTime: modifiedAt }),
      authors,
      ...(section && { section }),
      ...(tags && { tags }),
    },
    other: {
      "article:published_time": publishedAt,
      ...(modifiedAt && { "article:modified_time": modifiedAt }),
    },
  };
}

export function generateRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "The LLM Space — your hub for AI tools, models, and resources.",
    applicationName: SITE_NAME,
    referrer: "origin-when-cross-origin",
    creator: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
