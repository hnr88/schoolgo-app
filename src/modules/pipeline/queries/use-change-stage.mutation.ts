'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { withApplicationComputedFields } from '@/modules/applications/lib/format';
import { groupByColumn } from '@/modules/pipeline/lib/group-pipeline';
import { PIPELINE_QUERY_KEY } from '@/modules/pipeline/queries/use-pipeline.query';
import type { Application } from '@/modules/applications/types/application.types';
import type { ChangeStageVariables, PipelineData } from '@/modules/pipeline/types/pipeline.types';

interface ChangeStageContext {
  previous: PipelineData | undefined;
}

function applyStageMove(data: PipelineData, variables: ChangeStageVariables): PipelineData {
  const now = new Date().toISOString();
  const applications = data.applications.map((app): Application =>
    app.documentId === variables.applicationDocumentId
      ? withApplicationComputedFields({
          ...app,
          status: variables.toStatus,
          statusChangedAt: now,
          daysInStatus: 0,
        })
      : app,
  );
  return { ...data, applications, byColumn: groupByColumn(applications) };
}

export function useChangeStage() {
  const queryClient = useQueryClient();

  return useMutation<Application, Error, ChangeStageVariables, ChangeStageContext>({
    mutationFn: async ({ applicationDocumentId, toStatus }) => {
      const { data } = await privateApi.post<{ data: Application }>(
        `/api/applications/${applicationDocumentId}/change-stage`,
        { data: { toStatus } },
      );
      return data.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: PIPELINE_QUERY_KEY });
      const previous = queryClient.getQueryData<PipelineData>(PIPELINE_QUERY_KEY);
      if (previous) {
        queryClient.setQueryData<PipelineData>(PIPELINE_QUERY_KEY, applyStageMove(previous, variables));
      }
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(PIPELINE_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PIPELINE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}
