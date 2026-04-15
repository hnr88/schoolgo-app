import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations('Errors');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 p-6'>
      <h1 className='text-3xl font-bold text-on-surface'>{t('notFound')}</h1>
      <Link href='/' className={buttonVariants({ variant: 'default' })}>
        {t('goHome')}
      </Link>
    </div>
  );
}
