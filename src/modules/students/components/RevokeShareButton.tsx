'use client';

import { useTranslations } from 'next-intl';
import { Loader2, ShieldOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRevokeShare } from '@/modules/students/queries/use-revoke-share.mutation';
import { classifyAgentShareError } from '@/modules/students/lib/agent-share-error';
import type { RevokeShareButtonProps } from '@/modules/students/types/parent-component.types';

export function RevokeShareButton({ studentDocumentId, shareDocumentId }: RevokeShareButtonProps) {
  const t = useTranslations('AgentRepresentation');
  const revokeMutation = useRevokeShare(studentDocumentId);

  function handleRevoke() {
    revokeMutation.mutate(shareDocumentId, {
      onSuccess: () => toast.success(t('revokeSuccess')),
      onError: (error) => toast.error(t(classifyAgentShareError(error))),
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant='outline' size='sm' className='gap-1.5' />}
        disabled={revokeMutation.isPending}
      >
        {revokeMutation.isPending ? (
          <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
        ) : (
          <ShieldOff className='h-4 w-4' aria-hidden='true' />
        )}
        {t('revokeAction')}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('revokeConfirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('revokeConfirmBody')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleRevoke} disabled={revokeMutation.isPending}>
            {t('revokeConfirmAction')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
