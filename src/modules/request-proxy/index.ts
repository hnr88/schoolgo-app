export {
  LAUNCHING_SOON,
  LOGGED_IN_PORTAL_COOKIE,
} from '@/modules/request-proxy/constants/request-proxy.constants';
export {
  detectLocale,
  isPublicContentPath,
  isPublicStaticContentPath,
  isTrustedHost,
  resolvePortal,
  withRobotsHeader,
} from '@/modules/request-proxy/lib/request-proxy';
export type { RequestPortal } from '@/modules/request-proxy/types/request-proxy.types';
