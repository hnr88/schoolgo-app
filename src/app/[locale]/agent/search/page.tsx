import { setRequestLocale } from 'next-intl/server';
import { SearchPageContent } from '@/modules/school-search/components/SearchPageContent';

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SearchPageContent activePortal="agent" />;
}
