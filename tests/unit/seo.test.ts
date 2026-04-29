import { describe, expect, it } from 'vitest';
import { isNonIndexableHost } from '@/lib/seo';

describe('seo indexing policy', () => {
  it('blocks staging and local hosts from indexing', () => {
    expect(isNonIndexableHost('localhost')).toBe(true);
    expect(isNonIndexableHost('parent.localhost')).toBe(true);
    expect(isNonIndexableHost('staging-xxx.schoolgo.com.au')).toBe(true);
  });

  it('allows production hosts to be indexed', () => {
    expect(isNonIndexableHost('schoolgo.com.au')).toBe(false);
    expect(isNonIndexableHost('school.schoolgo.com.au')).toBe(false);
    expect(isNonIndexableHost('agent.schoolgo.com.au')).toBe(false);
  });
});
