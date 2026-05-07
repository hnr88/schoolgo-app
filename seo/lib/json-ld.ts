import type {
  Article,
  BreadcrumbList,
  FAQPage,
  HowTo,
  Organization,
  Person,
  Product,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import type {
  ArticleJsonLdInput,
  BreadcrumbItem,
  EntityReference,
  FaqItem,
  HowToJsonLdInput,
  OrganizationInput,
  PersonInput,
  ProductJsonLdInput,
  ServiceInput,
  SoftwareAppInput,
} from "@/modules/seo/types/seo.types";
import {
  SITE_NAME,
  SITE_URL,
} from "@/modules/seo/constants/seo.constants";

export function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildEntityRef(ref: EntityReference) {
  return {
    "@type": ref.type,
    name: ref.name,
    ...(ref.url && { url: ref.url }),
    ...(ref.sameAs && { sameAs: ref.sameAs }),
  };
}

function buildPersonSchema(input: PersonInput) {
  return {
    "@type": "Person" as const,
    name: input.name,
    ...(input.url && { url: input.url }),
    ...(input.image && { image: input.image }),
    ...(input.jobTitle && { jobTitle: input.jobTitle }),
    ...(input.worksFor && {
      worksFor: { "@type": "Organization" as const, name: input.worksFor },
    }),
    ...(input.sameAs && { sameAs: input.sameAs }),
    ...(input.knowsAbout && { knowsAbout: input.knowsAbout }),
    ...(input.alumniOf && {
      alumniOf: { "@type": "EducationalOrganization" as const, name: input.alumniOf },
    }),
    ...(input.description && { description: input.description }),
  };
}

export function createOrganizationJsonLd(
  input: OrganizationInput,
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${input.url}/#organization`,
    name: input.name,
    url: input.url,
    logo: {
      "@type": "ImageObject",
      url: input.logo,
    },
    ...(input.description && { description: input.description }),
    ...(input.sameAs && { sameAs: input.sameAs }),
    ...(input.knowsAbout && { knowsAbout: input.knowsAbout }),
    ...(input.contactEmail && {
      contactPoint: {
        "@type": "ContactPoint",
        email: input.contactEmail,
        contactType: "customer support",
      },
    }),
    ...(input.foundingDate && { foundingDate: input.foundingDate }),
  } as WithContext<Organization>;
}

export function createPersonJsonLd(
  input: PersonInput,
): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    ...buildPersonSchema(input),
    ...(input.url && { "@id": `${input.url}/#person` }),
  } as WithContext<Person>;
}

export function createWebSiteJsonLd(
  searchUrl?: string,
): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: searchUrl,
        },
        "query-input": "required name=search_term_string",
      } as unknown as WebSite["potentialAction"],
    }),
  } as WithContext<WebSite>;
}

export function createWebPageJsonLd(
  title: string,
  description: string,
  url: string,
  speakableSelectors?: string[],
): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    name: title,
    description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(speakableSelectors && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakableSelectors,
      },
    }),
  } as WithContext<WebPage>;
}

export function createArticleJsonLd(
  input: ArticleJsonLdInput,
): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${input.url}/#article`,
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    datePublished: input.publishedAt,
    ...(input.modifiedAt && { dateModified: input.modifiedAt }),
    author: buildPersonSchema(input.author),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: input.publisherName,
      logo: { "@type": "ImageObject", url: input.publisherLogo },
    },
    mainEntityOfPage: { "@id": `${input.url}/#webpage` },
    ...(input.keywords && { keywords: input.keywords.join(", ") }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    ...(input.about && {
      about: input.about.map(buildEntityRef),
    }),
    ...(input.mentions && {
      mentions: input.mentions.map(buildEntityRef),
    }),
  } as WithContext<Article>;
}

export function createFaqJsonLd(
  items: FaqItem[],
  pageUrl?: string,
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { "@id": `${pageUrl}/#faq` }),
    ...(pageUrl && { mainEntityOfPage: { "@id": `${pageUrl}/#webpage` } }),
    mainEntity: items.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
  } as WithContext<FAQPage>;
}

export function createBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createProductJsonLd(
  input: ProductJsonLdInput,
): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${input.url}/#product`,
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    brand: { "@type": "Brand", name: input.brand },
    ...(input.price && {
      offers: {
        "@type": "Offer",
        price: input.price,
        priceCurrency: input.currency ?? "USD",
        availability: `https://schema.org/${input.availability ?? "InStock"}`,
      },
    }),
    ...(input.ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: input.ratingValue,
        reviewCount: input.reviewCount ?? 0,
      },
    }),
    ...(input.pros && {
      positiveNotes: {
        "@type": "ItemList",
        itemListElement: input.pros.map((pro, i) => ({
          "@type": "ListItem" as const,
          position: i + 1,
          name: pro,
        })),
      },
    }),
    ...(input.cons && {
      negativeNotes: {
        "@type": "ItemList",
        itemListElement: input.cons.map((con, i) => ({
          "@type": "ListItem" as const,
          position: i + 1,
          name: con,
        })),
      },
    }),
  } as WithContext<Product>;
}

export function createHowToJsonLd(
  input: HowToJsonLdInput,
): WithContext<HowTo> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime && { totalTime: input.totalTime }),
    ...(input.image && { image: input.image }),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep" as const,
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

export function createServiceJsonLd(input: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.url}/#service`,
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: input.provider,
    },
    ...(input.serviceType && { serviceType: input.serviceType }),
    ...(input.areaServed && { areaServed: input.areaServed }),
  };
}

export function createSoftwareAppJsonLd(
  input: SoftwareAppInput,
): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${input.url}/#software`,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory,
    ...(input.operatingSystem && {
      operatingSystem: input.operatingSystem,
    }),
    ...(input.price !== undefined && {
      offers: {
        "@type": "Offer",
        price: input.price,
        priceCurrency: input.currency ?? "USD",
      },
    }),
    ...(input.ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: input.ratingValue,
        reviewCount: input.reviewCount ?? 0,
      },
    }),
  } as WithContext<SoftwareApplication>;
}

export function createEntityGraphJsonLd(
  entities: Record<string, unknown>[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": entities,
  };
}
