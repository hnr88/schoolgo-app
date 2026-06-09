'use client';

import { useFormatter, useNow, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import {
  SENDER_ROLE_ICONS,
  SENDER_ROLE_LABEL_KEYS,
} from '@/modules/school-messages/constants/school-messages.constants';
import type { ConversationRow } from '@/modules/school-messages/types/school-messages.types';

export function SchoolConversationRow({ conversation }: { conversation: ConversationRow }) {
  const t = useTranslations('SchoolMessages');
  const format = useFormatter();
  const now = useNow();

  const SenderIcon = SENDER_ROLE_ICONS[conversation.lastMessage.senderRole];
  const senderLabel = t(SENDER_ROLE_LABEL_KEYS[conversation.lastMessage.senderRole]);
  const studentName = conversation.student
    ? `${conversation.student.firstName} ${conversation.student.lastName}`.trim()
    : t('unknownStudent');
  const hasUnread = conversation.unreadCount > 0;

  return (
    <li>
      <Link
        href={`/dashboard/applications/${conversation.applicationDocumentId}?tab=messages`}
        className='flex items-start gap-4 rounded-xl border border-divider bg-card px-4 py-3 shadow-1 transition-opacity hover:opacity-80'
      >
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted'>
          <SenderIcon className='h-5 w-5 text-foggy' aria-hidden='true' />
          <span className='sr-only'>{senderLabel}</span>
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <div className='flex items-center gap-2'>
            <p className='truncate text-sm font-semibold text-ink-900'>{studentName}</p>
            {hasUnread && (
              <Badge>
                {t('unreadCount', { count: conversation.unreadCount })}
              </Badge>
            )}
          </div>
          <p className='text-xs text-foggy'>
            {conversation.agentCompanyName ?? t('directApplication')}
          </p>
          <p className='truncate text-sm text-ink-900/80'>{conversation.lastMessage.content}</p>
        </div>
        <p className='shrink-0 text-xs text-foggy'>
          {format.relativeTime(new Date(conversation.lastMessage.createdAt), { now })}
        </p>
      </Link>
    </li>
  );
}
