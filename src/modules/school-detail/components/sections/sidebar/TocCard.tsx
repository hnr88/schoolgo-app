import { getTranslations } from 'next-intl/server';
import type { Portal } from '@/lib/portal-url';

const TOC_ITEMS = [
  'about',
  'agents',
  'curriculum',
  'fees',
  'english',
  'admissions',
  'boarding',
  'cocurricular',
  'location',
  'compare',
  'faq',
] as const;

type TocItem = (typeof TOC_ITEMS)[number];

export async function TocCard({ activePortal }: { activePortal?: Portal }) {
  const t = await getTranslations('SchoolDetail.sidebar.toc');

  const items = TOC_ITEMS.filter((id) => id !== 'agents' || activePortal !== 'agent');

  return (
    <section aria-labelledby="toc-heading" className="rounded-lg border border-border bg-card p-5 shadow-1">
      <h2 id="toc-heading" className="mb-5 text-xl font-semibold text-ink-900">{t('heading')}</h2>
      <nav aria-labelledby="toc-heading">
        <ul className="space-y-2">
          {items.map((id: TocItem) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block rounded-md border-l-2 border-transparent px-3 py-2 text-body-sm text-foggy transition-colors hover:border-primary hover:bg-rausch-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                {t(id)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
