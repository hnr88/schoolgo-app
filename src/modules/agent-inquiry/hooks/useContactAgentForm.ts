'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

import {
  contactAgentSchema,
  type ContactAgentFormValues,
} from '@/modules/agent-inquiry/schemas/contact-agent.schema';
import { useSubmitInquiry } from '@/modules/agent-inquiry/mutations/use-submit-inquiry.mutation';

interface UseContactAgentFormArgs {
  agentDocumentId: string;
  schoolDocumentId?: string;
  onSuccess: () => void;
}

export function useContactAgentForm({
  agentDocumentId,
  schoolDocumentId,
  onSuccess,
}: UseContactAgentFormArgs) {
  const t = useTranslations('ContactAgent');
  const submitInquiry = useSubmitInquiry();

  const form = useForm<ContactAgentFormValues>({
    resolver: zodResolver(contactAgentSchema),
    defaultValues: { parentName: '', parentEmail: '', parentPhone: '', message: '' },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await submitInquiry.mutateAsync({
        agentDocumentId,
        schoolDocumentId,
        parentName: values.parentName.trim(),
        parentEmail: values.parentEmail.trim(),
        parentPhone: values.parentPhone?.trim() || undefined,
        childAge: values.childAge,
        message: values.message.trim(),
      });
      toast.success(t('success'));
      form.reset();
      onSuccess();
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      toast.error(message ?? t('error'));
    }
  });

  return { form, handleSubmit, isPending: submitInquiry.isPending };
}
