import {
  Building2,
  Images,
  FileText,
  Sparkles,
  Wallet,
  GraduationCap,
  Globe2,
  Award,
  Activity,
  MapPin,
  ShieldCheck,
  CalendarCheck,
  Coins,
  HelpCircle,
  ListChecks,
  BedDouble,
} from 'lucide-react';
import type { ProfileSectionMeta } from '@/modules/school-profile/types/profile-sections.types';

export const PROFILE_SECTIONS: readonly ProfileSectionMeta[] = [
  { id: 'identity', icon: Building2, titleKey: 'sectionIdentity', descriptionKey: 'sectionIdentityDesc' },
  { id: 'media', icon: Images, titleKey: 'sectionMedia', descriptionKey: 'sectionMediaDesc' },
  { id: 'description', icon: FileText, titleKey: 'sectionDescription', descriptionKey: 'sectionDescriptionDesc' },
  { id: 'keyFacts', icon: Sparkles, titleKey: 'sectionKeyFacts', descriptionKey: 'sectionKeyFactsDesc' },
  { id: 'fees', icon: Wallet, titleKey: 'sectionFees', descriptionKey: 'sectionFeesDesc' },
  { id: 'boardingFeatures', icon: BedDouble, titleKey: 'sectionBoardingFeatures', descriptionKey: 'sectionBoardingFeaturesDesc' },
  { id: 'scholarships', icon: Award, titleKey: 'sectionScholarships', descriptionKey: 'sectionScholarshipsDesc' },
  { id: 'academic', icon: GraduationCap, titleKey: 'sectionAcademic', descriptionKey: 'sectionAcademicDesc' },
  { id: 'cocurricular', icon: Activity, titleKey: 'sectionCoCurricular', descriptionKey: 'sectionCoCurricularDesc' },
  { id: 'international', icon: Globe2, titleKey: 'sectionInternational', descriptionKey: 'sectionInternationalDesc' },
  { id: 'location', icon: MapPin, titleKey: 'sectionLocation', descriptionKey: 'sectionLocationDesc' },
  { id: 'policies', icon: ShieldCheck, titleKey: 'sectionPolicies', descriptionKey: 'sectionPoliciesDesc' },
  { id: 'admissions', icon: CalendarCheck, titleKey: 'sectionAdmissions', descriptionKey: 'sectionAdmissionsDesc' },
  { id: 'admissionsSteps', icon: ListChecks, titleKey: 'sectionAdmissionsSteps', descriptionKey: 'sectionAdmissionsStepsDesc' },
  { id: 'faqs', icon: HelpCircle, titleKey: 'sectionFaqs', descriptionKey: 'sectionFaqsDesc' },
  { id: 'tuition', icon: Coins, titleKey: 'sectionTuition', descriptionKey: 'sectionTuitionDesc' },
] as const;

export const PROFILE_SECTION_IDS: readonly string[] = PROFILE_SECTIONS.map((section) => section.id);
