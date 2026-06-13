'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SectionHeading } from '@/modules/core';
import { FitConfigNumberField } from '@/modules/school-applicant-fit/components/FitConfigNumberField';
import { useFitConfigForm } from '@/modules/school-applicant-fit/hooks/useFitConfigForm';
import {
  FIT_CRITERIA,
  THRESHOLD_KEYS,
} from '@/modules/school-applicant-fit/constants/applicant-fit.constants';
import type { ApplicantFitConfig } from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitConfigDialogProps {
  config: ApplicantFitConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FitConfigDialog({ config, open, onOpenChange }: FitConfigDialogProps) {
  const t = useTranslations('SchoolApplicantFit');
  const { form, submit, isPending } = useFitConfigForm(config, () => {
    toast.success(t('configSaved'));
    onOpenChange(false);
  });

  function handleError() {
    toast.error(t('configSaveError'));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('configTitle')}</DialogTitle>
          <DialogDescription>{t('configDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              void submit(e).catch(handleError);
            }}
            className='flex flex-col gap-6'
          >
            <section className='flex flex-col gap-4'>
              <SectionHeading level={3} title={t('weightsHeading')} description={t('weightsHint')} />
              <div className='grid gap-4 sm:grid-cols-2'>
                {FIT_CRITERIA.map((criterion) => (
                  <FitConfigNumberField
                    key={criterion}
                    control={form.control}
                    name={criterion}
                    label={t(`criterion_${criterion}`)}
                    max={100}
                    step={1}
                  />
                ))}
              </div>
            </section>
            <section className='flex flex-col gap-4'>
              <SectionHeading
                level={3}
                title={t('thresholdsHeading')}
                description={t('thresholdsHint')}
              />
              <div className='grid gap-4 sm:grid-cols-3'>
                {THRESHOLD_KEYS.map((key) => (
                  <FitConfigNumberField
                    key={key}
                    control={form.control}
                    name={key}
                    label={t(`threshold_${key}`)}
                    max={1}
                    step={0.05}
                  />
                ))}
              </div>
            </section>
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={isPending}>
                {t('saveConfig')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
