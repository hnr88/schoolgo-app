'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import {
  inviteStaffSchema,
  type InviteStaffFormValues,
} from '@/modules/school-staff/schemas/invite-staff.schema';
import { useInviteStaff } from '@/modules/school-staff/queries/use-staff-actions.mutation';

interface UseInviteStaffFormArgs {
  schoolDocumentId: string | null;
  onClose: () => void;
}

export function useInviteStaffForm({ schoolDocumentId, onClose }: UseInviteStaffFormArgs) {
  const t = useTranslations('SchoolStaff');
  const invite = useInviteStaff();

  const form = useForm<InviteStaffFormValues>({
    resolver: zodResolver(inviteStaffSchema),
    defaultValues: { email: '', permissionLevel: 'staff' },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!schoolDocumentId) {
      toast.error(t('inviteError'));
      return;
    }
    const roleTitle = values.permissionLevel === 'admin' ? t('roleAdmin') : t('roleStaff');
    try {
      await invite.mutateAsync({
        email: values.email,
        permissionLevel: values.permissionLevel,
        roleTitle,
        schoolDocumentId,
      });
      toast.success(t('inviteSuccess'));
      form.reset();
      onClose();
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      toast.error(message ?? t('inviteError'));
    }
  });

  return { form, handleSubmit, isPending: invite.isPending };
}
