'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { TUITION_LEVELS } from '@/modules/school-tuition-editor/constants/tuition-levels';
import { tuitionSavePayloadSchema } from '@/modules/school-tuition-editor/schemas/tuition-row.schema';
import { useMyTuition } from '@/modules/school-tuition-editor/queries/use-my-tuition.query';
import { useTuitionStaffMe } from '@/modules/school-tuition-editor/queries/use-tuition-staff-me.query';
import { useSaveTuition } from '@/modules/school-tuition-editor/queries/use-save-tuition.mutation';
import type {
  TuitionEditorRow,
  TuitionLevel,
} from '@/modules/school-tuition-editor/types/school-tuition-editor.types';

function parseAmountInput(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const parsed = Number(trimmed);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function useTuitionEditor() {
  const t = useTranslations('SchoolTuition');
  const tuitionQuery = useMyTuition();
  const me = useTuitionStaffMe();
  const saveTuition = useSaveTuition();
  const [edits, setEdits] = useState<Partial<Record<TuitionLevel, string>>>({});

  const serverByLevel = new Map(
    (tuitionQuery.data ?? []).map((row) => [row.level, row.annualAmountAud]),
  );

  const rows: TuitionEditorRow[] = TUITION_LEVELS.map((level) => {
    const serverAmount = serverByLevel.get(level) ?? null;
    const edited = edits[level];
    const value = edited ?? (serverAmount !== null ? String(serverAmount) : '');
    const parsed = parseAmountInput(value);
    const isDirty =
      edited !== undefined &&
      (serverAmount === null ? edited.trim() !== '' : parsed !== serverAmount);
    return { level, value, serverAmount, isDirty, hasError: isDirty && parsed === null };
  });

  const dirtyRows = rows.filter((row) => row.isDirty);
  const hasErrors = dirtyRows.some((row) => row.hasError);

  const handleChange = (level: TuitionLevel, value: string) => {
    setEdits((prev) => ({ ...prev, [level]: value }));
  };

  const handleSave = () => {
    if (dirtyRows.length === 0 || hasErrors || saveTuition.isPending) return;
    const parsed = tuitionSavePayloadSchema.safeParse({
      rows: dirtyRows.map((row) => ({
        level: row.level,
        annualAmountAud: parseAmountInput(row.value),
      })),
    });
    if (!parsed.success) return;
    saveTuition.mutate(parsed.data, {
      onSuccess: () => {
        setEdits({});
        toast.success(t('saveSuccess'));
      },
      onError: (error) => {
        const message = isAxiosError(error)
          ? (error.response?.data?.error?.message as string | undefined)
          : undefined;
        toast.error(message ?? t('saveError'));
      },
    });
  };

  return {
    rows,
    isAdmin: me.data?.permissionLevel === 'admin',
    isLoading: tuitionQuery.isLoading || me.isLoading,
    isError: tuitionQuery.isError,
    refetch: tuitionQuery.refetch,
    isSaving: saveTuition.isPending,
    dirtyCount: dirtyRows.length,
    hasErrors,
    handleChange,
    handleSave,
  };
}
