'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TERMINAL_STATUSES } from '@/modules/applications/constants/detail.constants';
import type { Application } from '@/modules/applications/types/application.types';

export function ApplicationActions({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const isTerminal = TERMINAL_STATUSES.includes(application.status);

  if (isTerminal) return null;

  return (
    <div className='flex justify-end gap-3'>
      <Button variant='outline' onClick={() => toast(t('actionComingSoon'))}>
        {t('actionContactSchool')}
      </Button>
      {application.status === 'offer_made' && (
        <Button onClick={() => toast(t('actionComingSoon'))}>
          {t('actionAcceptOffer')}
        </Button>
      )}
      <Button variant='destructive' onClick={() => toast(t('actionComingSoon'))}>
        {t('actionWithdraw')}
      </Button>
    </div>
  );
}
