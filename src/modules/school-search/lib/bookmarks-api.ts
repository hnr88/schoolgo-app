import { privateApi } from '@/lib/axios';
import type {
  BookmarkResponse,
  BookmarksListResponse,
  CreateBookmarkInput,
} from '@/modules/school-search/types/bookmarks.types';

export async function createBookmark(input: CreateBookmarkInput): Promise<BookmarkResponse> {
  const { data } = await privateApi.post<BookmarkResponse>('/api/bookmarks', input);
  return data;
}

export async function listBookmarks(): Promise<BookmarksListResponse> {
  const { data } = await privateApi.get<BookmarksListResponse>('/api/bookmarks');
  return data;
}

export async function deleteBookmark(schoolDocumentId: string): Promise<void> {
  await privateApi.delete(`/api/bookmarks/${schoolDocumentId}`);
}
