import { describe, expect, it } from 'vitest';
import {
  buildIcs,
  escapeIcsText,
  formatIcsDateUtc,
} from '@/modules/parent-interviews/lib/build-ics';

describe('escapeIcsText', () => {
  it('escapes backslashes, semicolons, commas and newlines', () => {
    expect(escapeIcsText('a\\b')).toBe('a\\\\b');
    expect(escapeIcsText('a;b')).toBe('a\\;b');
    expect(escapeIcsText('a,b')).toBe('a\\,b');
    expect(escapeIcsText('a\nb')).toBe('a\\nb');
    expect(escapeIcsText('a\r\nb')).toBe('a\\nb');
  });

  it('escapes backslash before other characters to avoid double escaping', () => {
    expect(escapeIcsText('a\\;b')).toBe('a\\\\\\;b');
  });

  it('leaves plain text untouched', () => {
    expect(escapeIcsText('Interview at Springfield High')).toBe(
      'Interview at Springfield High',
    );
  });
});

describe('formatIcsDateUtc', () => {
  it('formats a date as basic UTC form with Z suffix', () => {
    expect(formatIcsDateUtc(new Date('2026-07-01T09:05:30.000Z'))).toBe('20260701T090530Z');
  });

  it('zero-pads single digit components', () => {
    expect(formatIcsDateUtc(new Date('2026-01-02T03:04:05.000Z'))).toBe('20260102T030405Z');
  });
});

describe('buildIcs', () => {
  const input = {
    uid: 'abc123def456abc123def456',
    start: new Date('2026-07-01T09:00:00.000Z'),
    summary: 'Interview: Jane Doe, Springfield High',
    url: 'https://zoom.us/j/123',
    stamp: new Date('2026-06-09T12:00:00.000Z'),
  };

  it('produces the full file shape with CRLF line endings', () => {
    expect(buildIcs(input)).toBe(
      'BEGIN:VCALENDAR\r\n' +
        'VERSION:2.0\r\n' +
        'PRODID:-//SchoolGo//Interview Hub//EN\r\n' +
        'BEGIN:VEVENT\r\n' +
        'UID:abc123def456abc123def456@schoolgo\r\n' +
        'DTSTAMP:20260609T120000Z\r\n' +
        'DTSTART:20260701T090000Z\r\n' +
        'SUMMARY:Interview: Jane Doe\\, Springfield High\r\n' +
        'URL:https://zoom.us/j/123\r\n' +
        'END:VEVENT\r\n' +
        'END:VCALENDAR\r\n',
    );
  });

  it('emits the URL value verbatim without TEXT escaping', () => {
    const ics = buildIcs({ ...input, url: 'https://zoom.us/j/123?pwd=a,b;c' });
    expect(ics).toContain('URL:https://zoom.us/j/123?pwd=a,b;c\r\n');
    expect(ics).toContain('SUMMARY:Interview: Jane Doe\\, Springfield High\r\n');
  });

  it('omits the URL line when no url is given', () => {
    const ics = buildIcs({ ...input, url: null });
    expect(ics).not.toContain('URL:');
    expect(ics).toContain('SUMMARY:');
  });

  it('uses only CRLF (never bare LF) line endings', () => {
    const ics = buildIcs(input);
    expect(ics.replace(/\r\n/g, '')).not.toContain('\n');
  });
});
