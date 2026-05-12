import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { googleSans } from '@/app/layout';
import { HashScrollHandler, QueryProvider } from '@/modules/core';
import { routing } from '@/i18n/routing';
import {
  getAlternateLanguages,
  organizationJsonLd,
  robotsPolicy,
} from '@/modules/seo';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    robots: robotsPolicy,
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: getAlternateLanguages('/'),
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });

  return (
    <html lang={locale} className={`h-full antialiased ${googleSans.variable}`}>
      <body className='min-h-full flex flex-col overflow-x-hidden'>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-3'
        >
          {t('skipToContent')}
        </a>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <NextIntlClientProvider>
          <QueryProvider>{children}</QueryProvider>
          <HashScrollHandler />
          <Toaster richColors closeButton position='top-right' />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
