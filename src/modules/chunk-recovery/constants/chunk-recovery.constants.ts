export const CHUNK_ERROR_PATTERNS: readonly RegExp[] = [
  /ChunkLoadError/i,
  /Loading chunk [\w-]+ failed/i,
  /Loading CSS chunk [\w-]+ failed/i,
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
];

export const CHUNK_ASSET_PATH = '/_next/static/';

export const CHUNK_RELOAD_STORAGE_KEY = 'schoolgo:chunk-reloaded-at';

export const CHUNK_RELOAD_COOLDOWN_MS = 15_000;
