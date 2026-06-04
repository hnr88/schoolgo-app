'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInviteStaffForm } from '@/modules/school-staff/hooks/useInviteStaffForm';

interface InviteStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schoolDocumentId: string | null;
}

function InviteStaffDialogBody({
  schoolDocumentId,
  onClose,
}: {
  schoolDocumentId: string | null;
  onClose: () => void;
}) {
  const t = useTranslations('SchoolStaff');
  const { form, handleSubmit, isPending } = useInviteStaffForm({ schoolDocumentId, onClose });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('inviteEmailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder={t('inviteEmailPlaceholder')}
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='permissionLevel'
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
                  <SelectItem value='staff'>{t('roleStaff')}</SelectItem>
                  <SelectItem value='admin'>{t('roleAdmin')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
            {t('inviteCancel')}
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('inviteSubmit')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function InviteStaffDialog({ open, onOpenChange, schoolDocumentId }: InviteStaffDialogProps) {
  const t = useTranslations('SchoolStaff');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('inviteTitle')}</DialogTitle>
          <DialogDescription>{t('inviteDescription')}</DialogDescription>
        </DialogHeader>
        {open && (
          <InviteStaffDialogBody
            schoolDocumentId={schoolDocumentId}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
