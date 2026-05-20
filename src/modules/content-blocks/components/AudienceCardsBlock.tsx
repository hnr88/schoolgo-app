import { Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';

export function AudienceCardsBlock() {
  const audiences = [
    { label: 'Families', href: '/parent', text: 'Use the page to plan school fit and next actions.' },
    { label: 'Agents', href: '/agent', text: 'Use the page to support family conversations.' },
    { label: 'Schools', href: '/school', text: 'Use the page pattern to explain admissions clearly.' },
  ];
  return (
    <BlockShell eyebrow='Audiences' title='Audience entry cards' description='Audience cards help one content page serve multiple visitor types.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {audiences.map((audience) => (
          <Link key={audience.label} href={audience.href} className='rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'>
            <Users className='h-5 w-5 text-primary' aria-hidden='true' />
            <span className='mt-5 block text-lg font-semibold text-ink-900'>{audience.label}</span>
            <span className='mt-2 block text-sm leading-6 text-foggy'>{audience.text}</span>
            <span className='mt-4 block text-sm font-semibold text-primary'>Open {audience.label.toLowerCase()}</span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
