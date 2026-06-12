'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import {
  NumberField,
  TextAreaField,
  TextField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import type { CounsellorItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeCounsellor(): CounsellorItem {
  return {
    fullName: '',
    localScriptName: '',
    photo: null,
    roleTitle: '',
    qeacNumber: '',
    maraNumber: '',
    qualifications: '',
    yearsExperience: null,
    languages: '',
    specialisations: '',
    bio: '',
    email: '',
    officeCity: '',
    bookingUrl: '',
    order: 0,
  };
}

/**
 * Repeatable editor for `shared.counsellor` items — named team members parents
 * pick a person to trust. Fields: name/photo/role/qeac/mara/quals/langs/bio +
 * contact (per the contract). Photo uploaded via RepeatableMediaField (its
 * media id is what `updateMe` persists). Degrades gracefully — only name is needed.
 */
export function CounsellorsEditor({ items, onChange, disabled }: RepeatableEditorProps<CounsellorItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<CounsellorItem>
      items={items}
      onChange={onChange}
      makeItem={makeCounsellor}
      disabled={disabled}
      labels={{
        addLabel: t('counsellorAdd'),
        rowLabel: (index) => t('counsellorRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('counsellorEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='flex flex-col gap-3'>
          <RepeatableMediaField
            label={t('counsellorPhotoLabel')}
            value={item.photo}
            onChange={(media) => setField('photo', media)}
            disabled={disabled}
          />
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <TextField id={`counsellor-${index}-name`} label={t('counsellorNameLabel')} value={item.fullName} onChange={(value) => setField('fullName', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-localname`} label={t('counsellorLocalNameLabel')} value={item.localScriptName} onChange={(value) => setField('localScriptName', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-role`} label={t('counsellorRoleLabel')} value={item.roleTitle} onChange={(value) => setField('roleTitle', value)} disabled={disabled} />
            <NumberField id={`counsellor-${index}-years`} label={t('counsellorYearsLabel')} value={item.yearsExperience} onChange={(value) => setField('yearsExperience', value)} min={0} disabled={disabled} />
            <TextField id={`counsellor-${index}-qeac`} label={t('counsellorQeacLabel')} value={item.qeacNumber} onChange={(value) => setField('qeacNumber', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-mara`} label={t('counsellorMaraLabel')} value={item.maraNumber} onChange={(value) => setField('maraNumber', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-quals`} label={t('counsellorQualificationsLabel')} value={item.qualifications} onChange={(value) => setField('qualifications', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-langs`} label={t('counsellorLanguagesLabel')} value={item.languages} onChange={(value) => setField('languages', value)} placeholder={t('counsellorLanguagesPlaceholder')} disabled={disabled} />
            <TextField id={`counsellor-${index}-specialisations`} label={t('counsellorSpecialisationsLabel')} value={item.specialisations} onChange={(value) => setField('specialisations', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-city`} label={t('counsellorOfficeCityLabel')} value={item.officeCity} onChange={(value) => setField('officeCity', value)} disabled={disabled} />
            <TextField id={`counsellor-${index}-email`} label={t('counsellorEmailLabel')} value={item.email} onChange={(value) => setField('email', value)} type='email' disabled={disabled} />
            <TextField id={`counsellor-${index}-booking`} label={t('counsellorBookingUrlLabel')} value={item.bookingUrl} onChange={(value) => setField('bookingUrl', value)} type='url' disabled={disabled} />
          </div>
          <TextAreaField id={`counsellor-${index}-bio`} label={t('counsellorBioLabel')} value={item.bio} onChange={(value) => setField('bio', value)} rows={4} disabled={disabled} />
        </div>
      )}
    />
  );
}
