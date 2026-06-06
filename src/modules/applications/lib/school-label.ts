import type { SchoolOption } from '@/modules/applications/types/create-application.types';

export function buildSchoolLabel(parts: {
  name: string;
  suburb?: string | null;
  state?: string | null;
}): string {
  const { name, suburb, state } = parts;
  const location = suburb ? `, ${suburb}` : '';
  const region = state ? ` (${state})` : '';
  return `${name}${location}${region}`;
}

export function presetSchoolLabel(presetSchool: SchoolOption | null): string {
  if (!presetSchool) return '';
  return buildSchoolLabel(presetSchool);
}
