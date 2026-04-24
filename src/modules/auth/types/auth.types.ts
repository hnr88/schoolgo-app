import type { Portal } from '@/lib/portal-url';

export enum UserRole {
  SUPER_ADMIN = 'super-admin',
  SCHOOL_ADMIN = 'school-admin',
  PARENT = 'parent',
  AGENT = 'agent',
}

export interface User {
  id: string | number;
  documentId: string;
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  school?: {
    id: string | number;
    name: string;
  };
  locale?: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  jwt: string | null;
  userType: Portal | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isHydrated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setUserType: (userType: Portal) => void;
  initialize: () => Promise<void>;
}

export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}
