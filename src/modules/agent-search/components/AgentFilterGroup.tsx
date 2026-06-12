'use client';

import { FilterChipGroup } from '@/modules/school-search/components/filters/FilterChipGroup';
import type { AgentFilterOption } from '@/modules/agent-search/constants/agent-search.constants';

interface AgentFilterGroupProps {
  label: string;
  options: readonly AgentFilterOption<string>[];
  selected: string[];
  onToggle: (value: string) => void;
  optionLabel: (key: string) => string;
}

export function AgentFilterGroup({
  label,
  options,
  selected,
  onToggle,
  optionLabel,
}: AgentFilterGroupProps) {
  const handleChange = (next: string[] | string | null) => {
    const nextArr = Array.isArray(next) ? next : next ? [next] : [];
    const removed = selected.filter((v) => !nextArr.includes(v));
    const added = nextArr.filter((v) => !selected.includes(v));
    removed.forEach(onToggle);
    added.forEach(onToggle);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <FilterChipGroup<string>
        options={options}
        value={selected}
        onChange={handleChange}
        multi
        ariaLabel={label}
        size="sm"
        getLabel={(option) => optionLabel(option.labelKey)}
      />
    </div>
  );
}
