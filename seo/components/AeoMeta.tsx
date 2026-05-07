import { sanitizeJsonLd } from "@/modules/seo/lib/json-ld";
import { SITE_NAME, SITE_URL } from "@/modules/seo/constants/seo.constants";

type AeoMetaProps = {
  title: string;
  summary: string;
  pageUrl: string;
  topics?: string[];
  contentType?:
    | "article"
    | "faq"
    | "how-to"
    | "product"
    | "tool"
    | "reference"
    | "comparison"
    | "tutorial"
    | "glossary";
  datePublished?: string;
  dateModified?: string;
  author?: string;
  speakableSelectors?: string[];
  entityName?: string;
  entityDescription?: string;
  entitySameAs?: string[];
};

export function AeoMeta({
  title,
  summary,
  pageUrl,
  topics,
  contentType = "reference",
  datePublished,
  dateModified,
  author,
  speakableSelectors,
  entityName,
  entityDescription,
  entitySameAs,
}: AeoMetaProps) {
  const speakableGraph = speakableSelectors
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        name: title,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: speakableSelectors,
        },
      }
    : null;

  const definedTermGraph =
    entityName && entityDescription
      ? {
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: entityName,
          description: entityDescription,
          ...(entitySameAs && { sameAs: entitySameAs }),
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }
      : null;

  return (
    <>
      <meta name="description" content={summary} />
      <meta name="ai-content-type" content={contentType} />
      {topics && <meta name="ai-topics" content={topics.join(", ")} />}
      {author && <meta name="author" content={author} />}
      {datePublished && (
        <meta name="article:published_time" content={datePublished} />
      )}
      {dateModified && (
        <meta name="article:modified_time" content={dateModified} />
      )}
      <meta name="citation_source" content={SITE_NAME} />
      <meta name="citation_source_url" content={SITE_URL} />
      <meta name="citation_title" content={title} />
      <meta name="citation_public_url" content={pageUrl} />
      {speakableGraph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(speakableGraph),
          }}
        />
      )}
      {definedTermGraph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(definedTermGraph),
          }}
        />
      )}
    </>
  );
}
