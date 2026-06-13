import { REVIEW_DIMENSIONS } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import type { WriteReviewValues } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';
import type {
  ReviewableSchool,
  WriteReviewPayload,
} from '@/modules/parent-school-reviews/types/parent-school-reviews.types';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function toReviewableSchools(applications: ParentApplication[]): ReviewableSchool[] {
  const byId = new Map<string, ReviewableSchool>();
  for (const application of applications) {
    const school = application.school;
    if (school?.documentId && !byId.has(school.documentId)) {
      byId.set(school.documentId, { documentId: school.documentId, name: school.name });
    }
  }
  return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function toWriteReviewPayload(values: WriteReviewValues): WriteReviewPayload {
  const dimensionScores = REVIEW_DIMENSIONS.reduce(
    (acc, dimension) => {
      acc[dimension] = values[dimension];
      return acc;
    },
    {} as WriteReviewPayload['dimensionScores'],
  );

  const trimmedBody = values.body?.trim();

  return {
    overallStar: values.overallStar,
    dimensionScores,
    body: trimmedBody && trimmedBody.length > 0 ? trimmedBody : undefined,
    wouldRecommend: values.wouldRecommend,
    consideredSwitching: values.consideredSwitching,
  };
}

export function getWriteReviewDefaults(): WriteReviewValues {
  return {
    schoolDocumentId: '',
    overallStar: 0,
    academics: 3,
    pastoral: 3,
    value: 3,
    facilities: 3,
    comms: 3,
    eal: 3,
    body: '',
    wouldRecommend: false,
    consideredSwitching: false,
  };
}
