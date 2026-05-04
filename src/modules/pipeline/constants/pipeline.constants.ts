import type { PipelineColumn } from '@/modules/pipeline/types/pipeline.types';

export const PIPELINE_COLUMNS: PipelineColumn[] = [
  {
    id: 'new',
    label: 'columnNew',
    statuses: ['draft', 'submitted', 'received'],
    color: 'bg-babu-50',
    dotColor: 'bg-babu-500',
  },
  {
    id: 'in_review',
    label: 'columnInReview',
    statuses: ['under_review', 'assessment_required', 'interview_scheduled'],
    color: 'bg-vivid-iris-soft',
    dotColor: 'bg-vivid-iris',
  },
  {
    id: 'action_required',
    label: 'columnActionRequired',
    statuses: ['documents_requested'],
    color: 'bg-vivid-amber-soft',
    dotColor: 'bg-vivid-amber',
  },
  {
    id: 'offers',
    label: 'columnOffers',
    statuses: ['offer_made', 'offer_accepted'],
    color: 'bg-vivid-mint-soft',
    dotColor: 'bg-vivid-mint',
  },
  {
    id: 'pre_enrolment',
    label: 'columnPreEnrolment',
    statuses: ['pre_enrolment', 'coe_issued'],
    color: 'bg-babu-50',
    dotColor: 'bg-babu-600',
  },
  {
    id: 'enrolled',
    label: 'columnEnrolled',
    statuses: ['enrolled'],
    color: 'bg-vivid-mint-soft',
    dotColor: 'bg-vivid-mint',
  },
  {
    id: 'closed',
    label: 'columnClosed',
    statuses: ['withdrawn', 'declined', 'waitlisted'],
    color: 'bg-surface-dim',
    dotColor: 'bg-foggy',
  },
];

export const MAX_CARDS_PER_COLUMN = 10;
