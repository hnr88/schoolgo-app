'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { studentSchema, type StudentFormValues } from '@/modules/students/schemas/student.schema';
import { GENDER_OPTIONS, YEAR_LEVEL_OPTIONS } from '@/modules/students/constants/student.constants';
import type { StudentFormProps } from '@/modules/students/types/component.types';

export function StudentForm({ defaultValues, onSubmit, isLoading, submitLabel }: StudentFormProps) {
  const t = useTranslations('Students');

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      currentSchool: '',
      currentYearLevel: '',
      targetEntryYear: '',
      targetEntryTerm: '',
      parentGuardianName: '',
      parentGuardianEmail: '',
      parentGuardianPhone: '',
      parentGuardianWechat: '',
      agentNotes: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        <section className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold text-ink-900'>{t('sectionPersonal')}</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldFirstName')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldLastName')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldDob')}</FormLabel>
                  <FormControl><Input type='date' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldGender')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={t('selectGender')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_OPTIONS.map((g) => (
                        <SelectItem key={g} value={g}>{t(`gender${g.charAt(0).toUpperCase()}${g.slice(1)}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nationality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldNationality')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Separator />

        <section className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold text-ink-900'>{t('sectionEducation')}</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='currentSchool'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldCurrentSchool')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='currentYearLevel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldCurrentYear')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={t('selectYear')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEAR_LEVEL_OPTIONS.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='targetEntryYear'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldTargetYear')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={t('selectYear')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEAR_LEVEL_OPTIONS.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='targetEntryTerm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldTargetTerm')}</FormLabel>
                  <FormControl><Input placeholder='e.g. Term 1, 2027' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Separator />

        <section className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold text-ink-900'>{t('sectionParent')}</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='parentGuardianName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldParentName')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='parentGuardianEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldParentEmail')}</FormLabel>
                  <FormControl><Input type='email' {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='parentGuardianPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldParentPhone')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='parentGuardianWechat'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fieldParentWechat')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Separator />

        <FormField
          control={form.control}
          name='agentNotes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldNotes')}</FormLabel>
              <FormControl><Textarea rows={4} placeholder={t('notesPlaceholder')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
