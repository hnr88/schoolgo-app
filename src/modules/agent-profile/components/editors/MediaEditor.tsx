'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { EditorSelect } from '@/modules/agent-profile/components/editors/EditorSelect';
import {
  MEDIA_ITEM_CATEGORIES,
  MEDIA_ITEM_TYPES,
} from '@/modules/agent-profile/constants/editor-options.constants';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type {
  MediaItem,
  MediaItemCategory,
  MediaItemType,
} from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): MediaItem {
  return { mediaType: 'photo', media: null, videoUrl: '', caption: '', category: 'office', order: 0 };
}

/** Repeatable editor for `shared.media-item` (office/team/event gallery). */
export function MediaEditor({ items, onChange, disabled }: RepeatableEditorProps<MediaItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<MediaItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('mediaItemAdd'),
        rowLabel: (n) => t('mediaItemRow', { number: n }),
        removeLabel: t('mediaItemRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('mediaItemEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('mediaItemType')}>
              <EditorSelect
                value={item.mediaType}
                options={MEDIA_ITEM_TYPES}
                disabled={disabled}
                optionLabel={(option) => t(`mediaItemType_${option}`)}
                onValueChange={(value) => setField('mediaType', value as MediaItemType)}
              />
            </EditorField>
            <EditorField label={t('mediaItemCategory')}>
              <EditorSelect
                value={item.category}
                options={MEDIA_ITEM_CATEGORIES}
                disabled={disabled}
                optionLabel={(option) => t(`mediaItemCategory_${option}`)}
                onValueChange={(value) => setField('category', value as MediaItemCategory)}
              />
            </EditorField>
          </div>
          {item.mediaType === 'video_url' ? (
            <EditorField label={t('mediaItemVideoUrl')}>
              <Input
                type='url'
                value={item.videoUrl}
                disabled={disabled}
                placeholder={t('mediaItemVideoUrlPlaceholder')}
                onChange={(e) => setField('videoUrl', e.target.value)}
              />
            </EditorField>
          ) : (
            <RepeatableMediaField
              label={t('mediaItemMedia')}
              value={item.media}
              disabled={disabled}
              onChange={(media) => setField('media', media)}
            />
          )}
          <EditorField label={t('mediaItemCaption')}>
            <Input
              value={item.caption}
              disabled={disabled}
              onChange={(e) => setField('caption', e.target.value)}
            />
          </EditorField>
        </div>
      )}
    />
  );
}
