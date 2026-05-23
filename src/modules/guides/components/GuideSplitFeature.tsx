import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import { FEATURE_ICON_MAP } from '@/modules/guides/constants/feature-icons.constants';
import type { GuideSplitData } from '@/modules/guides/types/guides.types';

export function GuideSplitFeature({
  id,
  heading,
  paragraphs,
  link,
  reverse,
  features,
}: GuideSplitData) {
  return (
    <section id={id} className="border-y border-border bg-muted py-10 md:py-14">
      <SectionContainer
        className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
      >
        <div className={`space-y-5 ${reverse ? 'lg:order-2' : ''}`}>
          <h2 className="font-display text-4xl font-bold leading-display tracking-display text-ink-900 md:text-5xl">
            {heading}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-body leading-relaxed text-foggy md:text-lg">
                {p}
              </p>
            ))}
          </div>
          {link && (
            <Link
              href={link.href}
              className="mt-2 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-rausch-600"
            >
              {link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="space-y-4">
          {features.map((f) => {
            const Icon = FEATURE_ICON_MAP[f.emoji] ?? BookOpen;
            return (
              <div
                key={f.title}
                className="group relative flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-2 transition-all hover:-translate-y-0.5 hover:shadow-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{f.title}</p>
                  <p className="mt-1 text-body-sm leading-relaxed text-foggy">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
