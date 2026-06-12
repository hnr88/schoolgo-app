import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { ProfessionalMembership } from '@/modules/agent-detail/types/agent-detail.types';

export async function MembershipsSection({
  memberships,
}: {
  memberships?: ProfessionalMembership[] | null;
}) {
  const items = (memberships ?? []).filter((m) => m.organisation).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.memberships');

  return (
    <section
      id="memberships"
      aria-labelledby="memberships-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="memberships-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const logo = mediaUrl(item.logo);
          const detail = [item.membershipLevel, item.memberSince ? t('since', { year: item.memberSince }) : null]
            .filter(Boolean)
            .join(' · ');
          return (
            <li
              key={i}
              className="flex flex-col rounded-lg border border-divider bg-muted p-5"
            >
              <div className="flex items-center gap-3">
                {logo ? (
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-card">
                    <Image src={logo} alt={item.organisation ?? ''} fill sizes="40px" className="object-contain" />
                  </span>
                ) : null}
                <p className="text-body-sm font-semibold text-ink-900">{item.organisation}</p>
              </div>
              {detail ? <p className="mt-3 text-body-sm text-foggy">{detail}</p> : null}
              {item.memberId ? (
                <p className="mt-1 text-caption uppercase text-foggy">{t('memberId', { id: item.memberId })}</p>
              ) : null}
              {item.verificationUrl ? (
                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-babu-700 hover:underline"
                >
                  {t('verify')}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
