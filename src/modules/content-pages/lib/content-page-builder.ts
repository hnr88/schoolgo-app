import { contentPageTypeEyebrows } from '@/modules/content-pages/constants/content-page-generation.constants';
import { applyContentStaticPageBlueprint } from '@/modules/content-pages/lib/content-static-page-blueprints';
import type {
  ContentCategory,
  ContentPage,
  ContentPageSeed,
} from '@/modules/content-pages/types/content-pages.types';

export function getResourcePagePath(slug: string) {
  return `/resources/${slug}`;
}

export function createContentPage(
  seed: ContentPageSeed,
  index: number,
  categoryBySlug: Record<string, ContentCategory>,
): ContentPage {
  const category = categoryBySlug[seed.category];
  const relatedCategoryHref = `/resources/category/${seed.category}`;
  const typeLabel = contentPageTypeEyebrows[seed.type].toLowerCase();
  const audienceLabel = seed.audience === 'all' ? 'All audiences' : seed.audience;
  const categoryLabel = category?.label ?? 'Resources';
  const pageTypeLabel = contentPageTypeEyebrows[seed.type];
  const page: ContentPage = {
    ...seed,
    description: `${seed.subtitle} This ${typeLabel} page shows how a richer SchoolGo content page can be assembled from reusable blocks.`,
    eyebrow: category?.label ?? pageTypeLabel,
    imageAlt: `${seed.title} example page image`,
    metrics: [
      { value: `${index + 3}`, label: 'linked next steps' },
      { value: seed.type === 'directory' ? '24' : '6', label: seed.type === 'events' ? 'sample dates' : 'example sections' },
      { value: seed.audience === 'agents' ? '3 markets' : '5 mins', label: seed.audience === 'schools' ? 'profile review' : 'reading time' },
    ],
    facts: [
      { label: 'Audience', value: seed.audience === 'all' ? 'Families, agents, and schools' : seed.audience },
      { label: 'Page type', value: pageTypeLabel },
      { label: 'Content depth', value: 'Detailed page' },
      { label: 'Related hub', value: category?.label ?? 'Resources' },
    ],
    features: [
      { title: 'Fast orientation', description: `Use this ${typeLabel} page to understand the major decisions before moving deeper.`, href: '#overview', icon: 'compass' },
      { title: 'Connected resources', description: 'Every major block links to related pages, anchors, or the school search experience.', href: relatedCategoryHref, icon: 'network' },
      { title: 'Reusable page section', description: 'The same block can be reordered for admissions, curriculum, events, policy, and directory pages.', href: '/resources', icon: 'layers' },
    ],
    steps: [
      { title: 'Start with the family goal', description: `Clarify the school outcome, timing, location, and support needs before using this ${typeLabel} page.`, href: '/resources/international-family-start-here' },
      { title: 'Compare the practical constraints', description: 'Check fees, documents, entry rules, availability, and support services early.', href: '/resources/compare-schools-guide' },
      { title: 'Move into action', description: 'Use the linked next step to search schools, prepare documents, or contact SchoolGo.', href: '/search' },
    ],
    timeline: [
      { date: 'Week 1', title: 'Create the shortlist', description: 'Capture the must-have criteria and compare a small set of schools or pathways.', href: '/search' },
      { date: 'Week 2', title: 'Prepare the evidence', description: 'Collect reports, test evidence, fee assumptions, visas, and family context.', href: '/resources/application-documents-checklist' },
      { date: 'Week 3', title: 'Confirm the next step', description: 'Book a visit, send an enquiry, start the application, or review related guidance.', href: relatedCategoryHref },
    ],
    checklist: [
      { label: 'Confirm timing', detail: 'Match school deadlines with family relocation, visa, fee, and orientation dates.', href: '/resources/enrolment-decision-timeline' },
      { label: 'Check the cost picture', detail: 'Review tuition, extras, deposits, uniforms, devices, transport, and boarding if relevant.', href: '/resources/school-fees-planning' },
      { label: 'Save related resources', detail: 'Keep the most relevant pages close so the next conversation has clear evidence.', href: relatedCategoryHref },
    ],
    comparison: [
      { label: 'Primary question', primary: 'Fit', secondary: 'Timing', tertiary: 'Support' },
      { label: 'What to compare', primary: 'Curriculum and culture', secondary: 'Deadlines and places', tertiary: 'English, wellbeing, boarding' },
      { label: 'Best next action', primary: 'Shortlist schools', secondary: 'Check dates', tertiary: 'Ask targeted questions' },
    ],
    faqs: [
      { question: `How should families use ${seed.title.toLowerCase()}?`, answer: 'Treat this as a planning page first, then follow the links to the relevant checklist, category hub, or school search page.' },
      { question: 'Is this ready for final publishing?', answer: 'It is structured starter content designed to prove multiple page layouts and reusable content blocks before final school-specific copy is added.' },
      { question: 'Where should the next page link go?', answer: 'Every example links either to a related resource, an in-page section, the school search experience, or a portal landing page.' },
    ],
    resources: [
      { title: category?.label ?? 'Resource hub', description: category?.description ?? 'Browse related SchoolGo content examples.', href: relatedCategoryHref, meta: 'Category hub' },
      { title: 'School search', description: 'Move from planning content into practical school discovery and comparison.', href: '/search', meta: 'Interactive tool' },
      { title: 'All resource examples', description: 'Browse every page type and reusable layout example.', href: '/resources', meta: 'Index' },
    ],
    links: [
      { label: 'Browse this category', href: relatedCategoryHref },
      { label: 'Find schools', href: '/search' },
      { label: 'See all examples', href: '/resources' },
    ],
    searchSignals: [
      { label: 'Intent', value: pageTypeLabel, tone: 'brand' },
      { label: 'Audience', value: audienceLabel, tone: 'trust' },
      { label: 'Journey', value: categoryLabel, tone: 'featured' },
      { label: 'Reviewed', value: 'May 2026', tone: 'muted' },
    ],
    decisionPoints: [
      { title: 'Fit decision', summary: `Confirm whether ${categoryLabel.toLowerCase()} is the right journey for the family, agent, or school team.`, owner: seed.audience === 'schools' ? 'School growth lead' : 'Family success lead', evidence: 'Shortlist notes, priority constraints, and linked comparison pages.', href: '/resources/compare-schools-guide' },
      { title: 'Readiness decision', summary: 'Check whether the user has the documents, dates, budget, and support signals needed to move forward.', owner: seed.audience === 'agents' ? 'Agent operations lead' : 'Admissions operations lead', evidence: 'Reports, passports, fee assumptions, English evidence, and timing notes.', href: '/resources/application-documents-checklist' },
      { title: 'Next action decision', summary: 'Route the visitor into search, contact, a related policy page, or the next application step.', owner: 'SchoolGo content operations', evidence: 'CTA clicks, related pages, resource rows, and category-level navigation.', href: relatedCategoryHref },
    ],
    aiSummary: {
      answer: `${seed.title} helps ${audienceLabel.toLowerCase()} understand the practical next step for ${categoryLabel.toLowerCase()}, including timing, evidence, ownership, and linked follow-up actions.`,
      intent: `${pageTypeLabel} research and decision support`,
      entities: [seed.title, categoryLabel, pageTypeLabel, audienceLabel, 'SchoolGo'],
      followUps: [
        { label: 'Compare school options', href: '/resources/compare-schools-guide' },
        { label: 'Prepare documents', href: '/resources/application-documents-checklist' },
        { label: 'Find schools', href: '/search' },
      ],
    },
    proofPoints: [
      { label: 'Visible next step', detail: 'Primary and secondary CTAs are rendered near the top and repeated in the final action banner.', confidence: 'High', href: getResourcePagePath(seed.slug) },
      { label: 'Evidence path', detail: 'Checklist, timeline, and resource rows expose the exact documents or decisions needed before action.', confidence: seed.type === 'faq' ? 'Medium' : 'High', href: '/resources/application-documents-checklist' },
      { label: 'Internal linking', detail: 'Related pages, category hubs, resources, and action links make the page easy to crawl and navigate.', confidence: 'High', href: relatedCategoryHref },
    ],
    stakeholders: [
      { name: 'Family decision maker', goal: 'Understand school fit, timing, budget, and support before making contact.', owner: 'Family success', metric: 'Shortlist clarity', href: '/parent' },
      { name: 'Agent or counsellor', goal: 'Translate the page into evidence, tasks, and next-step guidance for the family.', owner: 'Agent operations', metric: 'Application readiness', href: '/agent' },
      { name: 'School admissions team', goal: 'Use the same structure to explain requirements, service levels, and response expectations.', owner: 'School growth', metric: 'Response quality', href: '/school' },
    ],
    actionPaths: [
      { label: 'Research', description: `Read the ${categoryLabel.toLowerCase()} context and compare related pages before choosing a school path.`, href: relatedCategoryHref, priority: 'Support' },
      { label: 'Prepare', description: 'Collect evidence, clarify timing, and identify the owner for each decision point.', href: '/resources/application-documents-checklist', priority: 'Secondary' },
      { label: 'Act', description: 'Move from content into school search, enquiry, contact, or application readiness.', href: '/search', priority: 'Primary' },
    ],
    schemaKeywords: [seed.title, categoryLabel, pageTypeLabel, audienceLabel, 'SchoolGo', 'Australian schools', 'international students', 'school admissions'],
    lastReviewed: '2026-05-20',
    quote: { quote: `A useful ${typeLabel} page should answer the immediate question and make the next click obvious.`, name: 'SchoolGo content team', role: 'Content system' },
    cta: { title: `Keep exploring ${category?.label.toLowerCase() ?? 'SchoolGo resources'}`, description: 'Use the linked examples to test richer page structures, page-to-page journeys, and deeper resource navigation.', primary: { label: 'Browse related pages', href: relatedCategoryHref }, secondary: { label: 'Find schools', href: '/search' } },
  };

  return applyContentStaticPageBlueprint(page);
}
