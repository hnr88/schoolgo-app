const AVATAR_COLORS = [
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-violet-100 text-violet-700',
  'bg-cyan-100 text-cyan-700',
  'bg-lime-100 text-lime-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
];

export interface SchoolAvatarTheme {
  /** Soft diagonal tint for placeholder surfaces (gradient stop classes). */
  surface: string;
  /** Low-opacity icon watermark colour. */
  watermark: string;
  /** Solid initials chip background + ink. */
  chip: string;
  /** Hairline ring tone for the initials chip. */
  ring: string;
}

const AVATAR_THEMES: SchoolAvatarTheme[] = [
  { surface: 'from-sky-50 to-sky-100', watermark: 'text-sky-300', chip: 'bg-sky-600 text-white', ring: 'ring-sky-200' },
  { surface: 'from-emerald-50 to-emerald-100', watermark: 'text-emerald-300', chip: 'bg-emerald-600 text-white', ring: 'ring-emerald-200' },
  { surface: 'from-amber-50 to-amber-100', watermark: 'text-amber-300', chip: 'bg-amber-600 text-white', ring: 'ring-amber-200' },
  { surface: 'from-violet-50 to-violet-100', watermark: 'text-violet-300', chip: 'bg-violet-600 text-white', ring: 'ring-violet-200' },
  { surface: 'from-cyan-50 to-cyan-100', watermark: 'text-cyan-300', chip: 'bg-cyan-600 text-white', ring: 'ring-cyan-200' },
  { surface: 'from-lime-50 to-lime-100', watermark: 'text-lime-300', chip: 'bg-lime-600 text-white', ring: 'ring-lime-200' },
  { surface: 'from-rose-50 to-rose-100', watermark: 'text-rose-300', chip: 'bg-rose-600 text-white', ring: 'ring-rose-200' },
  { surface: 'from-indigo-50 to-indigo-100', watermark: 'text-indigo-300', chip: 'bg-indigo-600 text-white', ring: 'ring-indigo-200' },
];

function getSchoolAvatarIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATAR_COLORS.length;
}

export function getSchoolInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function getSchoolAvatarColor(name: string): string {
  return AVATAR_COLORS[getSchoolAvatarIndex(name)];
}

export function getSchoolAvatarTheme(name: string): SchoolAvatarTheme {
  return AVATAR_THEMES[getSchoolAvatarIndex(name)];
}
