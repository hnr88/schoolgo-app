import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { HashScrollHandler, QueryProvider } from '@/modules/core';
import { routing } from '@/i18n/routing';
import {
  getAlternateLanguages,
  organizationJsonLd,
  robotsPolicy,
} from '@/lib/seo';
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

  return (
    <html lang={locale} className='h-full antialiased'>
      <body className='min-h-full flex flex-col'>
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
