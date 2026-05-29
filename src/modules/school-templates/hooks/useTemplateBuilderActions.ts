'use client';

import { useState } from 'react';
import { useValidateTemplate } from '@/modules/school-templates/queries/use-validate-template.mutation';
import { useCreateTemplate } from '@/modules/school-templates/queries/use-create-template.mutation';
import { useUpdateTemplate } from '@/modules/school-templates/queries/use-update-template.mutation';
import type {
  TemplateStep,
  TemplateValidationResult,
} from '@/modules/school-templates/types/school-templates.types';

interface UseBuilderActionsArgs {
  existingDraftId: string | null;
  onSaved: () => void;
}

export function useTemplateBuilderActions({ existingDraftId, onSaved }: UseBuilderActionsArgs) {
  const [validation, setValidation] = useState<TemplateValidationResult | null>(null);
  const validateMutation = useValidateTemplate();
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();

  const validate = (steps: TemplateStep[]) => {
    validateMutation.mutate({ steps }, { onSuccess: setValidation });
  };

  const save = (steps: TemplateStep[]) => {
    if (existingDraftId) {
      updateMutation.mutate(
        { documentId: existingDraftId, templateData: { steps } },
        { onSuccess: onSaved },
      );
    } else {
      createMutation.mutate({ steps }, { onSuccess: onSaved });
    }
  };

  return {
    validation,
    setValidation,
    validate,
    save,
    isValidating: validateMutation.isPending,
    isSaving: createMutation.isPending || updateMutation.isPending,
  };
}
