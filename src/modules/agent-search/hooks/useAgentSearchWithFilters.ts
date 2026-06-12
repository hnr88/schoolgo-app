'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import { useAgentSearch } from '@/modules/agent-search/queries/use-agent-search.query';
import { mapAgentStoreToTypedRequest } from '@/modules/agent-search/lib/store-to-typed-request';

const DEBOUNCE_MS = 300;

export function useAgentSearchWithFilters() {
  const q = useAgentSearchStore((s) => s.q);
  const countriesServed = useAgentSearchStore((s) => s.countriesServed);
  const languages = useAgentSearchStore((s) => s.languages);
  const services = useAgentSearchStore((s) => s.services);
  const verifiedOnly = useAgentSearchStore((s) => s.verifiedOnly);
  const sortBy = useAgentSearchStore((s) => s.sortBy);
  const page = useAgentSearchStore((s) => s.page);
  const pageSize = useAgentSearchStore((s) => s.pageSize);

  const [debouncedQuery, setDebouncedQuery] = useState(q);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(q), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [q]);

  const typedRequest = useMemo(
    () =>
      mapAgentStoreToTypedRequest({
        q: debouncedQuery,
        countriesServed,
        languages,
        services,
        verifiedOnly,
        sortBy,
        page,
        pageSize,
      }),
    [
      debouncedQuery,
      countriesServed,
      languages,
      services,
      verifiedOnly,
      sortBy,
      page,
      pageSize,
    ],
  );

  return useAgentSearch(typedRequest);
}
