'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
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
  return (
    <div className='space-y-2 border-t border-divider px-4 py-3'>
      <Label className='text-body-sm font-semibold text-ink-900'>{label}</Label>
      <div className='flex flex-col gap-1'>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type='button'
              onClick={() => onToggle(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                'flex w-full items-center justify-between rounded-lg border px-2 py-0.5 text-left text-label font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                isSelected
                  ? 'border-primary bg-rausch-50 text-primary shadow-1'
                  : 'border-border bg-background text-foreground hover:border-quill hover:bg-muted',
              )}
            >
              {optionLabel(opt.labelKey)}
              {isSelected && (
                <Check className='h-3 w-3 shrink-0 text-primary' strokeWidth={2.25} aria-hidden='true' />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
