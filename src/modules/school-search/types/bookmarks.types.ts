import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export interface Bookmark {
  documentId: string;
  schoolId: string;
  createdAt: string;
}

export interface CreateBookmarkInput {
  schoolId: string;
}

export interface BookmarkResponse {
  data: Bookmark;
  error?: null | { status: number; message: string };
}

export interface BookmarksListResponse {
  data: SchoolHit[];
  error?: null | { status: number; message: string };
}

export type { SchoolHit };
