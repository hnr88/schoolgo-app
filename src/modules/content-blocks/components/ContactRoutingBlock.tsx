import Image from 'next/image';
import { Mail, MessageCircle, School } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ContactRoutingBlock({ page }: ContentBlockProps) {
  const routes = [
    { icon: Mail, image: '/images/auth/parent.jpg', label: 'Family question', href: '/contact', text: 'Ask about shortlists, fees, documents, or arrival planning.' },
    { icon: MessageCircle, image: '/images/auth/agent.jpg', label: 'Agent question', href: '/agent', text: 'Discuss partner workflows, applications, and resources.' },
    { icon: School, image: '/images/auth/school.jpg', label: 'School question', href: '/school', text: 'Claim a profile, review data, or plan admissions content.' },
  ];
  return (
    <BlockShell eyebrow='Contact' title='Route the visitor' description='Contact routing blocks prevent one generic contact page from becoming a dead end.' tone='trust'>
      <div className='grid gap-5 md:grid-cols-3'>
        {routes.map((route, index) => {
          const Icon = route.icon;
          return (
            <Link key={route.label} href={route.href} className='group overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 transition-transform duration-300 hover:-translate-y-1 hover:shadow-3'>
              <span className='relative block aspect-video bg-muted'>
                <Image src={route.image} alt='' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform duration-300 group-hover:scale-105' aria-hidden='true' />
              </span>
              <span className='block p-6'>
                <Icon className='h-5 w-5 text-rausch-700' aria-hidden='true' />
                <span className='mt-5 block text-lg font-semibold text-ink-900'>{route.label}</span>
                <span className='mt-1 block text-xs font-semibold uppercase text-foggy'>{page.stakeholders[index]?.metric ?? 'Contact'}</span>
                <span className='mt-2 block text-sm leading-6 text-foggy'>{route.text}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </BlockShell>
  );
}
