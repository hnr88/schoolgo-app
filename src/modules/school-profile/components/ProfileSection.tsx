import type { ReactNode } from 'react';

interface ProfileSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ProfileSection({ title, description, children }: ProfileSectionProps) {
  return (
    <section className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-display text-lg font-bold text-ink-900'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      {children}
    </section>
  );
}
