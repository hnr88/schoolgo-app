'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useShareWithAgent } from '@/modules/students/queries/use-share-with-agent.mutation';
import { classifyAgentShareError } from '@/modules/students/lib/agent-share-error';
import { shareWithAgentSchema } from '@/modules/students/schemas/share-with-agent.schema';
import type { ShareWithAgentFormValues } from '@/modules/students/types/agent-share.types';
import type { ShareWithAgentDialogProps } from '@/modules/students/types/parent-component.types';

export function ShareWithAgentDialog({ studentDocumentId }: ShareWithAgentDialogProps) {
  const t = useTranslations('AgentRepresentation');
  const [open, setOpen] = useState(false);
  const shareMutation = useShareWithAgent(studentDocumentId);

  const form = useForm<ShareWithAgentFormValues>({
    resolver: zodResolver(shareWithAgentSchema),
    defaultValues: { agentDocumentId: '', note: '' },
  });

  async function onSubmit(values: ShareWithAgentFormValues) {
    try {
      await shareMutation.mutateAsync({
        agentDocumentId: values.agentDocumentId.trim(),
        note: values.note?.trim() || undefined,
      });
      toast.success(t('shareSuccess'));
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error(t(classifyAgentShareError(error)));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size='sm' className='gap-1.5' />}>
        <UserPlus className='h-4 w-4' aria-hidden='true' />
        {t('shareAction')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('shareTitle')}</DialogTitle>
          <DialogDescription>{t('shareSubtitle')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='agentDocumentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shareAgentLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('shareAgentPlaceholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormDescription>{t('shareAgentHint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shareNoteLabel')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('shareNotePlaceholder')} rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-2'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={shareMutation.isPending}>
                {shareMutation.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
                )}
                {t('shareAction')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
