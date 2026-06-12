import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Eyebrow } from '@/modules/design-system';
import { DefaultPhoto } from '@/modules/design-system/components/DefaultPhoto';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import type { AgentDetail, PartnerSchool } from '@/modules/agent-detail/types/agent-detail.types';
import type { Portal } from '@/lib/portal-url';

interface PartnerSchoolsSectionProps {
  agent: AgentDetail;
  activePortal: Portal;
}

function schoolHref(portal: Portal, slug: string): string {
  return `/${portal}/schools/${slug}`;
}

function locationOf(school: PartnerSchool): string | null {
  return [school.suburb, school.state].filter(Boolean).join(', ') || null;
}

export async function PartnerSchoolsSection({ agent, activePortal }: PartnerSchoolsSectionProps) {
  const schools = agent.sections.partnerSchools;
  if (!schools || schools.length === 0) return null;

  const t = await getTranslations('AgentDetail.partnerSchools');

  return (
    <section
      id="partner-schools"
      aria-labelledby="partner-schools-heading"
      className="rounded-lg border border-border bg-card px-6 py-10 shadow-1 md:px-8 md:py-14"
    >
      <Eyebrow tone="trust">{t('eyebrow')}</Eyebrow>
      <h2 id="partner-schools-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-3 max-w-2xl text-body text-foggy">{t('subheading')}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => {
          const logo = mediaUrl(school.logoUrl);
          const location = locationOf(school);
          const card = (
            <article className="group flex h-full items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-2">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                {logo ? (
                  <Image
                    src={logo}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                    aria-hidden="true"
                  />
                ) : (
                  <DefaultPhoto name={school.name} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-body font-semibold text-ink-900">{school.name}</p>
                {location && (
                  <p className="mt-1 flex items-center gap-1 text-body-sm text-foggy">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {location}
                  </p>
                )}
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-foggy transition-colors group-hover:text-babu-700"
                aria-hidden="true"
              />
            </article>
          );

          if (school.slug) {
            return (
              <li key={school.schoolDocumentId}>
                <Link
                  href={schoolHref(activePortal, school.slug)}
                  aria-label={t('viewSchool')}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {card}
                </Link>
              </li>
            );
          }

          return <li key={school.schoolDocumentId}>{card}</li>;
        })}
      </ul>
    </section>
  );
}
