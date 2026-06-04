import type { StudentFormSectionCardProps } from '@/modules/students/types/component.types';

export function StudentFormSectionCard({
  icon: Icon,
  title,
  description,
  children,
}: StudentFormSectionCardProps) {
  return (
    <section className='rounded-2xl border border-divider bg-card p-6 shadow-1 sm:p-8'>
      <div className='flex items-start gap-4'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rausch-50 text-primary-strong'>
          <Icon className='h-5 w-5' />
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='font-display text-xl font-semibold text-ink-900'>{title}</h2>
          <p className='text-sm text-foggy'>{description}</p>
        </div>
      </div>
      <div className='mt-6 flex flex-col gap-6'>{children}</div>
    </section>
  );
}
