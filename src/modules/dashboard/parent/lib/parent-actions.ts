import { CalendarClock, ClipboardCheck, FileWarning } from 'lucide-react';
import {
  PARENT_ACTION_META,
  PARENT_ACTION_REQUIRED_STATUSES,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type { ParentApplication } from '@/modules/applications';
import type {
  ParentActionItem,
  ParentActionKind,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

const ACTION_STATUS_SET = new Set<string>(PARENT_ACTION_REQUIRED_STATUSES);

const KIND_ICON = {
  documents_requested: FileWarning,
  assessment_required: ClipboardCheck,
  interview_scheduled: CalendarClock,
} as const;

export function deriveActionItems(applications: ParentApplication[]): ParentActionItem[] {
  return applications
    .filter((app) => ACTION_STATUS_SET.has(app.status))
    .map((app) => {
      const kind = app.status as ParentActionKind;
      const meta = PARENT_ACTION_META[kind];
      return {
        id: app.documentId,
        kind,
        labelKey: meta.labelKey,
        icon: KIND_ICON[kind],
        iconClassName: meta.iconClassName,
        schoolName: app.school.name,
        studentName: `${app.student.firstName} ${app.student.lastName}`,
        href: `/parent/applications/${app.documentId}`,
      };
    });
}
