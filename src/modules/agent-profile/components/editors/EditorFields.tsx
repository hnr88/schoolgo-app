'use client';

import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

/** Stacked label + control used by every repeatable editor field. */
export function FieldShell({ label, htmlFor, children }: FieldShellProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={htmlFor} className='text-sm font-medium text-foreground'>
        {label}
      </Label>
      {children}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'url' | 'email' | 'tel';
  placeholder?: string;
  disabled?: boolean;
}

export function TextField({ id, label, value, onChange, type = 'text', placeholder, disabled }: TextFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id}>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
}

export function NumberField({ id, label, value, onChange, min, max, placeholder, disabled }: NumberFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id}>
      <Input
        id={id}
        type='number'
        inputMode='numeric'
        min={min}
        max={max}
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => {
          const next = event.target.value;
          onChange(next === '' ? null : Number(next));
        }}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

export function TextAreaField({ id, label, value, onChange, rows = 3, placeholder, disabled }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  optionLabel: (option: string) => string;
  disabled?: boolean;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  optionLabel,
  disabled,
}: SelectFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id}>
      <Select
        value={value || undefined}
        onValueChange={(next) => onChange(next ?? '')}
        disabled={disabled}
      >
        <SelectTrigger id={id} className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {optionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

interface SwitchFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SwitchField({ id, label, checked, onChange, disabled }: SwitchFieldProps) {
  return (
    <div className='flex items-center justify-between gap-4'>
      <Label htmlFor={id} className='text-sm font-medium text-foreground'>
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} disabled={disabled} aria-label={label} />
    </div>
  );
}
