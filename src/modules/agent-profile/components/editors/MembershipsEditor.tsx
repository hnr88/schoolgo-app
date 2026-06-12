'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';
import type { ProfessionalMembershipItem } from '@/modules/agent-profile/types/editor-items.types';

function makeItem(): ProfessionalMembershipItem {
  return {
    organisation: '',
    membershipLevel: '',
    memberSince: '',
    memberId: '',
    verificationUrl: '',
    logo: null,
    order: 0,
  };
}

/** Repeatable editor for `shared.professional-membership` (association badges). */
export function MembershipsEditor({ items, onChange, disabled }: RepeatableEditorProps<ProfessionalMembershipItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<ProfessionalMembershipItem>
      items={items}
      onChange={onChange}
      makeItem={makeItem}
      disabled={disabled}
      labels={{
        addLabel: t('membershipAdd'),
        rowLabel: (n) => t('membershipRow', { number: n }),
        removeLabel: t('membershipRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('membershipEmpty'),
      }}
      renderItem={({ item, setField }) => (
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <EditorField label={t('membershipOrganisation')}>
              <Input
                value={item.organisation}
                disabled={disabled}
                placeholder={t('membershipOrganisationPlaceholder')}
                onChange={(e) => setField('organisation', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('membershipLevel')}>
              <Input
                value={item.membershipLevel}
                disabled={disabled}
                onChange={(e) => setField('membershipLevel', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('membershipSince')}>
              <Input
                type='number'
                inputMode='numeric'
                value={item.memberSince}
                disabled={disabled}
                placeholder={t('membershipSincePlaceholder')}
                onChange={(e) => setField('memberSince', e.target.value)}
              />
            </EditorField>
            <EditorField label={t('membershipMemberId')}>
              <Input
                value={item.memberId}
                disabled={disabled}
                onChange={(e) => setField('memberId', e.target.value)}
              />
            </EditorField>
          </div>
          <EditorField label={t('membershipVerificationUrl')}>
            <Input
              type='url'
              value={item.verificationUrl}
              disabled={disabled}
              placeholder={t('membershipVerificationUrlPlaceholder')}
              onChange={(e) => setField('verificationUrl', e.target.value)}
            />
          </EditorField>
          <RepeatableMediaField
            label={t('membershipLogo')}
            value={item.logo}
            disabled={disabled}
            onChange={(logo) => setField('logo', logo)}
          />
        </div>
      )}
    />
  );
}
