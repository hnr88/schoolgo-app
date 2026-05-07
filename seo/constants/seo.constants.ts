import type { AiCrawlerRule } from "@/modules/seo/types/seo.types";

export const SITE_NAME = "The LLM Space";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thellm.space";
export const SITE_DESCRIPTION =
  "The LLM Space — your hub for AI tools, models, and resources.";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-default.png`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en"] as const;

export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 160;

export const TWITTER_HANDLE = "@thellmspace";

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
} as const;

export const AI_CRAWLER_RULES: AiCrawlerRule[] = [
  // Citation/search bots — ALLOW (these power AI search results and citations)
  { userAgent: "OAI-SearchBot", allow: true },
  { userAgent: "ChatGPT-User", allow: true },
  { userAgent: "ClaudeBot", allow: true },
  { userAgent: "Claude-User", allow: true },
  { userAgent: "Claude-SearchBot", allow: true },
  { userAgent: "PerplexityBot", allow: true },
  { userAgent: "Perplexity-User", allow: true },
  { userAgent: "Google-Extended", allow: true },
  { userAgent: "Applebot-Extended", allow: true },
  { userAgent: "DuckAssistBot", allow: true },
  { userAgent: "MistralAI-User", allow: true },
  { userAgent: "Amazonbot", allow: true },
  // Training-only bots — BLOCK (no citation benefit, only data extraction)
  { userAgent: "GPTBot", allow: false },
  { userAgent: "Bytespider", allow: false },
  { userAgent: "CCBot", allow: false },
  { userAgent: "Meta-ExternalAgent", allow: false },
  { userAgent: "cohere-ai", allow: false },
  { userAgent: "Diffbot", allow: false },
  { userAgent: "PanguBot", allow: false },
];

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "";

export const DISALLOWED_PATHS = ["/api/", "/admin/", "/_next/"];
