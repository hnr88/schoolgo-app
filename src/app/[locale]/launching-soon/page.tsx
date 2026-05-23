import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { portalUrl, siteUrl } from '@/lib/portal-url';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LaunchingSoon' });
  return {
    title: 'Coming soon | SchoolGo',
    description: t('subtitle'),
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ variant?: string }>;
}

export default async function LaunchingSoonPage({
  params,
  searchParams,
}: PageProps) {
  const [{ locale }, { variant }] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);

  const isDashboard = variant === 'dashboard';

  return (
    <main className="min-h-screen bg-muted p-3 text-ink-900 sm:p-5">
      <div className="relative min-h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-2xl bg-background shadow-3 sm:min-h-[calc(100vh-2.5rem)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-28 -top-32 h-[34rem] w-[28rem] rounded-[42%] bg-primary" />
          <div className="absolute -right-20 top-0 h-full w-[28%] min-w-72 skew-x-[-7deg] bg-babu-500" />
          <div className="absolute bottom-0 left-[45%] h-full w-[26rem] skew-x-[8deg] bg-arches-50/80" />
        </div>

        <div className="relative z-[1] flex min-h-[calc(100vh-1.5rem)] flex-col px-5 py-5 sm:min-h-[calc(100vh-2.5rem)] sm:px-8 lg:px-12">
          <header className="flex items-center justify-between">
            <a
              href={siteUrl}
              aria-label="SchoolGo home"
              className="inline-flex items-center"
            >
              <Image
                src="/logos/logo-white.png"
                alt="SchoolGo"
                width={254}
                height={57}
                className="h-[3.3rem] w-auto sm:h-[3.85rem]"
                priority
              />
            </a>
            <span className="inline-flex items-center gap-2 rounded-pill border border-ink-900/10 bg-background/85 px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-1 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              2026
            </span>
          </header>

          <section className="flex flex-1 items-center py-10 lg:py-14">
            {isDashboard ? (
              <DashboardContent locale={locale} />
            ) : (
              <GenericContent locale={locale} />
            )}
          </section>

          <footer className="border-t border-ink-900/10 py-5 text-center text-xs text-foggy sm:text-left">
            Search is open while we finish building.
          </footer>
        </div>
      </div>
    </main>
  );
}

function GenericContent({ locale }: { locale: string }) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-xl border border-ink-900/10 bg-background/95 p-8 text-center shadow-4 backdrop-blur-xl sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rausch-50">
          <Clock className="h-7 w-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          Coming soon
        </h1>
        <p className="mt-4 text-base leading-relaxed text-foggy">
          We&apos;re working on this. In the meantime, search and compare
          Australian schools or explore our free guides.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={portalUrl('parent', locale) + '/search'}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search schools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={portalUrl('parent', locale)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-900/10 bg-card px-6 py-3 text-sm font-semibold text-ink-900 shadow-1 transition-colors hover:border-primary/25 hover:text-primary"
          >
            Back to SchoolGo
          </a>
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ locale }: { locale: string }) {
  return (
    <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(420px,0.95fr)]">
      <div className="rounded-xl border border-ink-900/10 bg-background/95 p-6 shadow-4 backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="flex max-w-2xl flex-col">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-pill bg-rausch-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            Login dashboard coming soon
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-normal text-ink-900 sm:text-6xl">
            Dashboard coming soon.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foggy sm:text-lg">
            We are preparing accounts, shortlists, and application tracking. Until
            then, use Search to find and compare schools.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-foggy">
            {['No login needed', 'Search is live', 'Dashboards next'].map(
              (item) => (
                <div key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-primary/80"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ),
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={portalUrl('parent', locale) + '/search'}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search schools now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={portalUrl('parent', locale)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-ink-900/10 bg-card px-6 py-3 text-sm font-semibold text-ink-900 shadow-1 transition-colors hover:border-primary/25 hover:text-primary"
            >
              Back to SchoolGo
            </a>
          </div>
        </div>
      </div>

      <div className="relative min-h-[26rem] lg:min-h-[34rem]">
        <div className="absolute left-4 top-6 w-[82%] max-w-md rotate-[-4deg] rounded-xl border border-ink-900/10 bg-card p-4 shadow-4 sm:left-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-rausch-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-arches-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-babu-500" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foggy">
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
              Dashboard preview
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-md bg-muted p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900">
                  Saved school dashboard
                </p>
                <p className="text-xs text-foggy">
                  Shortlists, applications, messages
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md bg-rausch-50 p-3">
                <p className="text-lg font-bold text-primary">12</p>
                {/* TODO i18n: LaunchingSoon.stats.schools */}
                <p className="text-xs text-foggy">Schools</p>
              </div>
              <div className="rounded-md bg-babu-50 p-3">
                <p className="text-lg font-bold text-babu-700">4</p>
                {/* TODO i18n: LaunchingSoon.stats.shortlist */}
                <p className="text-xs text-foggy">Shortlist</p>
              </div>
              <div className="rounded-md bg-arches-50 p-3">
                <p className="text-lg font-bold text-arches-700">2</p>
                {/* TODO i18n: LaunchingSoon.stats.ready */}
                <p className="text-xs text-foggy">Ready</p>
              </div>
            </div>

            <div className="rounded-md border border-divider p-3">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-foggy">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Search ready now
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-muted" />
                <div className="h-2 w-4/5 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>

        <a
          href={portalUrl('parent', locale) + '/search'}
          className="absolute bottom-8 right-4 w-56 rotate-[5deg] rounded-xl bg-ink-900 p-4 text-white no-underline shadow-4 transition-transform hover:rotate-[3deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:right-8"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="flex items-center justify-between gap-3 text-sm font-semibold">
            Search stays open
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Browse Australian schools while account tools are being finished.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/80">
            <CheckCircle2
              className="h-3.5 w-3.5 text-babu-500"
              aria-hidden="true"
            />
            No login required
          </div>
        </a>
      </div>
    </div>
  );
}
