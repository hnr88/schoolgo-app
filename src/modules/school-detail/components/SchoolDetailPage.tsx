import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Users,
  WalletCards,
} from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { CtaLink, SectionContainer, StatusBadge, TrustBadge } from '@/modules/design-system';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import { mediaUrl, type SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

interface SchoolDetailPageProps {
  school: SchoolDetail;
  activePortal: Portal;
}

const formatAud = (value: number | null | undefined): string | null => {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatLabel = (value: string | null | undefined): string | null => {
  if (!value) return null;
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const compactNumber = (value: number | null | undefined): string | null => {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU').format(value);
};

function pickFallbackImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length].replace('w=480&h=360', 'w=1600&h=900');
}

function lowestTuition(school: SchoolDetail): number | null {
  const values = [
    school.primaryAnnualTuition,
    school.juniorSecAnnualTuition,
    school.seniorSecAnnualTuition,
  ].filter((value): value is number => typeof value === 'number');
  return values.length ? Math.min(...values) : null;
}

function InfoCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof School;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-1">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-rausch-50 text-primary">
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </div>
      <p className="text-caption font-semibold uppercase text-foggy">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink-900">{value}</p>
      {detail && <p className="mt-1 text-body-sm text-foggy">{detail}</p>}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0">
      <dt className="text-body-sm text-foggy">{label}</dt>
      <dd className="max-w-[60%] text-right text-body-sm font-semibold text-ink-900">{value}</dd>
    </div>
  );
}

function EnglishScore({ label, value }: { label: string; value: number | string | null }) {
  if (value == null) return null;
  return (
    <StatusBadge tone="muted" size="md" className="justify-between rounded-lg px-3 py-2">
      <span>{label}</span>
      <span className="font-bold text-ink-900">{value}</span>
    </StatusBadge>
  );
}

