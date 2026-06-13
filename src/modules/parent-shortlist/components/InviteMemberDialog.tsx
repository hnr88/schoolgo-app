'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInviteMember } from '@/modules/parent-shortlist/queries/use-invite-member.mutation';
import { inviteMemberSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import { MEMBER_ROLES } from '@/modules/parent-shortlist/constants/shortlist.constants';
import type { InviteMemberInput } from '@/modules/parent-shortlist/types/shortlist.types';

interface InviteMemberDialogProps {
  shortlistDocumentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberDialog({ shortlistDocumentId, open, onOpenChange }: InviteMemberDialogProps) {
  const t = useTranslations('ParentShortlist');
  const inviteMutation = useInviteMember(shortlistDocumentId);

  const form = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: { email: '', role: 'co-parent' },
  });

  async function onSubmit(values: InviteMemberInput) {
    await inviteMutation.mutateAsync(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('inviteTitle')}</DialogTitle>
          <DialogDescription>{t('inviteSubtitle')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inviteEmailLabel')}</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder={t('inviteEmailPlaceholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inviteRoleLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEMBER_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {t(`role_${role}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 pt-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={inviteMutation.isPending}>
                {inviteMutation.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
                )}
                {t('inviteAction')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
