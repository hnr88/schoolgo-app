import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { GuideContentData } from '@/modules/guides/types/guides.types';
import { GuideWorkflow } from '@/modules/guides/components/GuideWorkflow';

export function GuideContent({
  id,
  heading,
  paragraphs,
  image,
  imageAlt,
  reverse,
  table,
  callout,
  workflow,
}: GuideContentData) {
  const hasImage = !!image;

  return (
    <section id={id} className="bg-background py-20 md:py-28">
      <SectionContainer>
        {hasImage ? (
          <div
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={reverse ? 'lg:order-2' : undefined}>
              <h2 className="mb-6 font-display text-4xl font-bold leading-display tracking-display text-ink-900 md:text-5xl">
                {heading}
              </h2>
              <div className="space-y-4 leading-relaxed text-hof">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {callout && (
                <div className="mt-8 rounded-lg border border-babu-100 bg-babu-50 p-5">
                  <h3 className="mb-2 font-semibold text-babu-800">
                    {callout.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-babu-700">
                    {callout.text}
                  </p>
                  {callout.link && (
                    <Link
                      href={callout.link.href}
                      className="mt-3 inline-block text-sm font-semibold text-babu-700 underline hover:text-babu-800"
                    >
                      {callout.link.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div className="relative aspect-4-3 overflow-hidden rounded-2xl shadow-3">
              <Image
                src={image}
                alt={imageAlt ?? heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-6 font-display text-4xl font-bold leading-display tracking-display text-ink-900 md:text-5xl">
              {heading}
            </h2>
            <div className="space-y-4 leading-relaxed text-hof">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </>
        )}

        {table && (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full overflow-hidden rounded-lg border border-border text-sm">
              <thead className="bg-muted text-hof">
                <tr>
                  {table.headers.map((h) => (
                    <th
                      key={h}
                      className="border-b border-border px-5 py-3 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {table.rows.map((row, ri) => (
                  <tr key={ri} className="transition hover:bg-muted">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-4 ${ci === 0 ? 'font-medium text-ink-900' : 'text-hof'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!hasImage && callout && (
          <div className="mt-8 rounded-lg border border-babu-100 bg-babu-50 p-6">
            <h3 className="mb-2 font-semibold text-babu-800">
              {callout.title}
            </h3>
            <p className="text-sm leading-relaxed text-babu-700">
              {callout.text}
            </p>
            {callout.link && (
              <Link
                href={callout.link.href}
                className="mt-4 inline-block rounded-md border border-babu-200 bg-background px-5 py-2 text-sm font-medium text-babu-700 transition hover:bg-babu-50"
              >
                {callout.link.label}
              </Link>
            )}
          </div>
        )}

        {workflow && <GuideWorkflow {...workflow} />}
      </SectionContainer>
    </section>
  );
}
