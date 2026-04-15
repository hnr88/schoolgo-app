import { beforeEach, describe, expect, it } from 'vitest';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

describe('useSchoolSearchStore', () => {
  beforeEach(() => {
    useSchoolSearchStore.getState().reset();
  });

  it('toggles a curriculum on and off', () => {
    const { toggleCurriculum } = useSchoolSearchStore.getState();

    toggleCurriculum('IB');
    expect(useSchoolSearchStore.getState().curricula).toContain('IB');

    toggleCurriculum('IB');
    expect(useSchoolSearchStore.getState().curricula).not.toContain('IB');
  });

  it('clamps price range to the allowed bounds', () => {
    const { setPriceRange } = useSchoolSearchStore.getState();

    setPriceRange(-1000, 999_999);
    const { priceMin, priceMax } = useSchoolSearchStore.getState();

    expect(priceMin).toBeGreaterThanOrEqual(5000);
    expect(priceMax).toBeLessThanOrEqual(60000);
  });

  it('toggles a chip', () => {
    const { toggleChip } = useSchoolSearchStore.getState();

    toggleChip('boarding');
    expect(useSchoolSearchStore.getState().activeChips).toContain('boarding');

    toggleChip('boarding');
    expect(useSchoolSearchStore.getState().activeChips).not.toContain('boarding');
  });
});
