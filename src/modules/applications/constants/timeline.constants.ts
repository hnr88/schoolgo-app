import { ArrowRight, FileUp, MessageSquare, StickyNote, Plus } from 'lucide-react';
import type { ApplicationTimelineEvent } from '@/modules/applications/types/detail.types';

export const EVENT_ICONS: Record<ApplicationTimelineEvent['type'], React.ComponentType<{ className?: string }>> = {
  status_change: ArrowRight,
  document_uploaded: FileUp,
  message_sent: MessageSquare,
  note_added: StickyNote,
  application_created: Plus,
};
