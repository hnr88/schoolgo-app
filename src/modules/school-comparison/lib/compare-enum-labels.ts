import type { EnumTranslator } from '@/modules/school-comparison/types/comparison.types';

/**
 * Maps a normalized raw enum value (lowercased, separators stripped) to a
 * next-intl key under the `SchoolSearch.spec.*` namespaces. Values absent from
 * this map fall back to the caller-provided humanizer so display never breaks.
 */
const ENUM_KEY_BY_NORMALIZED: Record<string, string> = {
  // sector
  government: 'sector.government',
  gov: 'sector.government',
  nongovernment: 'sector.nonGovernment',
  nongov: 'sector.nonGovernment',
  catholic: 'sector.catholic',
  // gender
  boys: 'gender.boys',
  girls: 'gender.girls',
  coed: 'gender.coEd',
  // school type / level
  primary: 'schoolLevel.primary',
  secondary: 'schoolLevel.secondary',
  // religious affiliation
  nondenominational: 'religion.nonDenominational',
  anglican: 'religion.anglican',
  baptist: 'religion.baptist',
  lutheran: 'religion.lutheran',
  unitingchurch: 'religion.unitingChurch',
  presbyterian: 'religion.presbyterian',
  islamic: 'religion.islamic',
  jewish: 'religion.jewish',
  buddhist: 'religion.buddhist',
  copticorthodox: 'religion.copticOrthodox',
  greekorthodox: 'religion.greekOrthodox',
  seventhdayadventist: 'religion.seventhDayAdventist',
  quaker: 'religion.quaker',
  interdenominationalchristian: 'religion.interdenominationalChristian',
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Builds an {@link EnumTranslator} bound to a next-intl translator scoped to the
 * `SchoolSearch.spec` namespace. Returns null for unmapped values.
 */
export function createEnumTranslator(
  translate: (key: string) => string,
): EnumTranslator {
  return (value: string) => {
    const key = ENUM_KEY_BY_NORMALIZED[normalize(value)];
    return key ? translate(key) : null;
  };
}
