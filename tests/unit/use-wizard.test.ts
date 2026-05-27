import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useWizard } from '@/modules/forms/hooks/use-wizard';

describe('useWizard', () => {
  it('starts at index 0 with isFirst true and isLast false', () => {
    const { result } = renderHook(() => useWizard({ stepCount: 3 }));

    expect(result.current.stepIndex).toBe(0);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
    expect(result.current.isAdvancing).toBe(false);
  });

  it('respects a clamped initialStep', () => {
    const { result } = renderHook(() => useWizard({ stepCount: 3, initialStep: 10 }));

    expect(result.current.stepIndex).toBe(2);
    expect(result.current.isLast).toBe(true);
  });

  it('advances with goNext and reports isLast at the end', async () => {
    const { result } = renderHook(() => useWizard({ stepCount: 2 }));

    let advanced: boolean | undefined;
    await act(async () => {
      advanced = await result.current.goNext();
    });

    expect(advanced).toBe(true);
    expect(result.current.stepIndex).toBe(1);
    expect(result.current.isLast).toBe(true);
    expect(result.current.isFirst).toBe(false);
  });

  it('does not advance past the last step', async () => {
    const { result } = renderHook(() => useWizard({ stepCount: 1 }));

    let advanced: boolean | undefined;
    await act(async () => {
      advanced = await result.current.goNext();
    });

    expect(advanced).toBe(false);
    expect(result.current.stepIndex).toBe(0);
  });

  it('goBack moves back and never goes below 0', async () => {
    const { result } = renderHook(() => useWizard({ stepCount: 3, initialStep: 1 }));

    act(() => result.current.goBack());
    expect(result.current.stepIndex).toBe(0);

    act(() => result.current.goBack());
    expect(result.current.stepIndex).toBe(0);
  });

  it('goTo jumps to a clamped index', () => {
    const { result } = renderHook(() => useWizard({ stepCount: 4 }));

    act(() => result.current.goTo(2));
    expect(result.current.stepIndex).toBe(2);

    act(() => result.current.goTo(-5));
    expect(result.current.stepIndex).toBe(0);

    act(() => result.current.goTo(99));
    expect(result.current.stepIndex).toBe(3);
  });

  it('blocks advancement when canAdvance resolves false', async () => {
    const canAdvance = vi.fn().mockResolvedValue(false);
    const { result } = renderHook(() => useWizard({ stepCount: 3, canAdvance }));

    let advanced: boolean | undefined;
    await act(async () => {
      advanced = await result.current.goNext();
    });

    expect(canAdvance).toHaveBeenCalledWith(0);
    expect(advanced).toBe(false);
    expect(result.current.stepIndex).toBe(0);
  });

  it('advances when canAdvance resolves true', async () => {
    const canAdvance = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useWizard({ stepCount: 3, canAdvance }));

    let advanced: boolean | undefined;
    await act(async () => {
      advanced = await result.current.goNext();
    });

    expect(advanced).toBe(true);
    expect(result.current.stepIndex).toBe(1);
    expect(result.current.isAdvancing).toBe(false);
  });
});
