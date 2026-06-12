'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ContactAgentFields } from '@/modules/agent-inquiry/components/ContactAgentFields';
import { useContactAgentForm } from '@/modules/agent-inquiry/hooks/useContactAgentForm';
import type { ContactAgentDialogProps } from '@/modules/agent-inquiry/types/agent-inquiry.types';

function ContactAgentBody({
  agentDocumentId,
  schoolDocumentId,
  onClose,
}: {
  agentDocumentId: string;
  schoolDocumentId?: string;
  onClose: () => void;
}) {
  const t = useTranslations('ContactAgent');
  const { form, handleSubmit, isPending } = useContactAgentForm({
    agentDocumentId,
    schoolDocumentId,
    onSuccess: onClose,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
        <ContactAgentFields form={form} />
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
            {t('submit')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function ContactAgentDialog({
  agentDocumentId,
  schoolDocumentId,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ContactAgentDialogProps) {
  const t = useTranslations('ContactAgent');
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled &&
        (trigger ? (
          <DialogTrigger render={trigger} />
        ) : (
          <DialogTrigger render={<Button className='gap-1.5' />}>
            <MessageSquare className='h-4 w-4' aria-hidden='true' />
            {t('triggerLabel')}
          </DialogTrigger>
        ))}
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        {open && (
          <ContactAgentBody
            agentDocumentId={agentDocumentId}
            schoolDocumentId={schoolDocumentId}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
