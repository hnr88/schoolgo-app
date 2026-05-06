export {
  generateArticleMetadata,
  generatePageMetadata,
  generateRootMetadata,
} from "./lib/generate-metadata";

export {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createEntityGraphJsonLd,
  createFaqJsonLd,
  createHowToJsonLd,
  createOrganizationJsonLd,
  createPersonJsonLd,
  createProductJsonLd,
  createServiceJsonLd,
  createSoftwareAppJsonLd,
  createWebPageJsonLd,
  createWebSiteJsonLd,
  sanitizeJsonLd,
} from "./lib/json-ld";

export { generateLlmsTxt } from "./lib/llms-txt";

export {
  submitUrlToIndexNow,
  submitUrlsToIndexNow,
} from "./lib/indexnow";

export { AeoMeta } from "./components/AeoMeta";
export { EntityGraphJsonLd } from "./components/EntityGraphJsonLd";
export { JsonLd } from "./components/JsonLd";
export { MultiJsonLd } from "./components/MultiJsonLd";

export type {
  AiCrawlerRule,
  ArticleJsonLdInput,
  ArticleSeoInput,
  BreadcrumbItem,
  EntityReference,
  FaqItem,
  HowToJsonLdInput,
  HowToStep,
  LlmsTxtInput,
  LlmsTxtLink,
  LlmsTxtSection,
  OgImage,
  OrganizationInput,
  PersonInput,
  ProductJsonLdInput,
  SeoInput,
  ServiceInput,
  SoftwareAppInput,
} from "./types/seo.types";

export {
  AI_CRAWLER_RULES,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DISALLOWED_PATHS,
  INDEXNOW_KEY,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  TWITTER_HANDLE,
} from "./constants/seo.constants";
