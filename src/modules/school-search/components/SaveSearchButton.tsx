'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BookmarkPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/modules/auth';
import { mapStoreToTypedRequest } from '@/modules/school-search/lib/store-to-typed-request';
import { useCreateSavedSearch } from '@/modules/school-search/queries/use-create-saved-search.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

export function SaveSearchButton() {
  const t = useTranslations('SchoolSearch.saveSearch');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const createSavedSearch = useCreateSavedSearch();

  const query = useSchoolSearchStore((s) => s.query);
  const states = useSchoolSearchStore((s) => s.states);
  const suburb = useSchoolSearchStore((s) => s.suburb);
  const postcode = useSchoolSearchStore((s) => s.postcode);
  const feeMin = useSchoolSearchStore((s) => s.feeMin);
  const feeMax = useSchoolSearchStore((s) => s.feeMax);
  const sectors = useSchoolSearchStore((s) => s.sectors);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const religiousAffiliations = useSchoolSearchStore((s) => s.religiousAffiliations);
  const entryYearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const studentAge = useSchoolSearchStore((s) => s.studentAge);
  const entryTerms = useSchoolSearchStore((s) => s.entryTerms);
  const programTypes = useSchoolSearchStore((s) => s.programTypes);
  const atarAvailable = useSchoolSearchStore((s) => s.atarAvailable);
  const englishLanguageSupport = useSchoolSearchStore((s) => s.englishLanguageSupport);
  const englishTest = useSchoolSearchStore((s) => s.englishTest);
  const sortBy = useSchoolSearchStore((s) => s.sortBy);

  const trimmed = name.trim();
  const isInvalid = trimmed.length === 0 || trimmed.length > 100;
  const isSaving = createSavedSearch.isPending;

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.error(t('signInRequired'));
      return;
    }
    if (isInvalid) return;

    const snapshot = {
      query,
      states,
      suburb,
      postcode,
      feeMin,
      feeMax,
      sectors,
      accommodation,
      religiousAffiliations,
      entryYearLevels,
      studentAge,
      entryTerms,
      programTypes,
      atarAvailable,
      englishLanguageSupport,
      englishTest,
      sortBy,
    };
    const filterState = mapStoreToTypedRequest(snapshot);

    createSavedSearch.mutate(
      { name: trimmed, filterState },
      {
        onSuccess: () => {
          toast.success(t('successToast'));
          setName('');
          setOpen(false);
        },
        onError: () => {
          toast.error(t('errorToast'));
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="sm" className="w-full gap-2" />
        }
      >
        <BookmarkPlus className="size-4" aria-hidden="true" />
        {t('cta')}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('promptTitle')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="save-search-name">{t('nameLabel')}</Label>
          <Input
            id="save-search-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
          >
            {t('cancel')}
          </Button>
          <Button type="button" onClick={handleSave} disabled={isSaving || isInvalid}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
