import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { GuideCTAProps } from '@/modules/guides/types/guides.types';

export function GuideCTA({
  heading,
  text,
  buttonLabel,
  buttonHref,
  relatedGuides,
}: GuideCTAProps) {
  return (
    <>
      {relatedGuides && relatedGuides.length > 0 && (
        <section className="border-t border-border py-10 md:py-14">
          <SectionContainer>
            <h2 className="mb-8 font-display text-4xl font-bold leading-display tracking-display text-ink-900 md:text-5xl">
              Related guides
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block overflow-hidden rounded-xl border border-border bg-card shadow-2 transition hover:shadow-3"
                >
                  <div className="relative h-48 overflow-hidden border-b border-border bg-muted">
                    {guide.image ? (
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 text-quill"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 p-6">
                    <h3 className="font-semibold text-ink-900 group-hover:underline">
                      {guide.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-hof">
                      {guide.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      <section className="relative overflow-hidden bg-ink-900 py-10 md:py-14">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, oklch(0.7 0.15 25) 0%, transparent 50%), radial-gradient(circle at 75% 50%, oklch(0.6 0.15 250) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        <SectionContainer className="relative text-center">
          <h2 className="mb-4 font-display text-4xl font-bold leading-display tracking-display text-background md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-background/75">
            {text}
          </p>
          <Link
            href={buttonHref}
            className="inline-block rounded-pill bg-background px-8 py-3 font-semibold text-ink-900 shadow-2 transition hover:bg-background/90"
          >
            {buttonLabel}
          </Link>
        </SectionContainer>
      </section>
    </>
  );
}
