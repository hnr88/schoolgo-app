export function focusFirstInvalid(container: HTMLElement | null): void {
  if (!container) return;
  const invalid = container.querySelector<HTMLElement>('[aria-invalid="true"]');
  if (!invalid) return;
  invalid.focus();
  invalid.scrollIntoView({ block: 'center' });
}
