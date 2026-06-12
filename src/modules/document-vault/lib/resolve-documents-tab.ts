import { DOCUMENTS_TAB_DEFAULT } from '@/modules/document-vault/constants/document-vault.constants';
import {
  DOCUMENTS_TABS,
  type DocumentsTab,
} from '@/modules/document-vault/types/document-vault.types';

export function resolveDocumentsTab(value: string | null): DocumentsTab {
  return DOCUMENTS_TABS.find((tab) => tab === value) ?? DOCUMENTS_TAB_DEFAULT;
}
