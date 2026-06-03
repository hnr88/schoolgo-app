const NON_ADVANCING_INPUT_TYPES = new Set(['button', 'submit', 'reset', 'checkbox', 'radio']);

export function isSingleLineFormControl(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return false;
  if (target.getAttribute('aria-expanded') === 'true') return false;
  if (target.tagName === 'TEXTAREA') return false;
  if (target.tagName !== 'INPUT') return false;

  const type = (target.getAttribute('type') ?? 'text').toLowerCase();
  return !NON_ADVANCING_INPUT_TYPES.has(type);
}
