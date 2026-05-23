const GRADIENTS: [string, string][] = [
  ['#0ea5e9', '#6366f1'], // sky → indigo
  ['#10b981', '#3b82f6'], // emerald → blue
  ['#f59e0b', '#ef4444'], // amber → red
  ['#8b5cf6', '#ec4899'], // violet → pink
  ['#06b6d4', '#8b5cf6'], // cyan → violet
  ['#84cc16', '#10b981'], // lime → emerald
];

function hashId(id: string): number {
  return Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
}

function buildSvg(from: string, to: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g fill="rgba(255,255,255,0.15)">
      <circle cx="50%" cy="55%" r="48"/>
      <path d="M200 260 L240 220 L280 260 L260 260 L240 240 L220 260 Z"/>
      <rect x="215" y="260" width="50" height="35" rx="4"/>
    </g>
  </svg>`;
}

export function generateGradientPlaceholder(seed: string): string {
  const hash = hashId(seed);
  const [from, to] = GRADIENTS[hash % GRADIENTS.length];
  const svg = buildSvg(from, to);
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export function generateSchoolPlaceholder(id: string): string {
  return generateGradientPlaceholder(id);
}
