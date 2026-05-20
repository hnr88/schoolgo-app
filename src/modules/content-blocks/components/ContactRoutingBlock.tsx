import { Mail, MessageCircle, School } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';

export function ContactRoutingBlock() {
  const routes = [
    { icon: Mail, label: 'Family question', href: '/contact', text: 'Ask about shortlists, fees, documents, or arrival planning.' },
    { icon: MessageCircle, label: 'Agent question', href: '/agent', text: 'Discuss partner workflows, applications, and resources.' },
    { icon: School, label: 'School question', href: '/school', text: 'Claim a profile, review data, or plan admissions content.' },
  ];
  return (
    <BlockShell eyebrow='Contact' title='Route the visitor' description='Contact routing blocks prevent one generic contact page from becoming a dead end.' tone='muted'>
      <div className='grid gap-5 md:grid-cols-3'>
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link key={route.label} href={route.href} className='rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'>
              <Icon className='h-5 w-5 text-primary' aria-hidden='true' />
              <span className='mt-5 block text-lg font-semibold text-ink-900'>{route.label}</span>
              <span className='mt-2 block text-sm leading-6 text-foggy'>{route.text}</span>
            </Link>
          );
        })}
      </div>
    </BlockShell>
  );
}
