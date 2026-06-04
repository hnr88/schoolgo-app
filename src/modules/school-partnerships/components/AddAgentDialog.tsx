'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAgentSearchDialog } from '@/modules/school-partnerships/hooks/useAgentSearchDialog';

interface AddAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddAgentDialogBody({ onClose }: { onClose: () => void }) {
  const t = useTranslations('SchoolPartnerships');
  const { input, setInput, results, isLoading, isInviting, invitingId, handleInvite } =
    useAgentSearchDialog(onClose);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='agent-search'>{t('inviteAgentLabel')}</Label>
        <Input
          id='agent-search'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('inviteAgentPlaceholder')}
          autoComplete='off'
        />
      </div>

      <div className='max-h-64 overflow-y-auto'>
        {isLoading ? (
          <div className='flex justify-center py-6'>
            <Loader2 className='h-5 w-5 animate-spin text-foggy' />
          </div>
        ) : results.length === 0 ? (
          <p className='py-6 text-center text-sm text-foggy'>{t('empty')}</p>
        ) : (
          <ul className='flex flex-col gap-1'>
            {results.map((agent) => (
              <li
                key={agent.documentId}
                className='flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors hover:bg-muted/60'
              >
                <div className='min-w-0'>
                  <p className='truncate font-medium text-ink-900'>{agent.companyName}</p>
                  <p className='truncate text-xs text-foggy'>
                    {[agent.qeacNumber, agent.countryOfOperation].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <Button
                  size='sm'
                  disabled={isInviting}
                  onClick={() => handleInvite(agent.documentId)}
                >
                  {isInviting && invitingId === agent.documentId ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <Plus className='h-4 w-4' />
                  )}
                  {t('inviteSubmit')}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export function AddAgentDialog({ open, onOpenChange }: AddAgentDialogProps) {
  const t = useTranslations('SchoolPartnerships');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('inviteTitle')}</DialogTitle>
          <DialogDescription>{t('inviteDescription')}</DialogDescription>
        </DialogHeader>
        {open && <AddAgentDialogBody onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
