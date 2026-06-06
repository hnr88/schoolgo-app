'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSyncResponses } from '@/modules/test-runner/queries/use-sync-responses.mutation';
import { useSubmitSession } from '@/modules/test-runner/queries/use-submit-session.mutation';
import { useNextItem } from '@/modules/test-runner/queries/use-next-item.mutation';
import { useStudentSessionStore } from '@/modules/test-runner/stores/use-student-session-store';
import {
  ADAPTIVE_TEST_MODE,
  AUTOSAVE_DEBOUNCE_MS,
  TIMER_TICK_MS,
} from '@/modules/test-runner/constants/runner.constants';
import { remainingSeconds } from '@/modules/test-runner/lib/runner-time';
import type { TestItem } from '@/modules/test-runner/types/test-session.types';

interface UseTestRunnerArgs {
  testDocumentId: string;
}

export function useTestRunner({ testDocumentId }: UseTestRunnerArgs) {
  const syncMutation = useSyncResponses();
  const submitMutation = useSubmitSession();
  const nextItemMutation = useNextItem();

  const isHydrated = useStudentSessionStore((s) => s.isHydrated);
  const jwt = useStudentSessionStore((s) => s.jwt);
  const session = useStudentSessionStore((s) => s.session);
  const responses = useStudentSessionStore((s) => s.responses);
  const currentIndex = useStudentSessionStore((s) => s.currentItemIndex);
  const startError = useStudentSessionStore((s) => s.startError);
  const startSession = useStudentSessionStore((s) => s.startSession);
  const setResponse = useStudentSessionStore((s) => s.setResponse);
  const setCurrentItemIndex = useStudentSessionStore((s) => s.setCurrentItemIndex);
  const applySession = useStudentSessionStore((s) => s.applySession);

  const [now, setNow] = useState(() => Date.now());
  const [adaptiveItem, setAdaptiveItem] = useState<TestItem | null>(null);
  const [adaptiveFinished, setAdaptiveFinished] = useState(false);

  useEffect(() => {
    if (!isHydrated || !jwt) return;
    void startSession(testDocumentId);
  }, [startSession, testDocumentId, isHydrated, jwt]);

  const isInProgress = session?.status === 'in_progress';
  const isAdaptive = session?.test?.mode === ADAPTIVE_TEST_MODE;
  const durationMinutes = session?.test?.durationMinutes ?? 0;
  const startedAt = session?.startedAt ?? null;

  useEffect(() => {
    if (!isInProgress) return;
    const interval = setInterval(() => setNow(Date.now()), TIMER_TICK_MS);
    return () => clearInterval(interval);
  }, [isInProgress]);

  const secondsLeft = remainingSeconds(startedAt, durationMinutes, now);

  const sessionDocumentId = session?.documentId;
  const syncMutate = syncMutation.mutate;

  useEffect(() => {
    if (!isInProgress || !sessionDocumentId || isAdaptive) return;
    const timeout = setTimeout(() => {
      syncMutate(
        { sessionDocumentId, responseState: responses, currentItemIndex: currentIndex },
        { onSuccess: (updated) => applySession(updated) },
      );
    }, AUTOSAVE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [responses, currentIndex, isInProgress, isAdaptive, sessionDocumentId, syncMutate, applySession]);

  const items = useMemo(() => session?.test?.items ?? [], [session?.test?.items]);

  const nextItemMutate = nextItemMutation.mutate;
  const applyNextItem = useCallback(
    (result: { nextItem: TestItem | null; currentItemIndex: number; finished: boolean }) => {
      setAdaptiveItem(result.nextItem);
      setAdaptiveFinished(result.finished);
      setCurrentItemIndex(result.currentItemIndex);
    },
    [setCurrentItemIndex],
  );

  useEffect(() => {
    if (!isAdaptive || !isInProgress || !sessionDocumentId) return;
    if (adaptiveItem || adaptiveFinished) return;
    nextItemMutate({ sessionDocumentId }, { onSuccess: applyNextItem });
  }, [
    isAdaptive,
    isInProgress,
    sessionDocumentId,
    adaptiveItem,
    adaptiveFinished,
    nextItemMutate,
    applyNextItem,
  ]);

  const setAnswer = useCallback(
    (itemId: string, value: string) => {
      setResponse(itemId, value);
    },
    [setResponse],
  );

  const goLinear = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0));
      setCurrentItemIndex(next);
    },
    [items.length, setCurrentItemIndex],
  );

  const advanceAdaptive = useCallback(() => {
    if (!sessionDocumentId || !adaptiveItem) return;
    const lastItemId = adaptiveItem.id;
    syncMutate(
      { sessionDocumentId, responseState: responses, currentItemIndex: currentIndex },
      {
        onSuccess: () =>
          nextItemMutate({ sessionDocumentId, lastItemId }, { onSuccess: applyNextItem }),
      },
    );
  }, [sessionDocumentId, adaptiveItem, responses, currentIndex, syncMutate, nextItemMutate, applyNextItem]);

  const submitMutate = submitMutation.mutate;
  const handleSubmit = useCallback(() => {
    if (!sessionDocumentId || !isInProgress) return;
    const finalize = () =>
      submitMutate({ sessionDocumentId }, { onSuccess: (updated) => applySession(updated) });
    if (isAdaptive) {
      syncMutate(
        { sessionDocumentId, responseState: responses, currentItemIndex: currentIndex },
        { onSuccess: finalize },
      );
      return;
    }
    finalize();
  }, [
    sessionDocumentId,
    isInProgress,
    isAdaptive,
    responses,
    currentIndex,
    syncMutate,
    submitMutate,
    applySession,
  ]);

  const linearItem = items[currentIndex] ?? null;
  const item = isAdaptive ? adaptiveItem : linearItem;
  const isLast = isAdaptive ? adaptiveFinished : currentIndex >= items.length - 1;
  const canGoPrevious = !isAdaptive && currentIndex > 0;
  const isPreparing = !startError && (!session || (isAdaptive && !adaptiveItem && !adaptiveFinished));

  return {
    session,
    item,
    currentIndex,
    secondsLeft,
    isPreparing,
    startError,
    isAdaptive,
    isLast,
    canGoPrevious,
    isAdvancing: nextItemMutation.isPending || (isAdaptive && syncMutation.isPending),
    isSubmitting: submitMutation.isPending || (isAdaptive && syncMutation.isPending),
    submitError: submitMutation.error,
    isInProgress,
    responses,
    setAnswer,
    goPrevious: () => goLinear(currentIndex - 1),
    goNext: isAdaptive ? advanceAdaptive : () => goLinear(currentIndex + 1),
    submit: handleSubmit,
  };
}
