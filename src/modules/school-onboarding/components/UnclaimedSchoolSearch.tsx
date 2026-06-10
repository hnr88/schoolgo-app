'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useDebouncedValue } from '@/modules/core/client';
import { useSearchUnclaimedSchools } from '@/modules/school-onboarding/queries/use-search-unclaimed-schools.query';
import { ONBOARDING_ROLE_TITLE_STORAGE_KEY } from '@/modules/school-onboarding/constants/school-onboarding.constants';
import { readStoredRoleTitle } from '@/modules/school-onboarding/lib/read-stored-role-title';
import type { UnclaimedSchool } from '@/modules/school-onboarding/types/school-onboarding.types';

interface UnclaimedSchoolSearchProps {
  isClaiming: boolean;
  onClaim: (school: UnclaimedSchool, roleTitle: string) => void;
}

export function UnclaimedSchoolSearch({ isClaiming, onClaim }: UnclaimedSchoolSearchProps) {
  const t = useTranslations('SchoolOnboarding');
  const [search, setSearch] = useState('');
  const [roleTitle, setRoleTitle] = useState(readStoredRoleTitle);
  const [selected, setSelected] = useState<UnclaimedSchool | null>(null);
  const debounced = useDebouncedValue(search, 350);
  const { data, isFetching } = useSearchUnclaimedSchools(debounced);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(ONBOARDING_ROLE_TITLE_STORAGE_KEY);
  }, []);

  const canClaim = selected !== null && roleTitle.trim().length > 0 && !isClaiming;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='school-search'>{t('searchLabel')}</Label>
        <Input
          id='school-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          autoComplete='off'
        />
        <p className='text-xs text-muted-foreground'>{t('searchHint')}</p>
      </div>

      {isFetching && (
        <p className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
          {t('searching')}
        </p>
      )}

      {!isFetching && debounced.trim().length >= 2 && (data?.length ?? 0) === 0 && (
        <p className='text-sm text-muted-foreground'>{t('noResults')}</p>
      )}

      <ul className='flex flex-col gap-2'>
        {data?.map((school) => (
          <li key={school.documentId}>
            <button
              type='button'
              onClick={() => setSelected(school)}
              aria-pressed={selected?.documentId === school.documentId}
              className={
                selected?.documentId === school.documentId
                  ? 'flex w-full flex-col items-start gap-1 rounded-xl border-2 border-primary bg-accent/40 p-4 text-left'
                  : 'flex w-full flex-col items-start gap-1 rounded-xl border border-border p-4 text-left hover:bg-accent/30'
              }
            >
              <span className='flex items-center gap-2 font-medium text-ink-900'>
                {school.name}
                {school.claimed && <Badge variant='secondary'>{t('claimedBadge')}</Badge>}
              </span>
              <span className='text-xs text-muted-foreground'>
                {[school.cricosCode, school.suburb, school.state, school.sector]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='role-title'>{t('roleTitleLabel')}</Label>
        <Input
          id='role-title'
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder={t('roleTitlePlaceholder')}
        />
      </div>

      <Button
        type='button'
        disabled={!canClaim}
        aria-busy={isClaiming}
        className='self-start'
        onClick={() => selected && onClaim(selected, roleTitle.trim())}
      >
        {isClaiming && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
        {isClaiming ? t('claiming') : t('claimButton')}
      </Button>
    </div>
  );
}
