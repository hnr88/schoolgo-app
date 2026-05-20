import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const governanceRows = [
  ['Data quality', 'Profile owner', 'Fees, CRICOS, availability', 'Monthly'],
  ['Family readiness', 'Admissions lead', 'Documents, timing, constraints', 'Weekly'],
  ['Partner compliance', 'Operations lead', 'Consent, notes, disclosures', 'Fortnightly'],
  ['Service health', 'Growth lead', 'Response times, conversion signals', 'Quarterly'],
] as const;

export function GovernanceMatrixBlock({ page }: ContentBlockProps) {
  const firstLink = page.links[0];

  return (
    <BlockShell
      eyebrow='Governance'
      title='Controls, owners, and review cadence'
      description='A denser matrix block for policy, compliance, data quality, and operating pages.'
      tone='plain'
    >
      <div className='grid gap-5 lg:grid-cols-3'>
        <div className='overflow-hidden rounded-lg border border-border bg-card shadow-2 lg:col-span-2'>
          <div className='grid gap-4 border-b border-border bg-muted p-5 md:grid-cols-4'>
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <p className='text-xs font-semibold uppercase text-rausch-700'>{fact.label}</p>
                <p className='mt-1 text-sm font-semibold text-ink-900'>{fact.value}</p>
              </div>
            ))}
          </div>
          <div className='divide-y divide-border'>
            {governanceRows.map(([area, owner, evidence, cadence], index) => (
              <div key={area} className='grid gap-4 p-5 transition-colors hover:bg-muted md:grid-cols-4 md:items-center'>
                <div className='flex items-center gap-3'>
                  <ShieldCheck className='h-5 w-5 text-rausch-700' aria-hidden='true' />
                  <span className='font-semibold text-ink-900'>{area}</span>
                </div>
                <span className='text-sm text-foggy'>{owner}</span>
                <span className='text-sm text-foggy'>{page.decisionPoints[index % page.decisionPoints.length].evidence || evidence}</span>
                <span className='rounded-pill bg-babu-50 px-3 py-1 text-sm font-semibold text-hof'>
                  {cadence}
                </span>
              </div>
            ))}
          </div>
        </div>
        <aside className='overflow-hidden rounded-lg border border-border bg-card shadow-1'>
          <div className='relative aspect-video bg-muted'>
            <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 1024px) 100vw, 33vw' className='object-cover' />
          </div>
          <div className='p-5'>
            <StatusBadge tone='trust'>Evidence context</StatusBadge>
            <p className='mt-3 text-lg font-semibold text-ink-900'>{page.title}</p>
            <p className='mt-2 text-sm leading-6 text-foggy'>{page.description}</p>
            <div className='mt-4 flex flex-wrap gap-2'>
              {page.schemaKeywords.slice(1, 5).map((keyword) => (
                <StatusBadge key={keyword} tone='muted'>{keyword}</StatusBadge>
              ))}
            </div>
          </div>
        </aside>
      </div>
      {firstLink ? (
        <Link href={firstLink.href} className='mt-5 inline-flex text-sm font-semibold text-rausch-700'>
          {firstLink.label}
        </Link>
      ) : null}
    </BlockShell>
  );
}
