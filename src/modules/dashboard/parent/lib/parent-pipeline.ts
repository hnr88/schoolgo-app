import {
  PARENT_PIPELINE_STAGES,
  PARENT_PIPELINE_STAGE_BY_STATUS,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type { ParentApplication } from '@/modules/applications';
import type {
  ParentPipelineData,
  ParentPipelineSegment,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

export function derivePipeline(applications: ParentApplication[]): ParentPipelineData {
  const counts = new Map<string, number>();
  for (const app of applications) {
    const stage = PARENT_PIPELINE_STAGE_BY_STATUS[app.status];
    if (!stage) continue;
    counts.set(stage, (counts.get(stage) ?? 0) + 1);
  }

  const segments: ParentPipelineSegment[] = PARENT_PIPELINE_STAGES.map((stage) => ({
    key: stage.key,
    labelKey: stage.labelKey,
    count: counts.get(stage.key) ?? 0,
    barClass: stage.barClass,
    dotClass: stage.dotClass,
  })).filter((segment) => segment.count > 0);

  const total = segments.reduce((sum, segment) => sum + segment.count, 0);

  return { segments, total };
}
