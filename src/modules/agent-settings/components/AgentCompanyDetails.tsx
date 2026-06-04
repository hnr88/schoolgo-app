'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import type { AgentProfileSummary } from '@/modules/agent-settings/types/agent-settings.types';

export function AgentCompanyDetails({ profile }: { profile: AgentProfileSummary }) {
  const t = useTranslations('AgentSettings');

  return (
    <fieldset className='grid grid-cols-1 gap-4 rounded-lg border border-border bg-muted/40 p-4 sm:grid-cols-2'>
      <legend className='px-1 text-sm font-medium text-ink-900'>{t('companyLegend')}</legend>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>{t('companyLabel')}</span>
        <span className='text-sm text-ink-900'>{profile.companyName || t('notProvided')}</span>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>{t('countryLabel')}</span>
        <span className='text-sm text-ink-900'>
          {profile.countryOfOperation || t('notProvided')}
        </span>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>{t('qeacLabel')}</span>
        <Badge variant={profile.qeacCertified ? 'default' : 'secondary'} className='w-fit'>
          {profile.qeacCertified ? t('qeacCertified') : t('qeacNotCertified')}
        </Badge>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>{t('verifiedLabel')}</span>
        <Badge variant={profile.verified ? 'default' : 'secondary'} className='w-fit'>
          {profile.verified ? t('verifiedYes') : t('verifiedNo')}
        </Badge>
      </div>
      <p className='text-xs text-muted-foreground sm:col-span-2'>{t('companyHint')}</p>
    </fieldset>
  );
}
