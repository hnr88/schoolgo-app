import type { ReactNode } from 'react';

/**
 * Render-prop context handed to each repeatable row. `update` patches the item
 * at `index` (shallow-merge); `field`/`setField` are convenience helpers for a
 * single key, keeping per-section editors terse.
 */
export interface RepeatableRowContext<T> {
  item: T;
  index: number;
  update: (patch: Partial<T>) => void;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
}

export interface RepeatableSectionLabels {
  /** Add-row button label, e.g. "Add credential". */
  addLabel: string;
  /** Heading per row; receives the 1-based row number. */
  rowLabel: (index: number) => string;
  removeLabel: string;
  moveUpLabel: string;
  moveDownLabel: string;
  /** Shown when there are no rows yet. */
  emptyLabel: string;
}

export interface RepeatableSectionProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  /** Factory for a blank row when "Add" is pressed. */
  makeItem: () => T;
  /** Per-item field renderer (the render prop). */
  renderItem: (ctx: RepeatableRowContext<T>) => ReactNode;
  labels: RepeatableSectionLabels;
  /** Cap the number of rows; omit for unlimited (min:0, no max). */
  maxItems?: number;
  /** Enable up/down reorder controls (default true). */
  reorderable?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Return shape of the useRepeatableSection logic hook. */
export interface UseRepeatableSectionReturn<T> {
  rows: T[];
  canAdd: boolean;
  add: () => void;
  remove: (index: number) => void;
  update: (index: number, patch: Partial<T>) => void;
  move: (index: number, direction: -1 | 1) => void;
}
