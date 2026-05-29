'use client';

import { useTranslations } from 'next-intl';
import { Eye, Pencil, Send } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TemplateStatusBadge } from '@/modules/school-templates/components/TemplateStatusBadge';
import type { ApplicationTemplate } from '@/modules/school-templates/types/school-templates.types';

interface TemplateVersionTableProps {
  templates: ApplicationTemplate[];
  canManage: boolean;
  onView: (template: ApplicationTemplate) => void;
  onEdit: (template: ApplicationTemplate) => void;
  onPublish: (template: ApplicationTemplate) => void;
}

export function TemplateVersionTable({ templates, canManage, onView, onEdit, onPublish }: TemplateVersionTableProps) {
  const t = useTranslations('SchoolTemplates');
  const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString() : '—');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('columnVersion')}</TableHead>
          <TableHead>{t('columnStatus')}</TableHead>
          <TableHead>{t('columnUpdated')}</TableHead>
          <TableHead className='text-right'>{t('columnActions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((tpl) => (
          <TableRow key={tpl.documentId} data-testid={`template-row-${tpl.version}`}>
            <TableCell className='font-medium'>{t('versionLabel', { version: tpl.version })}</TableCell>
            <TableCell><TemplateStatusBadge status={tpl.status} /></TableCell>
            <TableCell className='text-foggy'>{fmt(tpl.updatedAt)}</TableCell>
            <TableCell>
              <div className='flex justify-end gap-1'>
                {tpl.status === 'draft' && canManage ? (
                  <>
                    <Button type='button' variant='ghost' size='sm' onClick={() => onEdit(tpl)} data-testid={`edit-${tpl.version}`}>
                      <Pencil className='mr-1 h-3.5 w-3.5' />{t('edit')}
                    </Button>
                    <Button type='button' variant='outline' size='sm' onClick={() => onPublish(tpl)} data-testid={`publish-${tpl.version}`}>
                      <Send className='mr-1 h-3.5 w-3.5' />{t('publish')}
                    </Button>
                  </>
                ) : (
                  <Button type='button' variant='ghost' size='sm' onClick={() => onView(tpl)} data-testid={`view-${tpl.version}`}>
                    <Eye className='mr-1 h-3.5 w-3.5' />{t('preview')}
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
