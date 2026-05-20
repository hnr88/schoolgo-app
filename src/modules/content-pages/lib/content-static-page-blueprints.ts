import { contentStaticPageBlueprintRows } from '@/modules/content-pages/constants/content-static-page-blueprints.constants';
import type { ContentStaticPageBlueprint } from '@/modules/content-pages/types/content-static-page-blueprints.types';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

function toBlueprint(row: (typeof contentStaticPageBlueprintRows)[keyof typeof contentStaticPageBlueprintRows]): ContentStaticPageBlueprint {
  const [
    owner,
    intent,
    primaryEvidence,
    secondaryEvidence,
    tertiaryEvidence,
    actionLabel,
    actionHref,
    supportHref,
    relatedHref,
  ] = row;

  return {
    owner,
    intent,
    primaryEvidence,
    secondaryEvidence,
    tertiaryEvidence,
    actionLabel,
    actionHref,
    supportHref,
    relatedHref,
  };
}

export function applyContentStaticPageBlueprint(page: ContentPage): ContentPage {
  const row = contentStaticPageBlueprintRows[page.slug as keyof typeof contentStaticPageBlueprintRows];
  if (!row) return page;
  const blueprint = toBlueprint(row);

  return {
    ...page,
    description: `${page.subtitle} ${blueprint.intent}`,
    metrics: [
      { value: '3', label: 'replacement evidence groups' },
      { value: '4+', label: 'linked next steps' },
      { value: 'May 2026', label: 'review date' },
    ],
    facts: [
      { label: 'Owner', value: blueprint.owner },
      { label: 'Primary evidence', value: blueprint.primaryEvidence },
      { label: 'Replacement status', value: 'Placeholder data ready for production copy' },
      { label: 'Related route', value: blueprint.relatedHref },
    ],
    features: [
      { title: 'Page purpose', description: blueprint.intent, href: blueprint.supportHref, icon: 'compass' },
      { title: 'Evidence to replace', description: blueprint.primaryEvidence, href: blueprint.relatedHref, icon: 'layers' },
      { title: 'Connected routing', description: blueprint.tertiaryEvidence, href: blueprint.actionHref, icon: 'network' },
    ],
    steps: [
      { title: 'Confirm the owner', description: `${blueprint.owner} owns the final facts, disclaimers, and update cadence for this page.`, href: blueprint.supportHref },
      { title: 'Replace the evidence', description: blueprint.secondaryEvidence, href: blueprint.relatedHref },
      { title: blueprint.actionLabel, description: 'Send the visitor to the next page, support path, or school-search workflow.', href: blueprint.actionHref },
    ],
    checklist: [
      { label: 'Replace primary evidence', detail: blueprint.primaryEvidence, href: blueprint.supportHref },
      { label: 'Confirm secondary proof', detail: blueprint.secondaryEvidence, href: blueprint.relatedHref },
      { label: 'Check outbound links', detail: blueprint.tertiaryEvidence, href: blueprint.actionHref },
    ],
    faqs: [
      { question: `What should replace this ${page.title.toLowerCase()} page?`, answer: `${blueprint.primaryEvidence} Then add final legal, support, or admissions copy from ${blueprint.owner}.` },
      { question: 'Who should approve the production version?', answer: `${blueprint.owner} should approve the final content, update cadence, linked routes, and escalation language.` },
      { question: 'Which next step should this page drive?', answer: `The primary path is "${blueprint.actionLabel}", supported by ${blueprint.supportHref} and ${blueprint.relatedHref}.` },
    ],
    resources: [
      { title: blueprint.actionLabel, description: 'Primary conversion or support route for this static page.', href: blueprint.actionHref, meta: 'Primary path' },
      { title: 'Supporting context', description: blueprint.secondaryEvidence, href: blueprint.supportHref, meta: 'Support page' },
      { title: 'Related page', description: blueprint.tertiaryEvidence, href: blueprint.relatedHref, meta: 'Related link' },
    ],
    links: [
      { label: blueprint.actionLabel, href: blueprint.actionHref },
      { label: 'Supporting context', href: blueprint.supportHref },
      { label: 'Related page', href: blueprint.relatedHref },
    ],
    decisionPoints: [
      { title: 'Ownership decision', summary: `Confirm whether ${blueprint.owner} is the right owner for publishing and later edits.`, owner: blueprint.owner, evidence: blueprint.primaryEvidence, href: blueprint.supportHref },
      { title: 'Evidence decision', summary: 'Replace every starter proof point with source-backed production content.', owner: blueprint.owner, evidence: blueprint.secondaryEvidence, href: blueprint.relatedHref },
      { title: 'Routing decision', summary: 'Confirm the page sends visitors to the right next step instead of ending the journey.', owner: 'SchoolGo content operations', evidence: blueprint.tertiaryEvidence, href: blueprint.actionHref },
    ],
    aiSummary: {
      answer: `${page.title} is a replaceable static page for SchoolGo. It should cover ${blueprint.intent.toLowerCase()} The production version needs ${blueprint.primaryEvidence.toLowerCase()}`,
      intent: `${page.title} public information and support routing`,
      entities: [page.title, blueprint.owner, 'SchoolGo', page.eyebrow, 'Australian schools'],
      followUps: [
        { label: blueprint.actionLabel, href: blueprint.actionHref },
        { label: 'Supporting context', href: blueprint.supportHref },
        { label: 'Related page', href: blueprint.relatedHref },
      ],
    },
    proofPoints: [
      { label: 'Owner named', detail: blueprint.owner, confidence: 'High', href: blueprint.supportHref },
      { label: 'Evidence scoped', detail: blueprint.primaryEvidence, confidence: 'High', href: blueprint.relatedHref },
      { label: 'Next step linked', detail: blueprint.tertiaryEvidence, confidence: 'High', href: blueprint.actionHref },
    ],
    actionPaths: [
      { label: 'Review', description: blueprint.primaryEvidence, href: blueprint.supportHref, priority: 'Support' },
      { label: 'Replace', description: blueprint.secondaryEvidence, href: blueprint.relatedHref, priority: 'Secondary' },
      { label: 'Act', description: blueprint.tertiaryEvidence, href: blueprint.actionHref, priority: 'Primary' },
    ],
    schemaKeywords: [...page.schemaKeywords, blueprint.owner, 'privacy', 'accessibility', 'school admissions', 'education technology'],
    quote: {
      quote: 'Static public pages should answer the policy question and keep the visitor moving.',
      name: blueprint.owner,
      role: 'Placeholder page owner',
    },
    cta: {
      title: blueprint.actionLabel,
      description: blueprint.tertiaryEvidence,
      primary: { label: blueprint.actionLabel, href: blueprint.actionHref },
      secondary: { label: 'Supporting context', href: blueprint.supportHref },
    },
  };
}
