import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { CustomSection } from '@/modules/agent-detail/types/agent-detail.types';

function bodyParagraphs(body?: string | null): string[] {
  if (!body) return [];
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function CustomBody({ body }: { body?: string | null }) {
  const paragraphs = bodyParagraphs(body);
  if (paragraphs.length === 0) return null;
  return (
    <div className="mt-4 max-w-3xl space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-body leading-relaxed text-foggy">
          {p}
        </p>
      ))}
    </div>
  );
}

function CustomStat({ item }: { item: CustomSection }) {
  return (
    <div className="mt-4 rounded-lg border border-divider bg-muted px-6 py-5 text-center">
      <p className="text-3xl font-bold text-ink-900">{item.title}</p>
      {item.body ? <p className="mt-2 text-body-sm text-foggy">{item.body}</p> : null}
    </div>
  );
}

function CustomLink({ item, label }: { item: CustomSection; label: string }) {
  if (!item.url) return <CustomBody body={item.body} />;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1.5 rounded-md text-body-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function CustomFile({ item, label }: { item: CustomSection; label: string }) {
  const href = mediaUrl(item.fileAttachment);
  if (!href) return <CustomBody body={item.body} />;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1.5 rounded-md text-body-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {item.fileAttachment?.name ?? label}
    </a>
  );
}

function CustomMedia({ item }: { item: CustomSection }) {
  const images = (item.media ?? []).map((m) => mediaUrl(m)).filter((u): u is string => Boolean(u));
  if (images.length === 0) return <CustomBody body={item.body} />;
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <li key={i} className="relative aspect-video overflow-hidden rounded-lg border border-divider bg-muted">
          <Image src={src} alt={item.title ?? ''} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
        </li>
      ))}
    </ul>
  );
}

function CustomList({ body }: { body?: string | null }) {
  const lines = (body ?? '')
    .split(/\n+/)
    .map((l) => l.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);
  if (lines.length === 0) return null;
  return (
    <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5">
      {lines.map((line, i) => (
        <li key={i} className="text-body leading-relaxed text-foggy">
          {line}
        </li>
      ))}
    </ul>
  );
}

function CustomItem({
  item,
  labels,
}: {
  item: CustomSection;
  labels: { viewLink: string; downloadFile: string };
}) {
  return (
    <div className="rounded-lg border border-border bg-card py-8 px-6 shadow-1 md:px-8">
      {item.title && item.sectionType !== 'stat' ? (
        <h3 className="text-xl font-bold text-ink-900 md:text-2xl">{item.title}</h3>
      ) : null}
      {item.sectionType === 'stat' ? <CustomStat item={item} /> : null}
      {item.sectionType === 'link' ? <CustomLink item={item} label={labels.viewLink} /> : null}
      {item.sectionType === 'file' ? <CustomFile item={item} label={labels.downloadFile} /> : null}
      {item.sectionType === 'media' ? <CustomMedia item={item} /> : null}
      {item.sectionType === 'list' ? <CustomList body={item.body} /> : null}
      {item.sectionType === 'rich_text' || !item.sectionType ? <CustomBody body={item.body} /> : null}
    </div>
  );
}

export async function CustomSectionRenderer({
  customSections,
}: {
  customSections?: CustomSection[] | null;
}) {
  const items = (customSections ?? []).filter((s) => s.isVisible !== false).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.custom');
  const labels = { viewLink: t('viewLink'), downloadFile: t('downloadFile') };

  return (
    <div id="customSections" className="flex flex-col gap-4">
      {items.map((item, i) => (
        <CustomItem key={i} item={item} labels={labels} />
      ))}
    </div>
  );
}
