/**
 * Shared props for every repeatable per-section editor. Editors are fully
 * controlled: the builder shell owns the array and passes `items` + `onChange`
 * (replace-array semantics matching the BE `updateMe`). `disabled` mirrors the
 * shell's saving state.
 */
export interface RepeatableEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  disabled?: boolean;
}
