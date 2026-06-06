'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import {
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useChangeStage } from '@/modules/pipeline/queries/use-change-stage.mutation';
import type { Application } from '@/modules/applications/types/application.types';
import type { CardDragData, ColumnDropData } from '@/modules/pipeline/types/component.types';

export function useKanbanDnd() {
  const t = useTranslations('Pipeline');
  const changeStage = useChangeStage();
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as CardDragData | undefined;
    setActiveApplication(data?.application ?? null);
  }

  function handleDragCancel() {
    setActiveApplication(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveApplication(null);
    const card = event.active.data.current as CardDragData | undefined;
    const drop = event.over?.data.current as ColumnDropData | undefined;
    if (!card || !drop) return;

    const toStatus = drop.column.agentToStatus;
    if (!toStatus || toStatus === card.application.status) {
      return;
    }

    changeStage.mutate(
      { applicationDocumentId: card.application.documentId, toStatus },
      {
        onSuccess: () => toast.success(t('moveSuccess', { stage: t(drop.column.label) })),
        onError: (error) => {
          const status = isAxiosError(error) ? error.response?.status : undefined;
          toast.error(status === 403 || status === 400 ? t('moveNotAllowed') : t('moveError'));
        },
      },
    );
  }

  return { sensors, activeApplication, handleDragStart, handleDragEnd, handleDragCancel };
}
