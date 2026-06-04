'use client';

import { useRef, useState } from 'react';
import type { DocumentType } from '@/modules/students';

export function useParentDocumentUploadTarget() {
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const formRef = useRef<HTMLElement>(null);

  function selectForUpload(type: DocumentType) {
    setDocumentType(type);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return { documentType, setDocumentType, selectForUpload, formRef };
}
