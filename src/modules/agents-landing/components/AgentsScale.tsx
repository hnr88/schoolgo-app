import { getTranslations } from 'next-intl/server';
import { loadSchools } from '@/lib/schools';
import { CtaLink, SectionContainer, SectionHeader, TrustBadge } from '@/modules/design-system';
import { Link } from '@/i18n/navigation';
import { getFeaturedSchoolsForAgents, hueFromString, initialsFromName } from '../lib/featured-schools';

export async function AgentsScale() {
  const [t, tc, schools] = await Promise.all([
    getTranslations('AgentsScale'),
    getTranslations('Common'),
    loadSchools(),
  ]);

  const featured = getFeaturedSchoolsForAgents(schools, 4);

  return (
    <section className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
          <div className='flex w-max snap-x snap-mandatory gap-5 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-6 sm:px-0 sm:pb-0 lg:grid-cols-4'>
            {featured.map((school) => {
              const hue = hueFromString(school.name);
              return (
                <div key={school.slug} className='w-64 snap-start sm:w-auto'>
                  <Link
                    href={`/agent/schools/${school.slug}`}
                    className='block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  >
                    <article className='flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-2 transition-shadow hover:shadow-3 sm:p-5'>
                      <div className='flex min-w-0 flex-wrap items-center gap-3'>
                        <div
                          className='flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-border text-body-sm font-bold text-white'
                          style={{ backgroundColor: `hsl(${hue} 65% 45%)` }}
                          aria-hidden='true'
                        >
                          {initialsFromName(school.name)}
                        </div>
                        <TrustBadge variant='cricos' label={tc('cricosVerified')} className='max-w-full' />
                      </div>
                      <div className='flex min-w-0 flex-col'>
                        <span className='line-clamp-1 text-body-sm font-semibold text-ink-900'>
                          {school.name}
                        </span>
                        <span className='line-clamp-1 text-caption text-foggy'>
                          {school.suburb}, {school.state}
                        </span>
                      </div>
                      <p className='text-caption text-foggy'>
                        {school.sector} · {school.schoolType}
                      </p>
                    </article>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <CtaLink href='/search' arrow>
            {t('cta')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
