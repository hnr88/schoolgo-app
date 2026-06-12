import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Building2, Clock, Mail, MapPin, Phone, UserCheck } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { sortByOrder } from '@/modules/agent-detail/lib/section-utils';
import type { OfficeLocation } from '@/modules/agent-detail/types/agent-detail.types';

const OfficeMiniMap = dynamic(
  () =>
    import('@/modules/agent-detail/components/sections/OfficeMiniMap').then(
      (mod) => mod.OfficeMiniMap,
    ),
  { ssr: false },
);

interface OfficesSectionProps {
  offices?: OfficeLocation[];
}

function formatAddress(office: OfficeLocation): string {
  return [office.streetAddress, office.suburb, office.city, office.state, office.country]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(', ');
}

export async function OfficesSection({ offices }: OfficesSectionProps) {
  const items = Array.isArray(offices) ? sortByOrder(offices) : [];
  if (items.length === 0) return null;

  const hasGeo = items.some((o) => typeof o.latitude === 'number' && typeof o.longitude === 'number');
  const t = await getTranslations('AgentDetail.offices');

  return (
    <section
      id="offices"
      aria-labelledby="offices-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="offices-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-2 text-body-sm text-foggy">{t('subheading')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((office, i) => {
          const address = formatAddress(office);
          return (
            <div
              key={`${office.label ?? office.city ?? 'office'}-${i}`}
              className="rounded-lg border border-divider bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-body-sm font-semibold text-ink-900">
                    {office.label || office.city || t('officeFallback')}
                  </p>
                </div>
                {office.isHeadOffice ? (
                  <span className="shrink-0 rounded-pill bg-babu-50 px-2 py-0.5 text-caption font-semibold text-babu-700">
                    {t('headOffice')}
                  </span>
                ) : null}
              </div>

              {address ? (
                <p className="mt-3 flex items-start gap-2 text-body-sm text-foggy">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foggy" aria-hidden="true" />
                  <span>{address}</span>
                </p>
              ) : null}

              {office.regionGrouping ? (
                <p className="mt-1 pl-6 text-caption text-foggy">{office.regionGrouping}</p>
              ) : null}

              {office.openingHours ? (
                <p className="mt-2 flex items-start gap-2 text-body-sm text-foggy">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-foggy" aria-hidden="true" />
                  <span>{office.openingHours}</span>
                </p>
              ) : null}

              {office.phone ? (
                <p className="mt-2 flex items-center gap-2 text-body-sm text-foggy">
                  <Phone className="h-4 w-4 shrink-0 text-foggy" aria-hidden="true" />
                  <a href={`tel:${office.phone}`} className="hover:text-primary">
                    {office.phone}
                  </a>
                </p>
              ) : null}

              {office.email ? (
                <p className="mt-2 flex items-center gap-2 text-body-sm text-foggy">
                  <Mail className="h-4 w-4 shrink-0 text-foggy" aria-hidden="true" />
                  <a href={`mailto:${office.email}`} className="hover:text-primary">
                    {office.email}
                  </a>
                </p>
              ) : null}

              {office.inPersonConsultation ? (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-muted px-2.5 py-1 text-caption font-semibold text-hof">
                  <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('inPerson')}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {hasGeo ? <OfficeMiniMap offices={items} /> : null}
    </section>
  );
}
