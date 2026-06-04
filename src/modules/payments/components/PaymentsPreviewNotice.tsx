import { getTranslations } from 'next-intl/server';
import { Info } from 'lucide-react';

export async function PaymentsPreviewNotice() {
  const t = await getTranslations('ParentPayments');

  return (
    <div className='flex items-start gap-3 rounded-xl border border-rausch-100 bg-rausch-50 px-4 py-3'>
      <Info
        className='mt-0.5 h-4 w-4 shrink-0 text-primary-strong'
        strokeWidth={1.75}
        aria-hidden='true'
      />
      <p className='text-sm text-primary-strong'>{t('previewNotice')}</p>
    </div>
  );
}
