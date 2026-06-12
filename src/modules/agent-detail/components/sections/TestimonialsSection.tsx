import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Star, BadgeCheck } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder, clampStars } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { Testimonial } from '@/modules/agent-detail/types/agent-detail.types';

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < count ? 'h-4 w-4 fill-vivid-amber text-vivid-amber' : 'h-4 w-4 text-divider'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export async function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] | null }) {
  const items = (testimonials ?? []).filter((t) => t.quote).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.testimonials');

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="testimonials-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item, i) => {
          const photo = mediaUrl(item.photo);
          const stars = clampStars(item.ratingStars);
          const meta = [item.reviewerCountry, item.schoolPlacedAt, item.year]
            .filter(Boolean)
            .join(' · ');
          return (
            <li key={i} className="flex flex-col rounded-lg border border-divider bg-muted p-5">
              <div className="flex items-center gap-3">
                {photo ? (
                  <Image
                    src={photo}
                    alt={item.reviewerName ?? ''}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="truncate text-body-sm font-semibold text-ink-900">
                    {item.reviewerName ?? t('anonymous')}
                  </p>
                  {item.reviewerType ? (
                    <p className="text-caption uppercase text-foggy">{t(`role.${item.reviewerType}`)}</p>
                  ) : null}
                </div>
              </div>

              {stars > 0 ? (
                <div className="mt-3">
                  <Stars count={stars} label={t('ratingLabel', { count: stars })} />
                </div>
              ) : null}

              <blockquote className="mt-3 grow text-body-sm leading-relaxed text-foggy">
                “{item.quote}”
              </blockquote>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {item.verifiedPlacement ? (
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-babu-50 px-2.5 py-1 text-xs font-semibold text-babu-700">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                    {t('verifiedPlacement')}
                  </span>
                ) : null}
                {meta ? <p className="text-caption text-foggy">{meta}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
