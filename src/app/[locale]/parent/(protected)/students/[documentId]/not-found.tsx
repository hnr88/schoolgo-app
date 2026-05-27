import { getTranslations } from 'next-intl/server';
import { Users } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function StudentNotFound() {
  const t = await getTranslations('ParentStudents');

  return (
    <div className='flex flex-col items-center justify-center gap-6 py-24 text-center'>
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-muted'>
        <Users className='h-6 w-6 text-muted-foreground' />
      </div>
      <div className='flex max-w-md flex-col gap-2'>
        <h1 className='text-xl font-semibold text-ink-900'>{t('notFoundTitle')}</h1>
        <p className='text-sm leading-relaxed text-foggy'>{t('notFoundSubtitle')}</p>
      </div>
      <Link
        href='/parent/students'
        className={buttonVariants({ className: 'h-auto rounded-xl px-6 py-2.5 text-sm font-semibold' })}
      >
        {t('backToList')}
      </Link>
    </div>
  );
}
