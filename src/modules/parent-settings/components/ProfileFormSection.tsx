import type { ReactNode } from 'react';

export function ProfileFormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='flex flex-col gap-4'>
      <h3 className='font-display text-base font-semibold tracking-tight text-ink-900'>{title}</h3>
      {children}
    </section>
  );
}
