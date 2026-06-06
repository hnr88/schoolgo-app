'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useParentCreateApplicationForm } from '@/modules/applications/hooks/useParentCreateApplicationForm';
import { ParentStudentPickerField } from '@/modules/applications/components/ParentStudentPickerField';
import { ParentSchoolPickerField } from '@/modules/applications/components/ParentSchoolPickerField';
import { ParentApplicationFormMessage } from '@/modules/applications/components/ParentApplicationFormMessage';
import { ParentApplicationEligibilityNotice } from '@/modules/applications/components/ParentApplicationEligibilityNotice';
import {
  PARENT_TARGET_INTAKE_LABEL_KEYS,
  PARENT_TARGET_INTAKE_OPTIONS,
  PARENT_TARGET_YEAR_LEVEL_LABEL_KEYS,
  PARENT_TARGET_YEAR_LEVEL_OPTIONS,
} from '@/modules/applications/constants/parent-create-application.constants';
import type { ParentCreateApplicationFormProps } from '@/modules/applications/types/parent-create-application.types';

export function ParentCreateApplicationForm({
  students,
  isLoadingStudents,
  presetSchool,
  isSubmitting,
  onSubmit,
}: ParentCreateApplicationFormProps) {
  const t = useTranslations('ParentApplications');
  const { form, fitCheck, isFitCheckLoading, isHardBlocked } =
    useParentCreateApplicationForm(presetSchool);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <ParentStudentPickerField
          control={form.control}
          students={students}
          isLoading={isLoadingStudents}
        />
        <ParentSchoolPickerField control={form.control} presetSchool={presetSchool} />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='targetYearLevel'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('newYearLevelLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('newSelectYearLevel')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PARENT_TARGET_YEAR_LEVEL_OPTIONS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(PARENT_TARGET_YEAR_LEVEL_LABEL_KEYS[level])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ParentApplicationFormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='targetIntake'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('newIntakeLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('newSelectIntake')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PARENT_TARGET_INTAKE_OPTIONS.map((intake) => (
                      <SelectItem key={intake} value={intake}>
                        {t(PARENT_TARGET_INTAKE_LABEL_KEYS[intake])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ParentApplicationFormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='boardingRequired'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center gap-3'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className='font-normal'>{t('newBoardingLabel')}</FormLabel>
            </FormItem>
          )}
        />
        <ParentApplicationEligibilityNotice fitCheck={fitCheck} isLoading={isFitCheckLoading} />
        <div className='flex justify-end'>
          <Button type='submit' size='lg' disabled={isSubmitting || isHardBlocked}>
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('newSubmitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
