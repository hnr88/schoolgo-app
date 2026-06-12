import { z } from 'zod';

// Defensive runtime guard for the public agent projection
// (`GET /api/agents/public/:slug` → `{ data: <projection> }`). The authoritative
// typed shape lives in types/agent-detail.types.ts; this schema validates the
// top-level scalars and tolerates the visibility-gated `sections` block being
// partial (each section key present only when its toggle is on).

const sectionsSchema = z
  .object({
    legalIdentity: z.unknown().optional(),
    successMetrics: z.unknown().optional(),
    feeTransparency: z.unknown().optional(),
    ethicsCommitments: z.unknown().optional(),
    responsiveness: z.unknown().optional(),
    credentials: z.array(z.unknown()).optional(),
    officeLocations: z.array(z.unknown()).optional(),
    contactChannels: z.array(z.unknown()).optional(),
    spokenLanguages: z.array(z.unknown()).optional(),
    counsellors: z.array(z.unknown()).optional(),
    services: z.array(z.unknown()).optional(),
    welfareCapabilities: z.array(z.unknown()).optional(),
    testimonials: z.array(z.unknown()).optional(),
    successStories: z.array(z.unknown()).optional(),
    experienceEntries: z.array(z.unknown()).optional(),
    professionalMemberships: z.array(z.unknown()).optional(),
    awards: z.array(z.unknown()).optional(),
    marketsServed: z.array(z.unknown()).optional(),
    destinations: z.array(z.unknown()).optional(),
    processSteps: z.array(z.unknown()).optional(),
    mediaItems: z.array(z.unknown()).optional(),
    pressItems: z.array(z.unknown()).optional(),
    faqs: z.array(z.unknown()).optional(),
    customSections: z.array(z.unknown()).optional(),
    partnerSchools: z.array(z.unknown()).optional(),
  })
  .passthrough();

export const agentDetailSchema = z.object({
  documentId: z.string(),
  slug: z.string().nullable(),
  displayName: z.string().nullable(),
  companyName: z.string().nullable(),
  tradingName: z.string().nullable(),
  roleTitle: z.string().nullable(),
  headline: z.string().nullable(),
  tagline: z.string().nullable(),
  publicSummary: z.string().nullable(),
  bio: z.string().nullable(),
  website: z.string().nullable(),
  countryOfOperation: z.string().nullable(),
  photoUrl: z.string().nullable(),
  coverPhotoUrl: z.string().nullable(),
  contactName: z.string(),
  availabilityStatus: z.string().nullable(),
  handlesUnder18: z.boolean(),
  verified: z.boolean(),
  completenessScore: z.number(),
  trustTier: z.string(),
  qeacValidationStatus: z.string(),
  maraValidationStatus: z.string(),
  qeacNumber: z.string().nullable(),
  maraNumber: z.string().nullable(),
  platformAuthorisedBadge: z.boolean(),
  esosPrismsRecorded: z.boolean(),
  sections: sectionsSchema,
});

export const agentDetailResponseSchema = z.object({
  data: agentDetailSchema.nullable(),
});
