'use client';

import { Switch } from '@/components/ui/switch';

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * Inline label + Switch shared by the repeatable per-section editors for boolean
 * component fields (e.g. consentObtained, isPrimary, isPrimaryDestination).
 */
export function ToggleField({ label, checked, onCheckedChange, disabled }: ToggleFieldProps) {
  return (
    <div className='flex items-center gap-2'>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
      <span className='text-xs text-muted-foreground'>{label}</span>
    </div>
  );
}
