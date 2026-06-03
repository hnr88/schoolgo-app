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
        <TableRow className='border-b border-divider hover:bg-transparent'>
          <TableHead className='pl-5 text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnVersion')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStatus')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnUpdated')}</TableHead>
          <TableHead className='pr-5 text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnActions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((tpl) => (
          <TableRow key={tpl.documentId} className='hover:bg-muted' data-testid={`template-row-${tpl.version}`}>
            <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>{t('versionLabel', { version: tpl.version })}</TableCell>
            <TableCell className='py-3.5'><TemplateStatusBadge status={tpl.status} /></TableCell>
            <TableCell className='py-3.5 text-foggy'>{fmt(tpl.updatedAt)}</TableCell>
            <TableCell className='pr-5 py-3.5'>
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
