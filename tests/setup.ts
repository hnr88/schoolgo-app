import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

process.env.NEXT_PUBLIC_BASE_DOMAIN ??= 'localhost:3000';

afterEach(() => {
  cleanup();
});
