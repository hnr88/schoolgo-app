import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'ko', 'ms', 'vi', 'th'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
