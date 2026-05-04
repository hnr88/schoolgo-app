export function scrollToHash() {
  const { hash } = window.location;
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
