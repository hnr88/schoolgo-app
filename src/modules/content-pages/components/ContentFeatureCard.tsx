import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  FileText,
  GitCompare,
  Layers3,
  Network,
  School,
  Users,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ContentFeature } from '@/modules/content-pages/types/content-pages.types';

const icons = {
  check: CheckCircle2,
  compass: Compass,
  file: FileText,
  compare: GitCompare,
  layers: Layers3,
  network: Network,
  school: School,
  users: Users,
  calendar: CalendarDays,
  badge: BadgeCheck,
};

export function ContentFeatureCard({ feature }: { feature: ContentFeature }) {
  const Icon = icons[feature.icon as keyof typeof icons] ?? BadgeCheck;

  const content = (
    <>
      <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-rausch-50 text-primary'>
        <Icon className='h-5 w-5' strokeWidth={1.8} aria-hidden='true' />
      </span>
      <span className='mt-5 block text-lg font-semibold text-ink-900'>{feature.title}</span>
      <span className='mt-2 block text-sm leading-6 text-foggy'>{feature.description}</span>
    </>
  );

  if (!feature.href) {
    return <div className='rounded-lg border border-border bg-card p-6 shadow-1'>{content}</div>;
  }

  return (
    <Link
      href={feature.href}
      className='group rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'
    >
      {content}
      <span className='mt-5 inline-flex text-sm font-semibold text-primary group-hover:text-rausch-600'>
        Open link
      </span>
    </Link>
  );
}
