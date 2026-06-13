import { TIER_RANK } from '@/modules/agent-training/constants/agent-training.constants';
import type {
  Certification,
  TrainingTier,
} from '@/modules/agent-training/types/agent-training.types';

const LEVEL_TO_TIER: Record<string, TrainingTier> = {
  foundation: 'foundation',
  intermediate: 'intermediate',
  advanced: 'advanced',
};

/**
 * A certification counts toward the tier only while currently valid. The server
 * computes `active` (passed + non-expired) at read time; fall back to the status
 * string when that flag is absent.
 */
export function isCertificationActive(cert: Certification): boolean {
  if (typeof cert.active === 'boolean') return cert.active;
  return cert.status === 'passed';
}

/**
 * The agent's overall tier is the highest course level among their currently
 * active certifications. Returns 'none' when nothing qualifies.
 */
export function computeTier(certifications: Certification[]): TrainingTier {
  let best: TrainingTier = 'none';
  for (const cert of certifications) {
    if (!isCertificationActive(cert)) continue;
    const level = cert.course?.level ?? undefined;
    const tier = level ? LEVEL_TO_TIER[level] : undefined;
    if (tier && TIER_RANK[tier] > TIER_RANK[best]) {
      best = tier;
    }
  }
  return best;
}

export function countActiveCertifications(certifications: Certification[]): number {
  return certifications.filter(isCertificationActive).length;
}
