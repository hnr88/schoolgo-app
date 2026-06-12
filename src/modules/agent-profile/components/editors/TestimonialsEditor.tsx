'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import {
  NumberField,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@/modules/agent-profile/components/editors/EditorFields';
import { TESTIMONIAL_REVIEWER_TYPES } from '@/modules/agent-profile/constants/repeatable-editors.constants';
import type { TestimonialItem } from '@/modules/agent-profile/types/repeatable-item.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeTestimonial(): TestimonialItem {
  return {
    reviewerName: '',
    reviewerType: '',
    reviewerCountry: '',
    ratingStars: null,
    quote: '',
    schoolPlacedAt: '',
    year: null,
    photo: null,
    verifiedPlacement: false,
    sourcePlatform: '',
    order: 0,
  };
}

/**
 * Repeatable editor for `shared.testimonial` items — attributed social proof.
 * Fields: reviewer/type/country/stars/quote/school/year/photo/verifiedPlacement
 * + sourcePlatform (per the contract). Photo uploaded via RepeatableMediaField;
 * verifiedPlacement separates platform-confirmed reviews from free-text ones.
 */
export function TestimonialsEditor({ items, onChange, disabled }: RepeatableEditorProps<TestimonialItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<TestimonialItem>
      items={items}
      onChange={onChange}
      makeItem={makeTestimonial}
      disabled={disabled}
      labels={{
        addLabel: t('testimonialAdd'),
        rowLabel: (index) => t('testimonialRow', { index }),
        removeLabel: t('mediaRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('testimonialEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <div className='flex flex-col gap-3'>
          <RepeatableMediaField
            label={t('testimonialPhotoLabel')}
            value={item.photo}
            onChange={(media) => setField('photo', media)}
            disabled={disabled}
          />
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <TextField id={`testimonial-${index}-name`} label={t('testimonialReviewerNameLabel')} value={item.reviewerName} onChange={(value) => setField('reviewerName', value)} disabled={disabled} />
            <SelectField
              id={`testimonial-${index}-type`}
              label={t('testimonialReviewerTypeLabel')}
              value={item.reviewerType}
              onChange={(value) => setField('reviewerType', value as TestimonialItem['reviewerType'])}
              placeholder={t('testimonialReviewerTypePlaceholder')}
              options={TESTIMONIAL_REVIEWER_TYPES}
              optionLabel={(option) => t(`testimonialReviewerType_${option}`)}
              disabled={disabled}
            />
            <TextField id={`testimonial-${index}-country`} label={t('testimonialCountryLabel')} value={item.reviewerCountry} onChange={(value) => setField('reviewerCountry', value)} disabled={disabled} />
            <NumberField id={`testimonial-${index}-stars`} label={t('testimonialStarsLabel')} value={item.ratingStars} onChange={(value) => setField('ratingStars', value)} min={1} max={5} disabled={disabled} />
            <TextField id={`testimonial-${index}-school`} label={t('testimonialSchoolLabel')} value={item.schoolPlacedAt} onChange={(value) => setField('schoolPlacedAt', value)} disabled={disabled} />
            <NumberField id={`testimonial-${index}-year`} label={t('testimonialYearLabel')} value={item.year} onChange={(value) => setField('year', value)} disabled={disabled} />
            <TextField id={`testimonial-${index}-source`} label={t('testimonialSourcePlatformLabel')} value={item.sourcePlatform} onChange={(value) => setField('sourcePlatform', value)} disabled={disabled} />
          </div>
          <TextAreaField id={`testimonial-${index}-quote`} label={t('testimonialQuoteLabel')} value={item.quote} onChange={(value) => setField('quote', value)} rows={4} disabled={disabled} />
          <SwitchField
            id={`testimonial-${index}-verified`}
            label={t('testimonialVerifiedPlacementLabel')}
            checked={item.verifiedPlacement}
            onChange={(checked) => setField('verifiedPlacement', checked)}
            disabled={disabled}
          />
        </div>
      )}
    />
  );
}
