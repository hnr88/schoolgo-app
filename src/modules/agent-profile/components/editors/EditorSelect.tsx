'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditorSelectProps {
  value: string;
  options: readonly string[];
  optionLabel: (option: string) => string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Enum Select shared by the repeatable per-section editors. `optionLabel`
 * resolves each enum value to its localized label (AgentProfileBuilder namespace).
 */
export function EditorSelect({
  value,
  options,
  optionLabel,
  onValueChange,
  disabled,
}: EditorSelectProps) {
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(next) => onValueChange(next ?? '')}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {optionLabel(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
