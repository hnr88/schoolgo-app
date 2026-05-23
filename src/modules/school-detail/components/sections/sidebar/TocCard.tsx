import { getTranslations } from 'next-intl/server';

const TOC_ITEMS = [
  'about',
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

export async function TocCard() {
  const t = await getTranslations('SchoolDetail.sidebar.toc');

  return (
    <section aria-labelledby="toc-heading" className="rounded-xl border border-border bg-card p-5 shadow-2">
      <h2 id="toc-heading" className="mb-5 text-xl font-semibold text-ink-900">{t('heading')}</h2>
      <nav aria-labelledby="toc-heading">
        <ul className="space-y-2">
          {TOC_ITEMS.map((id: TocItem) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block rounded-md border-l-2 border-transparent px-3 py-2 text-body-sm text-foggy transition-colors hover:border-primary hover:bg-rausch-50 hover:text-primary"
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
