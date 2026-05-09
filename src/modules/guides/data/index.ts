import type { GuideSlug } from '@/modules/guides/constants/guides.constants';
import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { accommodationGuide } from '@/modules/guides/data/accommodation';
import { chooseASchoolGuide } from '@/modules/guides/data/choose-a-school';
import { englishRequirementsGuide } from '@/modules/guides/data/english-requirements';
import { healthCoverGuide } from '@/modules/guides/data/health-cover';
import { highSchoolPreparationGuide } from '@/modules/guides/data/high-school-preparation';
import { schoolFeesGuide } from '@/modules/guides/data/school-fees';
import { schoolTypesGuide } from '@/modules/guides/data/school-types';
import { studentVisaGuide } from '@/modules/guides/data/student-visa';
import { studentWelfareGuide } from '@/modules/guides/data/student-welfare';
import { termDatesIntakesGuide } from '@/modules/guides/data/term-dates-intakes';

export const guideRegistry: Record<GuideSlug, GuidePageData> = {
  'accommodation': accommodationGuide,
  'choose-a-school': chooseASchoolGuide,
  'english-requirements': englishRequirementsGuide,
  'health-cover': healthCoverGuide,
  'high-school-preparation': highSchoolPreparationGuide,
  'school-fees': schoolFeesGuide,
  'school-types': schoolTypesGuide,
  'student-visa': studentVisaGuide,
  'student-welfare': studentWelfareGuide,
  'term-dates-intakes': termDatesIntakesGuide,
};
