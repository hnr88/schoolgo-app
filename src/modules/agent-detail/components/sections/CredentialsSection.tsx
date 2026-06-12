import { getTranslations } from 'next-intl/server';
import { BadgeCheck, Clock, ExternalLink, ShieldQuestion } from 'lucide-react';
import { Eyebrow, StatusBadge } from '@/modules/design-system';
import type { AgentCredential, AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

interface CredentialsSectionProps {
  agent: AgentDetail;
}

function isVerified(credential: AgentCredential): boolean {
  return credential.verificationStatus === 'verified';
}

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric' }).format(date);
}

interface CredentialCardProps {
  credential: AgentCredential;
  typeLabel: (type: string | null | undefined) => string;
  t: Awaited<ReturnType<typeof getTranslations>>;
}

function CredentialCard({ credential, typeLabel, t }: CredentialCardProps) {
  const verified = isVerified(credential);
  const pending = credential.verificationStatus === 'pending';
  const title = credential.issuingBody || typeLabel(credential.credentialType);
  const issued = formatDate(credential.issueDate);
  const expires = formatDate(credential.expiryDate);

  return (
    <li
      className={
        verified
          ? 'rounded-lg border border-babu-100 bg-babu-50 p-4'
          : 'rounded-lg border border-border bg-card p-4'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-caption font-semibold uppercase text-foggy">
            {typeLabel(credential.credentialType)}
          </p>
          <p className="mt-1 text-body font-semibold text-ink-900">{title}</p>
        </div>
        {verified ? (
          <StatusBadge tone="trust" size="sm">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
            {t('verifiedBadge')}
          </StatusBadge>
        ) : pending ? (
          <StatusBadge tone="muted" size="sm">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
            {t('pendingBadge')}
          </StatusBadge>
        ) : (
          <StatusBadge tone="muted" size="sm">
            <ShieldQuestion className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
            {t('unverifiedBadge')}
          </StatusBadge>
        )}
      </div>

      <dl className="mt-3 space-y-1 text-body-sm text-foggy">
        {credential.registrationNumber && (
          <div className="flex gap-2">
            <dt className="text-foggy">{t('registrationLabel')}:</dt>
            <dd className="font-medium text-ink-900">{credential.registrationNumber}</dd>
          </div>
        )}
        {credential.holderName && (
          <div className="flex gap-2">
            <dt className="text-foggy">{t('holderLabel')}:</dt>
            <dd className="font-medium text-ink-900">{credential.holderName}</dd>
          </div>
        )}
        {issued && (
          <div className="flex gap-2">
            <dt className="text-foggy">{t('issuedLabel')}:</dt>
            <dd className="font-medium text-ink-900">{issued}</dd>
          </div>
        )}
        {expires && (
          <div className="flex gap-2">
            <dt className="text-foggy">{t('expiresLabel')}:</dt>
            <dd className="font-medium text-ink-900">{expires}</dd>
          </div>
        )}
      </dl>

      {credential.verificationUrl && (
        <a
          href={credential.verificationUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-body-sm font-semibold text-babu-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {t('verifyLink')}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
        </a>
      )}
    </li>
  );
}

export async function CredentialsSection({ agent }: CredentialsSectionProps) {
  const credentials = agent.sections.credentials;
  if (!credentials || credentials.length === 0) return null;

  const t = await getTranslations('AgentDetail.credentials');
  const tType = await getTranslations('AgentDetail.credentials.type');
  const typeLabel = (type: string | null | undefined): string =>
    type && tType.has(type) ? tType(type) : tType('other');

  const verified = credentials.filter(isVerified);
  const selfReported = credentials.filter((c) => !isVerified(c));

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="rounded-lg border border-border bg-card px-6 py-10 shadow-1 md:px-8 md:py-14"
    >
      <Eyebrow tone="trust">{t('eyebrow')}</Eyebrow>
      <h2 id="credentials-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-3 max-w-2xl text-body text-foggy">{t('subheading')}</p>

      {verified.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-babu-700">{t('verifiedGroup')}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {verified.map((credential, index) => (
              <CredentialCard
                key={`v-${index}`}
                credential={credential}
                typeLabel={typeLabel}
                t={t}
              />
            ))}
          </ul>
        </div>
      )}

      {selfReported.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-foggy">{t('selfReportedGroup')}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {selfReported.map((credential, index) => (
              <CredentialCard
                key={`s-${index}`}
                credential={credential}
                typeLabel={typeLabel}
                t={t}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
