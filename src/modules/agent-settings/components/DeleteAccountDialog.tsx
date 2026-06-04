'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  agentDeleteAccountSchema,
  type AgentDeleteAccountValues,
} from '@/modules/agent-settings/schemas/delete-account.schema';
import { useDeleteAgentAccount } from '@/modules/agent-settings/queries/use-delete-agent-account.mutation';
import { AgentSettingsFormMessage } from '@/modules/agent-settings/components/AgentSettingsFormMessage';

export function DeleteAccountDialog() {
  const t = useTranslations('AgentSettings');
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteAgentAccount();

  const form = useForm<AgentDeleteAccountValues>({
    resolver: zodResolver(agentDeleteAccountSchema),
    defaultValues: { password: '' },
  });

  const handleSubmit = async (values: AgentDeleteAccountValues) => {
    try {
      await mutateAsync(values);
    } catch {
      form.setError('password', { type: 'server', message: 'deletePasswordInvalid' });
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) form.reset();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger render={<Button variant='destructive' />}>
        {t('deleteAccountButton')}
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteDialogTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('deleteDialogDescription')}</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4' noValidate>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('deletePasswordLabel')}</FormLabel>
                  <FormControl>
                    <Input type='password' autoComplete='current-password' {...field} />
                  </FormControl>
                  <AgentSettingsFormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending} type='button'>
                {t('cancelButton')}
              </AlertDialogCancel>
              <Button type='submit' variant='destructive' disabled={isPending} aria-busy={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
                {t('deleteConfirmButton')}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
