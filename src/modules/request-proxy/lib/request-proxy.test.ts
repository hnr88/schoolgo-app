import { describe, expect, it } from 'vitest';
import { resolvePortal } from '@/modules/request-proxy/lib/portal-resolution';

// vitest.config.ts pins the env: base domain schoolgo.com.au with
// parent/agent/school.schoolgo.com.au as the configured portal hosts.
describe('resolvePortal', () => {
  it('resolves the configured portal hosts by exact match', () => {
    expect(resolvePortal('agent.schoolgo.com.au')).toBe('agent');
    expect(resolvePortal('school.schoolgo.com.au')).toBe('school');
    expect(resolvePortal('parent.schoolgo.com.au')).toBe('parent');
  });

  it('resolves the apex and www to the parent portal', () => {
    expect(resolvePortal('schoolgo.com.au')).toBe('parent');
    expect(resolvePortal('www.schoolgo.com.au')).toBe('parent');
  });

  it('resolves portals by the leftmost subdomain label (preview/multi-level hosts)', () => {
    expect(resolvePortal('agent.staging.schoolgo.com.au')).toBe('agent');
    expect(resolvePortal('school.preview.schoolgo.com.au')).toBe('school');
  });

  it('falls back to parent for unknown subdomains and foreign hosts', () => {
    expect(resolvePortal('marketing.schoolgo.com.au')).toBe('parent');
    expect(resolvePortal('schoolgo-app.vercel.app')).toBe('parent');
    expect(resolvePortal('127.0.0.1')).toBe('parent');
  });
});
