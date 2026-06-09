export interface IcsEventInput {
  uid: string;
  start: Date;
  summary: string;
  url?: string | null;
  stamp: Date;
}

export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

export function formatIcsDateUtc(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

export function buildIcs(event: IcsEventInput): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SchoolGo//Interview Hub//EN',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(event.uid)}@schoolgo`,
    `DTSTAMP:${formatIcsDateUtc(event.stamp)}`,
    `DTSTART:${formatIcsDateUtc(event.start)}`,
    `SUMMARY:${escapeIcsText(event.summary)}`,
  ];

  if (event.url) {
    lines.push(`URL:${event.url}`);
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
}
