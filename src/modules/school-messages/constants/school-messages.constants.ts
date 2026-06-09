import { Briefcase, School, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ConversationSenderRole } from '@/modules/school-messages/types/school-messages.types';

export const SENDER_ROLE_ICONS: Record<ConversationSenderRole, LucideIcon> = {
  agent: Briefcase,
  school_staff: School,
  parent: User,
};

export const SENDER_ROLE_LABEL_KEYS: Record<ConversationSenderRole, string> = {
  agent: 'senderAgent',
  school_staff: 'senderSchool',
  parent: 'senderParent',
};
