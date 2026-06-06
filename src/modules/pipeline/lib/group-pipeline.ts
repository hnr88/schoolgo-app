import { PIPELINE_COLUMNS } from '@/modules/pipeline/constants/pipeline.constants';
import type { Application } from '@/modules/applications/types/application.types';

export function groupByColumn(applications: Application[]): Record<string, Application[]> {
  const groups: Record<string, Application[]> = {};
  for (const col of PIPELINE_COLUMNS) {
    groups[col.id] = [];
  }
  for (const app of applications) {
    const column = PIPELINE_COLUMNS.find((col) => col.statuses.includes(app.status));
    if (column) {
      groups[column.id].push(app);
    }
  }
  return groups;
}
