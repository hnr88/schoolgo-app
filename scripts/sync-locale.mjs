// Sync a non-English locale file's key SHAPE to match en.json.
// - Keep existing translated values where the key path is unchanged.
// - Use English fallback for NEW keys and for keys whose English text CHANGED in this update.
// Usage: node scripts/sync-locale.mjs <locale>

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const locale = process.argv[2];
if (!locale || locale === 'en') {
  console.error('Usage: node scripts/sync-locale.mjs <locale> (not en)');
  process.exit(1);
}

const enPath = resolve('src/i18n/messages/en.json');
const targetPath = resolve(`src/i18n/messages/${locale}.json`);

const en = JSON.parse(readFileSync(enPath, 'utf8'));
const target = JSON.parse(readFileSync(targetPath, 'utf8'));

// Paths whose English value CHANGED in this update — must use en.json value (flag for translation).
const FORCE_EN_PATHS = new Set([
  // ParentsHero
  'ParentsHero.trustPill.brand',
  'ParentsHero.featured.cards.a.name',
  'ParentsHero.featured.cards.a.location',
  'ParentsHero.featured.cards.a.curriculum',
  'ParentsHero.featured.cards.a.fee',
  'ParentsHero.featured.cards.a.boarding',
  'ParentsHero.featured.cards.a.rating',
  'ParentsHero.featured.cards.b.name',
  'ParentsHero.featured.cards.b.location',
  'ParentsHero.featured.cards.b.curriculum',
  'ParentsHero.featured.cards.b.fee',
  'ParentsHero.featured.cards.b.boarding',
  'ParentsHero.featured.cards.b.rating',
  // ParentsVerified
  'ParentsVerified.eyebrow',
  'ParentsVerified.heading',
  'ParentsVerified.subheading',
  // ParentsComparison
  'ParentsComparison.heading',
  // ParentsPickATest
  'ParentsPickATest.heading',
  'ParentsPickATest.headingAccent',
  'ParentsPickATest.cta',
  // ParentsSevenLanguages
  'ParentsSevenLanguages.subheading',
  // ParentsTrustBar
  'ParentsTrustBar.heading',
  // ParentsFinalCta
  'ParentsFinalCta.ctaPrimary',
  // AgentsHero
  'AgentsHero.headlinePrefix',
  'AgentsHero.lede',
  'AgentsHero.stats.sectors.label',
  // AgentsPainPoints (entire content replaced)
  'AgentsPainPoints.eyebrow',
  'AgentsPainPoints.heading',
  'AgentsPainPoints.subheading',
  'AgentsPainPoints.items.email.question',
  'AgentsPainPoints.items.email.answer',
  'AgentsPainPoints.items.status.question',
  'AgentsPainPoints.items.status.answer',
  'AgentsPainPoints.items.trust.question',
  'AgentsPainPoints.items.trust.answer',
  'AgentsPainPoints.items.requirements.question',
  'AgentsPainPoints.items.requirements.answer',
  // AgentsMatching steps descriptions changed
  'AgentsMatching.steps.listen.description',
  'AgentsMatching.steps.match.description',
  'AgentsMatching.steps.deliver.description',
  // AgentsCommission
  'AgentsCommission.statLabel',
  // AgentsScale
  'AgentsScale.heading',
  // AgentsTestimonial — quote and b.meta changed
  'AgentsTestimonial.items.a.quote',
  'AgentsTestimonial.items.b.quote',
  'AgentsTestimonial.items.b.meta',
  'AgentsTestimonial.items.c.quote',
  // AgentsFinalCta
  'AgentsFinalCta.headingPrefix',
  'AgentsFinalCta.headingEmphasis',
  'AgentsFinalCta.headingSuffix',
  // AgentsFaq
  'AgentsFaq.items.find.answer',
  'AgentsFaq.items.verifyScores.answer',
  'AgentsFaq.items.fees.answer',
  'AgentsFaq.items.manage.answer',
  // ParentsFaq
  'ParentsFaq.items.englishTest.answer',
  'ParentsFaq.items.visa.answer',
  'ParentsFaq.items.agent.answer',
  'ParentsFaq.items.schoolTypes.answer',
  // SchoolsHero
  'SchoolsHero.headlineSuffix',
  'SchoolsHero.inbox.eyebrow',
  // SchoolsStats
  'SchoolsStats.items.sectors.label',
  // SchoolsTimeline
  'SchoolsTimeline.heading',
  // SchoolsTestimonial
  'SchoolsTestimonial.quote',
  'SchoolsTestimonial.attribution',
  // SchoolsFaq
  'SchoolsFaq.items.attract.answer',
  'SchoolsFaq.items.verify.answer',
  'SchoolsFaq.items.documents.answer',
  'SchoolsFaq.items.cost.answer',
  'SchoolsFaq.items.diversify.answer',
]);

function isObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

// Walk en.json's structure. For each leaf or array, decide what value to write.
function buildSynced(enNode, targetNode, pathParts) {
  if (Array.isArray(enNode)) {
    // Locales rarely have arrays; if present, prefer target if same length else en.
    if (Array.isArray(targetNode) && targetNode.length === enNode.length) return targetNode;
    return enNode;
  }
  if (isObject(enNode)) {
    const out = {};
    for (const k of Object.keys(enNode)) {
      out[k] = buildSynced(
        enNode[k],
        isObject(targetNode) ? targetNode[k] : undefined,
        [...pathParts, k],
      );
    }
    return out;
  }
  // Leaf (string | number | boolean | null)
  const dotted = pathParts.join('.');
  if (FORCE_EN_PATHS.has(dotted)) return enNode;
  if (targetNode === undefined) return enNode; // new key
  // Preserve existing translation
  return targetNode;
}

const synced = buildSynced(en, target, []);
writeFileSync(targetPath, JSON.stringify(synced, null, 2) + '\n', 'utf8');
console.log(`Synced ${locale}.json — keys mirrored to en.json shape.`);
