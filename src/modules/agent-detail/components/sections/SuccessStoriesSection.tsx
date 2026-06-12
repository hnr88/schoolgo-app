import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder, isVideoMedia } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { SuccessStory } from '@/modules/agent-detail/types/agent-detail.types';

interface StoryMediaProps {
  url: string;
  mime?: string | null;
  alt: string;
}

function StoryMedia({ url, mime, alt }: StoryMediaProps) {
  if (isVideoMedia(mime)) {
    return (
      <video controls preload="metadata" className="h-full w-full object-cover">
        <source src={url} type={mime ?? undefined} />
      </video>
    );
  }
  return <Image src={url} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />;
}

export async function SuccessStoriesSection({ stories }: { stories?: SuccessStory[] | null }) {
  const items = (stories ?? []).filter((s) => s.title || s.narrative).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.successStories');

  return (
    <section
      id="success-stories"
      aria-labelledby="success-stories-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="success-stories-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((story, i) => {
          const media = (story.media ?? []).filter((m) => m.url);
          const meta = [story.studentHomeCountry, story.schoolPlacedAt, story.yearLevel]
            .filter(Boolean)
            .join(' · ');
          return (
            <article key={i} className="flex flex-col overflow-hidden rounded-lg border border-divider bg-muted">
              {media.length > 0 ? (
                <div className="relative aspect-video w-full overflow-hidden bg-card">
                  <StoryMedia
                    url={mediaUrl(media[0].url) ?? ''}
                    mime={media[0].mime}
                    alt={story.title ?? ''}
                  />
                </div>
              ) : null}
              <div className="flex grow flex-col p-5">
                {story.studentInitials ? (
                  <p className="text-caption font-semibold uppercase text-foggy">{story.studentInitials}</p>
                ) : null}
                {story.title ? (
                  <h3 className="mt-1 text-lg font-semibold text-ink-900">{story.title}</h3>
                ) : null}
                {meta ? <p className="mt-1 text-body-sm text-foggy">{meta}</p> : null}
                {story.narrative ? (
                  <p className="mt-3 grow text-body-sm leading-relaxed text-foggy">{story.narrative}</p>
                ) : null}
                {story.outcomeHighlights ? (
                  <div className="mt-4 rounded-lg border border-babu-100 bg-babu-50 p-3">
                    <p className="text-caption font-semibold uppercase text-babu-700">{t('outcome')}</p>
                    <p className="mt-1 text-body-sm leading-relaxed text-babu-700">{story.outcomeHighlights}</p>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
