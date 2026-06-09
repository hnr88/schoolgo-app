'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { UserRound } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useSchoolStaffMe } from '@/modules/school-applications/queries/use-school-staff-me.query';
import { useSchoolTeam } from '@/modules/school-applications/queries/use-school-team.query';
import { useAssignApplication } from '@/modules/school-applications/queries/use-assign-application.mutation';
import { assigneeDisplayName } from '@/modules/school-applications/lib/school-application';
import type { ApplicationAssignedStaff } from '@/modules/school-applications/types/school-applications.types';

interface Props {
  documentId: string;
  assignedStaff: ApplicationAssignedStaff | null;
}

export function AssigneeSelect({ documentId, assignedStaff }: Props) {
  const t = useTranslations('SchoolApplications');
  const me = useSchoolStaffMe();
  const isAdmin = me.data?.permissionLevel === 'admin';
  const team = useSchoolTeam({ enabled: isAdmin });
  const assign = useAssignApplication(documentId);

  const meData = me.data;
  if (!meData) return null;

  function handleAssign(staffDocumentId: string | null) {
    assign.mutate(staffDocumentId, {
      onSuccess: () => toast.success(t('assignSuccess')),
      onError: () => toast.error(t('assignError')),
    });
  }

  const currentName = assigneeDisplayName(assignedStaff);
  const assignedToMe = !!assignedStaff && assignedStaff.documentId === meData.documentId;

  if (isAdmin) {
    const members = (team.data ?? []).filter((m) => m.status === 'active');
    return (
      <div className='flex items-center gap-2'>
        <span className='text-sm text-foggy'>{t('assigneeLabel')}</span>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={assign.isPending}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          >
            <UserRound className='h-4 w-4 text-foggy' />
            {currentName ?? t('assigneeUnassigned')}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' sideOffset={6}>
            {members.map((m) => (
              <DropdownMenuItem
                key={m.documentId}
                onClick={() => handleAssign(m.documentId)}
                className={
                  assignedStaff?.documentId === m.documentId ? 'font-semibold text-primary' : ''
                }
              >
                {m.fullName || m.roleTitle}
              </DropdownMenuItem>
            ))}
            {assignedStaff && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAssign(null)}>
                  {t('assigneeUnassign')}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (assignedStaff && !assignedToMe) {
    return (
      <div className='flex items-center gap-2'>
        <span className='text-sm text-foggy'>{t('assigneeLabel')}</span>
        <span className='text-sm font-medium text-ink-900'>
          {currentName ?? t('assigneeUnassigned')}
        </span>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-foggy'>{t('assigneeLabel')}</span>
      <button
        type='button'
        disabled={assign.isPending}
        onClick={() => handleAssign(assignedToMe ? null : meData.documentId)}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
      >
        {assignedToMe ? t('assigneeUnassignMe') : t('assigneeAssignToMe')}
      </button>
    </div>
  );
}
