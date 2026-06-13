import { ArrowLeft, Heart, MapPin, School } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { TrustBadge, StatusBadge, SectionContainer } from '@/modules/design-system';
import { FOCUS_RING } from '@/modules/core';
import { generateSchoolPlaceholder } from '@/lib/schools/generate-school-placeholder';
import { mediaUrl, type SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

interface HeroProps {
  school: SchoolDetail;
  activePortal: Portal;
}

function pickFallbackImage(id: string): string {
  return generateSchoolPlaceholder(id);
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
  const applyHref = activePortal === 'agent' ? '#apply' : '#agents';

  return (
    <section className="relative overflow-hidden border-b border-divider bg-ink-900 pt-28 text-background md:pt-40">
      <div className="absolute inset-0 opacity-45" aria-hidden="true">
        <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/35" aria-hidden="true" />

      <SectionContainer size="wide" className="relative py-8 md:py-12 lg:py-16">
        <Link
          href={searchHref}
          className={`mb-8 inline-flex items-center gap-2 rounded-pill bg-background/10 px-4 py-2 text-body-sm font-medium text-background/80 transition-colors duration-200 ease-out-quart hover:bg-background/20 hover:text-background ${FOCUS_RING}`}
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {t('backToSearch')}
        </Link>

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <TrustBadge variant="cricos" label={t('cricosVerified')} />
              {school.claimedAt && <TrustBadge variant="claimed" label={t('claimedProfile')} />}
              {school.sector && (
                <StatusBadge tone="muted" size="md">{formatLabel(school.sector)}</StatusBadge>
              )}
            </div>

            <h1 className="font-display text-display-h1 font-bold leading-tight tracking-tight text-background md:text-5xl">
              {school.name}
            </h1>

            {location && (
              <p className="mt-5 flex items-center gap-2 text-lg text-background/80">
                <MapPin className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {location}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={applyHref}
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-primary px-6 text-body-sm font-semibold text-on-primary shadow-brand transition-[transform,background-color] duration-200 ease-out-quart hover:bg-rausch-600 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 ${FOCUS_RING}`}
              >
                {activePortal === 'agent' ? t('heroApplyCta') : t('heroFindAgentCta')}
              </a>
              <a
                href="#reviews"
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-background/10 px-5 text-body-sm font-semibold text-background transition-colors duration-200 ease-out-quart hover:bg-background/20 ${FOCUS_RING}`}
              >
                <Heart className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {t('heroReviewsCta')}
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-divider bg-card p-6 shadow-2">
            <div className="flex items-center gap-4">
              <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 text-primary">
                {logo ? (
                  <Image src={logo} alt="" fill sizes="64px" className="object-contain p-2" aria-hidden="true" />
                ) : (
                  <School className="size-8" strokeWidth={1.75} aria-hidden="true" />
                )}
              </span>
              <div>
                <p className="text-caption font-semibold uppercase tracking-wide text-foggy">
                  {t('admissionsProfileLabel')}
                </p>
                <p className="mt-1 text-body-sm text-foggy">
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
