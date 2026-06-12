'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useAutocompleteSchools } from '@/modules/school-search/queries/use-autocomplete-schools.query';
import { useAutocompleteSuburbs } from '@/modules/school-search/queries/use-autocomplete-suburbs.query';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import { useAutocompleteAgents } from '@/modules/agent-search/queries/use-autocomplete-agents.query';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import { useSearchModeStore } from '@/modules/unified-search/stores/use-search-mode-store';
import {
  AUTOCOMPLETE_MAX_STATES,
  AUTOCOMPLETE_STATE_ORDER,
  AU_STATE_NAMES,
} from '@/modules/unified-search/constants/autocomplete.constants';
import type {
  AutocompleteGroup,
  AutocompleteItem,
} from '@/modules/unified-search/types/autocomplete.types';

const SCHOOL_LIMIT = 6;
const SUBURB_LIMIT = 5;
const AGENT_LIMIT = 8;

export function useUnifiedAutocomplete() {
  const mode = useSearchModeStore((s) => s.mode);
  const isSchools = mode === 'schools';

  const schoolQuery = useSchoolSearchStore((s) => s.query);
  const setSchoolQuery = useSchoolSearchStore((s) => s.setQuery);
  const setLocationSearch = useSchoolSearchStore((s) => s.setLocationSearch);
  const clearSchoolSearch = useSchoolSearchStore((s) => s.clearSearch);
  const setStates = useSchoolSearchStore((s) => s.setStates);

  const agentQuery = useAgentSearchStore((s) => s.q);
  const setAgentQuery = useAgentSearchStore((s) => s.setQuery);

  const value = isSchools ? schoolQuery : agentQuery;

  const schoolsResult = useAutocompleteSchools(isSchools ? value : '', SCHOOL_LIMIT);
  const suburbsResult = useAutocompleteSuburbs(isSchools ? value : '', SUBURB_LIMIT);
  const agentsResult = useAutocompleteAgents(isSchools ? '' : value, AGENT_LIMIT);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const groups = useMemo<AutocompleteGroup[]>(() => {
    const q = value.trim();
    if (q.length < 1) return [];

    const result: AutocompleteGroup[] = [];
    let idx = 0;
    const pushGroup = (id: string, headingKey: string, items: AutocompleteItem[]) => {
      if (items.length > 0) result.push({ id, headingKey, items });
    };

    if (isSchools) {
      const schools = schoolsResult.isPlaceholderData ? [] : schoolsResult.data?.data ?? [];
      const suburbs = suburbsResult.isPlaceholderData ? [] : suburbsResult.data?.data ?? [];
      const lower = q.toLowerCase();
      const states = AUTOCOMPLETE_STATE_ORDER.filter(
        (code) =>
          code.toLowerCase().includes(lower) || AU_STATE_NAMES[code].toLowerCase().includes(lower),
      ).slice(0, AUTOCOMPLETE_MAX_STATES);

      pushGroup(
        'schools',
        'autocomplete.schoolsHeading',
        schools.map((hit): AutocompleteItem => ({
          key: `school-${hit.id}`,
          kind: 'school',
          index: idx++,
          label: hit.name,
          sublabel: [hit.suburb, hit.state].filter(Boolean).join(', ') || null,
          iconUrl: hit.logoUrl,
          onSelect: () => setSchoolQuery(hit.name),
        })),
      );

      pushGroup(
        'locations',
        'autocomplete.locationsHeading',
        suburbs.map((hit): AutocompleteItem => ({
          key: `suburb-${hit.suburb}-${hit.postcode}-${hit.state}`,
          kind: 'suburb',
          index: idx++,
          label: hit.suburb,
          sublabel: [hit.postcode, hit.state].filter(Boolean).join(' ') || null,
          iconUrl: null,
          onSelect: () => setLocationSearch({ suburb: hit.suburb, postcode: hit.postcode ?? '' }),
        })),
      );

      pushGroup(
        'regions',
        'autocomplete.regionsHeading',
        states.map((code): AutocompleteItem => ({
          key: `state-${code}`,
          kind: 'state',
          index: idx++,
          label: AU_STATE_NAMES[code],
          sublabel: code,
          iconUrl: null,
          onSelect: () => {
            clearSchoolSearch();
            setStates([code]);
          },
        })),
      );
    } else {
      const agents = agentsResult.isPlaceholderData ? [] : agentsResult.data?.data ?? [];
      pushGroup(
        'agents',
        'autocomplete.agentsHeading',
        agents.map((hit): AutocompleteItem => ({
          key: `agent-${hit.id}`,
          kind: 'agent',
          index: idx++,
          label: hit.name,
          sublabel: hit.headline,
          iconUrl: hit.photoUrl,
          onSelect: () => setAgentQuery(hit.name),
        })),
      );
    }

    return result;
  }, [
    value,
    isSchools,
    schoolsResult.data,
    schoolsResult.isPlaceholderData,
    suburbsResult.data,
    suburbsResult.isPlaceholderData,
    agentsResult.data,
    agentsResult.isPlaceholderData,
    setSchoolQuery,
    setLocationSearch,
    clearSchoolSearch,
    setStates,
    setAgentQuery,
  ]);

  const flatItems = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const isLoading = isSchools
    ? schoolsResult.isFetching || suburbsResult.isFetching
    : agentsResult.isFetching;
  const isEmpty = !isLoading && flatItems.length === 0;

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      if (isSchools) setSchoolQuery(next);
      else setAgentQuery(next);
      setActiveIndex(-1);
      setOpen(next.trim().length >= 1);
    },
    [isSchools, setSchoolQuery, setAgentQuery],
  );

  const selectItem = useCallback(
    (item: AutocompleteItem) => {
      item.onSelect();
      close();
    },
    [close],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((i) => Math.min(flatItems.length - 1, i + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (event.key === 'Enter') {
        if (open && activeIndex >= 0 && flatItems[activeIndex]) {
          event.preventDefault();
          selectItem(flatItems[activeIndex]);
        }
      } else if (event.key === 'Escape') {
        close();
      }
    },
    [flatItems, open, activeIndex, selectItem, close],
  );

  const onFocus = useCallback(() => {
    if (value.trim().length >= 1) setOpen(true);
  }, [value]);

  const onBlur = useCallback(() => {
    // Delay so a pointer selection (which blurs the input) can resolve first.
    window.setTimeout(() => setOpen(false), 120);
  }, []);

  return {
    value,
    open: open && value.trim().length >= 1,
    activeIndex,
    groups,
    isLoading,
    isEmpty,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
    setActiveIndex,
    selectItem,
  };
}
