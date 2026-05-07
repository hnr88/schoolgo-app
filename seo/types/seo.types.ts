import type { Metadata } from "next";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
  noIndex?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
  authors?: string[];
  locale?: string;
  alternateLocales?: string[];
  keywords?: string[];
  type?: "website" | "article" | "profile";
};

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

export type ArticleSeoInput = SeoInput & {
  type: "article";
  publishedAt: string;
  modifiedAt?: string;
  authors: string[];
  section?: string;
  tags?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type OrganizationInput = {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  contactEmail?: string;
  foundingDate?: string;
};

export type PersonInput = {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  description?: string;
};

export type ArticleJsonLdInput = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  author: PersonInput;
  publisherName: string;
  publisherLogo: string;
  keywords?: string[];
  wordCount?: number;
  about?: EntityReference[];
  mentions?: EntityReference[];
};

export type EntityReference = {
  type: string;
  name: string;
  url?: string;
  sameAs?: string;
};

export type ProductJsonLdInput = {
  name: string;
  description: string;
  url: string;
  image: string;
  brand: string;
  price?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  ratingValue?: number;
  reviewCount?: number;
  pros?: string[];
  cons?: string[];
};

export type HowToStep = {
  name: string;
  text: string;
  image?: string;
};

export type HowToJsonLdInput = {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  image?: string;
};

export type ServiceInput = {
  name: string;
  description: string;
  url: string;
  provider: string;
  serviceType?: string;
  areaServed?: string;
};

export type SoftwareAppInput = {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  price?: string;
  currency?: string;
  ratingValue?: number;
  reviewCount?: number;
};

export type LlmsTxtSection = {
  heading: string;
  links: LlmsTxtLink[];
};

export type LlmsTxtLink = {
  title: string;
  url: string;
  description?: string;
};

export type LlmsTxtInput = {
  name: string;
  summary: string;
  description?: string;
  sections: LlmsTxtSection[];
  optionalSections?: LlmsTxtSection[];
};

export type AiCrawlerRule = {
  userAgent: string;
  allow: boolean;
};

export type SeoMetadata = Metadata;
