import { ArrowLeft, MapPin, School } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { TrustBadge, StatusBadge, SectionContainer } from '@/modules/design-system';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import { mediaUrl, type SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

interface HeroProps {
  school: SchoolDetail;
  activePortal: Portal;
}

function pickFallbackImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length].replace('w=480&h=360', 'w=1600&h=900');
}

function formatLabel(value: string | null | undefined): string | null {
  if (!value) return null;
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function Hero({ school, activePortal }: HeroProps) {
  const t = await getTranslations('SchoolDetail');

  const location = [school.suburb, school.state, school.postcode].filter(Boolean).join(', ');
  const heroImage = mediaUrl(school.coverImage) ?? pickFallbackImage(school.documentId);
  const logo = mediaUrl(school.logo);
  const searchHref = activePortal === 'parent' ? '/search' : `/${activePortal}/search`;

  return (
    <section className="relative overflow-hidden border-b border-divider bg-ink-900 pt-28 text-white md:pt-40">
      <div className="absolute inset-0 opacity-35" aria-hidden="true">
        <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/88 to-ink-900/40" aria-hidden="true" />

      <SectionContainer size="wide" className="relative py-8 md:py-12 lg:py-16">
        <Link
          href={searchHref}
          className="mb-8 inline-flex items-center gap-2 rounded-pill bg-white/10 px-4 py-2 text-body-sm font-medium text-white/78 transition-colors hover:bg-white/18 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {t('backToSearch')}
        </Link>

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <TrustBadge variant="cricos" label={t('cricosVerified')} />
              {school.claimedAt && <TrustBadge variant="claimed" label={t('claimedProfile')} />}
              {school.sector && (
                <StatusBadge tone="muted" size="md">{formatLabel(school.sector)}</StatusBadge>
              )}
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              {school.name}
            </h1>

            {location && (
              <p className="mt-5 flex items-center gap-2 text-lg text-white/78">
                <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                {location}
              </p>
            )}

          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-primary">
                {logo ? (
                  <Image src={logo} alt="" fill sizes="64px" className="object-contain p-2" aria-hidden="true" />
                ) : (
                  <School className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
                )}
              </div>
              <div>
                <p className="text-caption font-semibold uppercase text-white/60">
                  {t('admissionsProfileLabel')}
                </p>
                <p className="mt-1 text-body-sm text-white/82">
                  {t('admissionsProfileDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
