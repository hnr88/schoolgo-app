import type { z } from 'zod';
import type { SchoolHit } from '@/modules/school-search';
import type { ParentStudent } from '@/modules/students';
import type {
  demandSignalSchema,
  likelihoodBandSchema,
  likelihoodFactorSchema,
  schoolLikelihoodSchema,
} from '@/modules/parent-admission-likelihood/schemas/admission-likelihood.schema';

export type LikelihoodBand = z.infer<typeof likelihoodBandSchema>;

export type LikelihoodFactor = z.infer<typeof likelihoodFactorSchema>;

export type SchoolLikelihood = z.infer<typeof schoolLikelihoodSchema>;

export type DemandSignal = z.infer<typeof demandSignalSchema>;

export type CompetitionLevel = DemandSignal['competition'];

export type AdmissionLikelihoodRow =
  | { school: SchoolHit; status: 'success'; likelihood: Extract<SchoolLikelihood, { found: true }> }
  | { school: SchoolHit; status: 'missing'; likelihood: null };

export interface AdmissionLikelihoodControlsProps {
  students: ParentStudent[];
  studentId: string | null;
  onStudentChange: (documentId: string) => void;
  onCompute: () => void;
  isComputing: boolean;
  canCompute: boolean;
  schoolCount: number;
}

export interface AdmissionLikelihoodGridProps {
  rows: AdmissionLikelihoodRow[];
}

export interface AdmissionLikelihoodRowCardProps {
  row: AdmissionLikelihoodRow;
  demand: DemandSignal | undefined;
  isDemandLoading: boolean;
}

export interface BandBadgeProps {
  band: LikelihoodBand;
  score: number;
}

export interface FactorListProps {
  factors: LikelihoodFactor[];
}

export interface DemandSignalRowProps {
  demand: DemandSignal | undefined;
  isLoading: boolean;
}
