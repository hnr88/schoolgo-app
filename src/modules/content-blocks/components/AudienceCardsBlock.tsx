import Image from 'next/image';
import { Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function AudienceCardsBlock({ page }: ContentBlockProps) {
  const audiences = [
    { label: 'Families', audience: 'families', href: '/parent', image: '/images/auth/parent.jpg', text: 'Use the page to plan school fit and next actions.' },
    { label: 'Agents', audience: 'agents', href: '/agent', image: '/images/auth/agent.jpg', text: 'Use the page to support family conversations.' },
    { label: 'Schools', audience: 'schools', href: '/school', image: '/images/auth/school.jpg', text: 'Use the page pattern to explain admissions clearly.' },
  ];
  return (
    <BlockShell eyebrow='Audiences' title='Audience entry cards' description='Audience cards help one content page serve multiple visitor types.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {audiences.map((audience) => (
          <Link key={audience.label} href={audience.href} className='group overflow-hidden rounded-xl border border-border bg-card no-underline shadow-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
            <span className='relative block aspect-video bg-muted'>
              <Image src={audience.image} alt='' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform group-hover:scale-105' aria-hidden='true' />
            </span>
            <span className='block p-6'>
              <Users className='h-5 w-5 text-rausch-700' aria-hidden='true' />
              <span className='mt-5 block text-lg font-semibold text-ink-900'>{audience.label}</span>
              <span className='mt-1 block text-xs font-semibold uppercase text-foggy'>
                {audience.audience === page.audience ? 'Primary audience' : 'Audience route'}
              </span>
              <span className='mt-2 block text-sm leading-6 text-foggy'>{audience.text}</span>
              <span className='mt-4 block text-sm font-semibold text-rausch-700'>Open {audience.label.toLowerCase()}</span>
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
