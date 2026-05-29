'use client';

import { useState } from 'react';
import { normalizeTemplateData } from '@/modules/school-templates/lib/normalize-template-data';
import type {
  ApplicationTemplate,
  TemplateStep,
} from '@/modules/school-templates/types/school-templates.types';

interface BuilderState {
  open: boolean;
  readOnly: boolean;
  existingDraftId: string | null;
  initialSteps: TemplateStep[];
  version?: number;
}

const CLOSED: BuilderState = {
  open: false,
  readOnly: false,
  existingDraftId: null,
  initialSteps: [],
};

export function useTemplatesPageState() {
  const [builder, setBuilder] = useState<BuilderState>(CLOSED);
  const [publishId, setPublishId] = useState<string | null>(null);
  const [builderKey, setBuilderKey] = useState(0);

  const openNew = () => {
    setBuilderKey((k) => k + 1);
    setBuilder({ ...CLOSED, open: true, initialSteps: [] });
  };

  const openEdit = (tpl: ApplicationTemplate) => {
    setBuilderKey((k) => k + 1);
    setBuilder({
      open: true,
      readOnly: false,
      existingDraftId: tpl.documentId,
      initialSteps: normalizeTemplateData(tpl.templateData).steps,
      version: tpl.version,
    });
  };

  const openView = (tpl: ApplicationTemplate) => {
    setBuilderKey((k) => k + 1);
    setBuilder({
      open: true,
      readOnly: true,
      existingDraftId: null,
      initialSteps: normalizeTemplateData(tpl.templateData).steps,
      version: tpl.version,
    });
  };

  const closeBuilder = () => setBuilder((prev) => ({ ...prev, open: false }));

  return {
    builder,
    builderKey,
    publishId,
    setPublishId,
    openNew,
    openEdit,
    openView,
    closeBuilder,
  };
}
