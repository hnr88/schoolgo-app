import { redirect } from '@/i18n/navigation';

export default async function ParentDocumentExpiryRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/parent/documents?tab=expiry', locale });
}
