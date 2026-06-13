import { redirect } from '@/i18n/navigation';

// "Find an agent" is not a separate page — agent search lives inside the unified
// search (/parent/search with the schools/agents toggle). Redirect any hit here
// to the agents mode of the unified search.
export default async function ParentAgentsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/parent/search?mode=agents', locale });
}
