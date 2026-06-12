import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder, isVideoMedia } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { MediaItem } from '@/modules/agent-detail/types/agent-detail.types';

function hasRenderable(item: MediaItem): boolean {
  return Boolean(mediaUrl(item.media) || item.videoUrl);
}

export async function MediaGallerySection({ mediaItems }: { mediaItems?: MediaItem[] | null }) {
  const items = (mediaItems ?? []).filter(hasRenderable).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.mediaGallery');

  return (
    <section
      id="mediaItems"
      aria-labelledby="mediaItems-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="mediaItems-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const image = mediaUrl(item.media);
          const isVideo = Boolean(item.videoUrl) || isVideoMedia(item.media?.mime);
          const caption = item.caption ?? null;

          const tile = (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-divider bg-muted">
              {image && !isVideoMedia(item.media?.mime) ? (
                <Image src={image} alt={caption ?? ''} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-ink-900/5">
                  <Play className="h-10 w-10 text-foggy" aria-hidden="true" />
                </div>
              )}
              {isVideo ? (
                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-pill bg-ink-900/80 px-2.5 py-1 text-xs font-semibold text-on-primary">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" strokeWidth={0} />
                  {t('watchVideo')}
                </span>
              ) : null}
            </div>
          );

          return (
            <li key={i} className="flex flex-col gap-2">
              {item.videoUrl ? (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={caption ? `${t('watchVideo')}: ${caption}` : t('watchVideo')}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {tile}
                </a>
              ) : (
                tile
              )}
              {caption ? <p className="text-body-sm text-foggy">{caption}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