export async function SchoolDetailPage({ school, activePortal }: SchoolDetailPageProps) {
  const t = await getTranslations('SchoolDetail');
  const tCommon = await getTranslations('Common');

  const location = [school.suburb, school.state, school.postcode].filter(Boolean).join(', ');
  const heroImage = mediaUrl(school.coverImage) ?? pickFallbackImage(school.documentId);
  const logo = mediaUrl(school.logo);
  const tuition = lowestTuition(school);
  const searchHref = activePortal === 'parent' ? '/search' : `/${activePortal}/search`;

  return (
    <>
      <MarketingHeader activePortal={activePortal} variant="dark" />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-divider bg-ink-900 pt-28 text-white md:pt-40">
          <div className="absolute inset-0 opacity-35" aria-hidden="true">
            <Image
              src={heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
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
                  {school.sector && <StatusBadge tone="muted" size="md">{formatLabel(school.sector)}</StatusBadge>}
                </div>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
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
                      <Image
                        src={logo}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <School className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <p className="text-caption font-semibold uppercase text-white/60">{t('admissionsProfileLabel')}</p>
                    <p className="mt-1 text-body-sm text-white/82">
                      {t('admissionsProfileDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        <SectionContainer size="wide" className="py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                  icon={WalletCards}
                  label={t('infoCards.annualTuition')}
                  value={formatAud(tuition) ?? t('infoCards.contactSchool')}
                  detail={tuition ? t('infoCards.lowestListedTuition') : t('infoCards.feesNotListedYet')}
                />
                <InfoCard
                  icon={GraduationCap}
                  label={t('infoCards.curriculum')}
                  value={school.curriculumOffered ?? t('infoCards.notListed')}
                  detail={school.levelsOffered ?? undefined}
                />
                <InfoCard
                  icon={Users}
                  label={t('infoCards.enrolment')}
                  value={compactNumber(school.totalEnrolment) ?? t('infoCards.notListed')}
                  detail={school.internationalStudentPercentage != null ? t('infoCards.internationalPercent', { pct: school.internationalStudentPercentage }) : undefined}
                />
                <InfoCard
                  icon={ShieldCheck}
                  label={t('infoCards.boarding')}
                  value={school.boardingAvailable ? t('infoCards.boardingAvailable') : t('infoCards.notListed')}
                  detail={school.scholarshipAvailable ? t('infoCards.scholarshipsListed') : undefined}
                />
              </div>

              <section className="rounded-lg border border-border bg-card p-5 shadow-1 md:p-6">
                <h2 className="text-2xl font-semibold text-ink-900">{t('aboutSection.heading')}</h2>
                <p className="mt-4 max-w-3xl text-body text-foggy">
                  {school.description ?? t('aboutSection.defaultDescription', { name: school.name })}
                </p>
              </section>

              <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-5 shadow-1 md:p-6">
                  <h2 className="text-xl font-semibold text-ink-900">{t('admissionsSection.heading')}</h2>
                  <dl className="mt-3">
                    <DetailRow label={t('admissionsSection.nextIntake')} value={school.nextIntakeDate} />
                    <DetailRow label={t('admissionsSection.applicationDeadline')} value={school.applicationDeadline} />
                    <DetailRow label={t('admissionsSection.intakePeriods')} value={school.intakePeriods} />
                    <DetailRow label={t('admissionsSection.applicationFee')} value={formatAud(school.applicationFee)} />
                    <DetailRow label={t('admissionsSection.cricosCode')} value={school.cricosCode} />
                  </dl>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 shadow-1 md:p-6">
                  <h2 className="text-xl font-semibold text-ink-900">{t('englishSection.heading')}</h2>
                  <div className="mt-4 grid gap-2">
                    <EnglishScore label="AEAS" value={school.aeasMinScore} />
                    <EnglishScore label="iDAT" value={school.idatMinScore} />
                    <EnglishScore label="Duolingo" value={school.duolingoMinScore} />
                    <EnglishScore label="IELTS" value={school.ieltsMinScore} />
                    <EnglishScore label="PTE Academic" value={school.pteMinScore} />
                    <EnglishScore label="Cambridge" value={school.cambridgeMinScore} />
                  </div>
                  {!school.aeasMinScore && !school.idatMinScore && !school.duolingoMinScore && !school.ieltsMinScore && !school.pteMinScore && !school.cambridgeMinScore && (
                    <p className="mt-4 text-body-sm text-foggy">{t('englishSection.noScoresListed')}</p>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-5 shadow-2">
                <h2 className="text-xl font-semibold text-ink-900">{t('contactSection.heading')}</h2>
                <div className="mt-4 space-y-3">
                  {school.internationalEnrolmentUrl && (
                    <a
                      href={school.internationalEnrolmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-brand hover:bg-rausch-600"
                    >
                      {t('contactSection.startApplication')}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {school.schoolHomepageUrl && (
                    <a
                      href={school.schoolHomepageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-white px-4 py-3 text-sm font-semibold text-hof hover:bg-muted"
                    >
                      {t('contactSection.visitWebsite')}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <CtaLink href="/launching-soon?variant=dashboard" variant="secondary" size="lg" justify>
                    {tCommon('addToShortlist')}
                  </CtaLink>
                </div>

                <div className="mt-5 space-y-3 border-t border-divider pt-5">
                  {school.admissionsEmail && (
                    <a href={`mailto:${school.admissionsEmail}`} className="flex items-center gap-3 text-body-sm text-hof hover:text-primary">
                      <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                      {school.admissionsEmail}
                    </a>
                  )}
                  {school.admissionsPhone && (
                    <a href={`tel:${school.admissionsPhone}`} className="flex items-center gap-3 text-body-sm text-hof hover:text-primary">
                      <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                      {school.admissionsPhone}
                    </a>
                  )}
                  {school.languagesOffered && (
                    <p className="flex items-center gap-3 text-body-sm text-foggy">
                      <Languages className="h-4 w-4 text-primary" aria-hidden="true" />
                      {school.languagesOffered}
                    </p>
                  )}
                  {school.nextIntakeDate && (
                    <p className="flex items-center gap-3 text-body-sm text-foggy">
                      <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                      {t('contactSection.nextIntakeDate', { date: school.nextIntakeDate })}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-babu-100 bg-babu-50 p-5">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-babu-700" aria-hidden="true" />
                  <p className="text-body-sm text-babu-800">
                    {t('trustNotice')}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </SectionContainer>
      </main>
      <MarketingFooter activePortal={activePortal} />
    </>
  );
}
