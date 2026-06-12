export function computePageCount(total: number, pageSize: number): number {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(total / pageSize));
}

export function buildPageWindow(current: number, pageCount: number): number[] {
  const window = 2;
  const start = Math.max(1, current - window);
  const end = Math.min(pageCount, current + window);
  const pages: number[] = [];
  for (let page = start; page <= end; page += 1) pages.push(page);
  return pages;
}
