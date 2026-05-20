import type {
  ContentCategory,
  ContentPage,
  ContentPageSeed,
  ContentPageType,
} from '@/modules/content-pages/types/content-pages.types';

export const CONTENT_PAGE_SIZE = 12;

export const contentCategories: ContentCategory[] = [
  {
    slug: 'admissions',
    label: 'Admissions',
    description: 'Application steps, documents, interviews, decisions, and enrolment timing.',
  },
  {
    slug: 'fees',
    label: 'Fees and funding',
    description: 'Tuition, first-year costs, scholarships, refunds, and payment planning.',
  },
  {
    slug: 'international',
    label: 'International families',
    description: 'Visa, English, relocation, health cover, and arrival support.',
  },
  {
    slug: 'curriculum',
    label: 'Curriculum',
    description: 'Australian curriculum, IB pathways, subject choices, and language support.',
  },
  {
    slug: 'student-life',
    label: 'Student life',
    description: 'Activities, wellbeing, parent community, transport, meals, and daily routines.',
  },
  {
    slug: 'boarding',
    label: 'Boarding',
    description: 'Boarding, homestay, weekend routines, safety, and accommodation fit.',
  },
  {
    slug: 'agents',
    label: 'Agents',
    description: 'Partner workflows, training, compliance, and application pipeline examples.',
  },
  {
    slug: 'schools',
    label: 'Schools',
    description: 'School profile quality, admissions workflows, pricing, and growth content.',
  },
  {
    slug: 'pathways',
    label: 'Pathways',
    description: 'High school, university, careers, prerequisites, and outcomes.',
  },
  {
    slug: 'events',
    label: 'Events',
    description: 'Open days, virtual tours, webinars, orientation, and family briefings.',
  },
  {
    slug: 'company',
    label: 'Company',
    description: 'About SchoolGo, contact, data quality, safety, and partnerships.',
  },
  {
    slug: 'school-search',
    label: 'School search',
    description: 'Search, compare, filters, sectors, specialist programs, and enrolment status.',
  },
];

const pageSeeds: ContentPageSeed[] = ([
  ['admissions-hub-australian-schools', 'admissions', 'admissions', 'families', 'Admissions hub for Australian schools', 'A practical landing page for families comparing application windows, documents, interviews, and next actions.', '/images/auth/parent.jpg', 'brand'],
  ['how-to-apply-year-7', 'admissions', 'admissions', 'families', 'How to apply for Year 7', 'A staged example of enquiry, shortlist, documents, interview, offer, and enrolment acceptance.', '/images/auth/parent.jpg', 'brand'],
  ['application-documents-checklist', 'admissions', 'faq', 'families', 'Application documents checklist', 'A detailed checklist page for passports, reports, English testing, guardianship, and school preferences.', '/images/auth/parent.jpg', 'featured'],
  ['interview-preparation-guide', 'admissions', 'overview', 'families', 'Interview preparation guide', 'A page pattern for student interviews, parent conversations, trial classes, and follow-up notes.', '/images/auth/parent.jpg', 'trust'],
  ['enrolment-decision-timeline', 'admissions', 'events', 'families', 'Enrolment decision timeline', 'A timeline page for submission dates, assessment windows, offer rounds, and acceptance deadlines.', '/images/auth/parent.jpg', 'brand'],
  ['school-fees-planning', 'fees', 'fees', 'families', 'School fees planning', 'A tuition planning page with annual fees, one-off charges, optional extras, and billing checkpoints.', '/images/auth/parent.jpg', 'featured'],
  ['tuition-payment-calendar', 'fees', 'fees', 'families', 'Tuition payment calendar', 'A fee calendar example for deposits, term instalments, late fees, refunds, and renewal timing.', '/images/auth/parent.jpg', 'featured'],
  ['scholarships-and-bursaries', 'fees', 'overview', 'families', 'Scholarships and bursaries', 'A funding page pattern for eligibility, deadlines, evidence, interviews, and related fee links.', '/images/auth/parent.jpg', 'trust'],
  ['first-year-costs-checklist', 'fees', 'faq', 'families', 'First-year costs checklist', 'A parent-facing checklist for tuition, uniforms, devices, excursions, insurance, transport, and boarding.', '/images/auth/parent.jpg', 'featured'],
  ['refund-and-withdrawal-policy', 'fees', 'overview', 'families', 'Refund and withdrawal policy', 'A policy-style dummy page that links fee rules to enrolment dates and family support contacts.', '/images/auth/parent.jpg', 'muted'],
  ['international-family-start-here', 'international', 'international', 'families', 'International family start here', 'A starting point for families moving from overseas and comparing school options in Australia.', '/images/auth/parent.jpg', 'brand'],
  ['student-visa-overview', 'international', 'international', 'families', 'Student visa overview', 'A visa support page linking school offers, guardian planning, health cover, and document checks.', '/images/auth/parent.jpg', 'trust'],
  ['english-test-pathways', 'international', 'curriculum', 'families', 'English test pathways', 'An English entry page covering AEAS, IELTS, EAL support, bridging programs, and retest timing.', '/images/auth/parent.jpg', 'trust'],
  ['relocation-and-arrival', 'international', 'international', 'families', 'Relocation and arrival', 'A relocation page for airport arrival, local setup, orientation, uniforms, devices, and first week support.', '/images/auth/parent.jpg', 'brand'],
  ['health-cover-and-wellbeing', 'international', 'student-life', 'families', 'Health cover and wellbeing', 'A support page connecting overseas health cover, counselling, wellbeing teams, and emergency contacts.', '/images/auth/parent.jpg', 'trust'],
  ['australian-curriculum-overview', 'curriculum', 'curriculum', 'families', 'Australian curriculum overview', 'A curriculum explainer for families comparing learning stages, subjects, assessment, and outcomes.', '/images/auth/school.jpg', 'brand'],
  ['ib-programme-pathways', 'curriculum', 'curriculum', 'families', 'IB programme pathways', 'A framework page for PYP, MYP, Diploma pathways, school fit, assessment style, and subject choice.', '/images/auth/school.jpg', 'trust'],
  ['stem-subject-selection', 'curriculum', 'curriculum', 'families', 'STEM subject selection', 'A subject detail page showing prerequisites, extension options, clubs, competitions, and future pathways.', '/images/auth/school.jpg', 'featured'],
  ['arts-sport-co-curricular', 'curriculum', 'student-life', 'families', 'Arts, sport, and co-curricular', 'A page type for programs beyond class: performing arts, sport, leadership, service, and competitions.', '/images/auth/school.jpg', 'featured'],
  ['english-language-support', 'curriculum', 'curriculum', 'families', 'English language support', 'A support page pattern for EAL assessment, classroom scaffolding, tutoring, and parent reporting.', '/images/auth/school.jpg', 'trust'],
  ['student-life-overview', 'student-life', 'student-life', 'families', 'Student life overview', 'A hub page for community, clubs, wellbeing, meals, transport, uniforms, and everyday student routines.', '/images/auth/parent.jpg', 'brand'],
  ['clubs-and-activities', 'student-life', 'student-life', 'families', 'Clubs and activities', 'A directory-style page for sport, arts, STEM clubs, service, language groups, and leadership programs.', '/images/auth/school.jpg', 'featured'],
  ['wellbeing-support', 'student-life', 'student-life', 'families', 'Wellbeing support', 'A school support page for counselling, pastoral care, health services, peer support, and family escalation paths.', '/images/auth/parent.jpg', 'trust'],
  ['uniforms-transport-and-meals', 'student-life', 'faq', 'families', 'Uniforms, transport, and meals', 'A practical family FAQ page covering daily logistics before the first day of school.', '/images/auth/parent.jpg', 'muted'],
  ['parent-community', 'student-life', 'overview', 'families', 'Parent community', 'A community page for parent groups, school events, volunteering, translations, and communication rhythms.', '/images/auth/parent.jpg', 'trust'],
  ['boarding-school-overview', 'boarding', 'boarding', 'families', 'Boarding school overview', 'A boarding hub covering routines, supervision, weekend activities, facilities, and academic support.', '/images/auth/school.jpg', 'brand'],
  ['homestay-vs-boarding', 'boarding', 'boarding', 'families', 'Homestay vs boarding', 'A comparison page for families choosing between residential boarding, homestay, and guardian arrangements.', '/images/auth/school.jpg', 'featured'],
  ['weekend-life-for-boarders', 'boarding', 'student-life', 'families', 'Weekend life for boarders', 'A student-life page pattern for weekend programs, sport, study sessions, outings, and wellbeing checks.', '/images/auth/school.jpg', 'trust'],
  ['boarding-application-process', 'boarding', 'admissions', 'families', 'Boarding application process', 'A boarding admissions page for eligibility, interviews, medical forms, guardian rules, and offers.', '/images/auth/school.jpg', 'brand'],
  ['accommodation-safety', 'boarding', 'faq', 'families', 'Accommodation safety', 'A safety and policy page for supervision, emergency contacts, leave approvals, visitors, and pastoral care.', '/images/auth/school.jpg', 'muted'],
  ['agent-partner-overview', 'agents', 'agents', 'agents', 'Agent partner overview', 'A partner landing page for education agents supporting families through search, shortlist, and admissions.', '/images/auth/agent.jpg', 'brand'],
  ['authorised-agent-directory', 'agents', 'directory', 'agents', 'Authorised agent directory', 'A directory page pattern for country coverage, specialisms, compliance status, and school matching support.', '/images/auth/agent.jpg', 'trust'],
  ['agent-training-resources', 'agents', 'agents', 'agents', 'Agent training resources', 'A resource page for onboarding, school data literacy, application standards, and family communication.', '/images/auth/agent.jpg', 'featured'],
  ['student-application-pipeline', 'agents', 'agents', 'agents', 'Student application pipeline', 'A workflow page for managing leads, shortlists, documents, messages, and school responses.', '/images/auth/agent.jpg', 'brand'],
  ['compliance-for-agents', 'agents', 'faq', 'agents', 'Compliance for agents', 'A compliance FAQ page covering consent, disclosure, document handling, and communication standards.', '/images/auth/agent.jpg', 'muted'],
  ['school-profile-claiming', 'schools', 'schools', 'schools', 'School profile claiming', 'A school-facing page showing how teams claim and improve their SchoolGo profile.', '/images/auth/school.jpg', 'brand'],
  ['admissions-team-workflow', 'schools', 'schools', 'schools', 'Admissions team workflow', 'A workflow page for enquiries, shortlist signals, applications, messages, and offer follow-up.', '/images/auth/school.jpg', 'trust'],
  ['international-student-growth', 'schools', 'schools', 'schools', 'International student growth', 'A school growth page for visibility, data quality, markets, trust badges, and enquiry conversion.', '/images/auth/school.jpg', 'featured'],
  ['school-pricing-plan', 'schools', 'fees', 'schools', 'School pricing plan', 'A pricing page pattern for listing packages, admissions tools, profile enhancements, and annual planning.', '/images/auth/school.jpg', 'featured'],
  ['school-data-quality', 'schools', 'faq', 'schools', 'School data quality', 'A data standards page for campuses, fees, CRICOS details, curriculum, boarding, and enrolment status.', '/images/auth/school.jpg', 'muted'],
  ['high-school-to-university', 'pathways', 'curriculum', 'families', 'High school to university', 'A pathway page linking subject selection, senior certificates, prerequisites, careers, and university entry.', '/images/auth/school.jpg', 'brand'],
  ['career-counselling-roadmap', 'pathways', 'overview', 'families', 'Career counselling roadmap', 'A counselling page for year-by-year planning, workshops, interviews, applications, and outcomes.', '/images/auth/school.jpg', 'trust'],
  ['subject-prerequisites', 'pathways', 'directory', 'families', 'Subject prerequisites', 'A directory-style page linking subjects, future degrees, entry assumptions, and school support services.', '/images/auth/school.jpg', 'featured'],
  ['exam-and-assessment-calendar', 'pathways', 'events', 'families', 'Exam and assessment calendar', 'A calendar page pattern for exams, reports, counselling checkpoints, and application milestones.', '/images/auth/school.jpg', 'brand'],
  ['graduate-outcomes', 'pathways', 'overview', 'families', 'Graduate outcomes', 'A proof page for destinations, skills, alumni stories, university offers, and career confidence.', '/images/auth/school.jpg', 'trust'],
  ['open-day-calendar', 'events', 'events', 'families', 'Open day calendar', 'An event listing page for tours, open mornings, principal briefings, and application clinics.', '/images/auth/school.jpg', 'brand'],
  ['virtual-school-tours', 'events', 'events', 'families', 'Virtual school tours', 'A virtual visit page for online tours, campus maps, learning spaces, boarding houses, and Q&A.', '/images/auth/school.jpg', 'featured'],
  ['admissions-webinars', 'events', 'events', 'families', 'Admissions webinars', 'A webinar page for family briefings, visa sessions, school comparisons, and agent co-hosted events.', '/images/auth/agent.jpg', 'trust'],
  ['orientation-week', 'events', 'events', 'families', 'Orientation week', 'A new-student page for first-week events, buddy programs, parent sessions, and school systems.', '/images/auth/parent.jpg', 'brand'],
  ['regional-family-briefings', 'events', 'events', 'families', 'Regional family briefings', 'A regional event page for market-specific school advice and multilingual family sessions.', '/images/auth/agent.jpg', 'featured'],
  ['about-schoolgo', 'company', 'overview', 'all', 'About SchoolGo', 'A company page explaining SchoolGo’s role in school discovery, comparison, admissions readiness, and trust.', '/images/auth/parent.jpg', 'brand'],
  ['contact-admissions-team', 'company', 'directory', 'all', 'Contact the SchoolGo team', 'A contact page pattern routing families, agents, and schools to the right next step.', '/images/auth/agent.jpg', 'trust'],
  ['schoolgo-data-methodology', 'company', 'faq', 'all', 'SchoolGo data methodology', 'A trust page describing how school data, fees, CRICOS details, and profile updates are handled.', '/images/auth/school.jpg', 'muted'],
  ['privacy-and-safety', 'company', 'faq', 'all', 'Privacy and safety', 'A policy-style page for account safety, consent, document handling, and responsible school communication.', '/images/auth/parent.jpg', 'muted'],
  ['partner-network', 'company', 'directory', 'all', 'SchoolGo partner network', 'A network page for schools, agents, family support partners, relocation specialists, and events.', '/images/auth/agent.jpg', 'featured'],
  ['compare-schools-guide', 'school-search', 'directory', 'families', 'Compare schools guide', 'A comparison page for fees, location, curriculum, boarding, English support, and enrolment availability.', '/images/auth/parent.jpg', 'brand'],
  ['choose-school-by-location', 'school-search', 'directory', 'families', 'Choose a school by location', 'A location page for suburbs, transport, homestay options, commute time, and school clusters.', '/images/auth/parent.jpg', 'trust'],
  ['religious-and-independent-schools', 'school-search', 'directory', 'families', 'Religious and independent schools', 'A sector explainer comparing school identity, governance, values, fees, and admissions fit.', '/images/auth/school.jpg', 'featured'],
  ['selective-and-specialist-programs', 'school-search', 'directory', 'families', 'Selective and specialist programs', 'A program page for selective entry, music, sport, STEM, languages, and portfolio requirements.', '/images/auth/school.jpg', 'brand'],
  ['cricos-and-enrolment-status', 'school-search', 'faq', 'families', 'CRICOS and enrolment status', 'A search support page explaining CRICOS registration, availability signals, and international enrolment rules.', '/images/auth/school.jpg', 'muted'],
] as const).map(([slug, category, type, audience, title, subtitle, image, accent]) => ({
  slug,
  category,
  type,
  audience,
  title,
  subtitle,
  image,
  accent,
})) satisfies ContentPageSeed[];

const categoryBySlug = Object.fromEntries(
  contentCategories.map((category) => [category.slug, category]),
) as Record<string, ContentCategory>;

const typeEyebrows: Record<ContentPageType, string> = {
  overview: 'Overview',
  admissions: 'Admissions',
  fees: 'Fees',
  curriculum: 'Curriculum',
  'student-life': 'Student life',
  boarding: 'Boarding',
  international: 'International families',
  agents: 'Agent resources',
  schools: 'School resources',
  events: 'Events',
  faq: 'FAQ',
  directory: 'Directory',
};

function pagePath(slug: string) {
  return `/resources/${slug}`;
}

function createPage(seed: ContentPageSeed, index: number): ContentPage {
  const category = categoryBySlug[seed.category];
  const relatedCategoryHref = `/resources/category/${seed.category}`;
  const typeLabel = typeEyebrows[seed.type].toLowerCase();
  const audienceLabel = seed.audience === 'all' ? 'All audiences' : seed.audience;
  const categoryLabel = category?.label ?? 'Resources';

  return {
    ...seed,
    description: `${seed.subtitle} This dummy ${typeLabel} page shows how a richer SchoolGo content page can be assembled from reusable blocks.`,
    eyebrow: category?.label ?? typeEyebrows[seed.type],
    imageAlt: `${seed.title} example page image`,
    metrics: [
      { value: `${index + 3}`, label: 'linked next steps' },
      { value: seed.type === 'directory' ? '24' : '6', label: seed.type === 'events' ? 'sample dates' : 'example sections' },
      { value: seed.audience === 'agents' ? '3 markets' : '5 mins', label: seed.audience === 'schools' ? 'profile review' : 'reading time' },
    ],
    facts: [
      { label: 'Audience', value: seed.audience === 'all' ? 'Families, agents, and schools' : seed.audience },
      { label: 'Page type', value: typeEyebrows[seed.type] },
      { label: 'Content depth', value: 'Dummy detailed page' },
      { label: 'Related hub', value: category?.label ?? 'Resources' },
    ],
    features: [
      {
        title: 'Fast orientation',
        description: `Use this ${typeLabel} page to understand the major decisions before moving deeper.`,
        href: '#overview',
        icon: 'compass',
      },
      {
        title: 'Connected resources',
        description: 'Every major block links to related pages, anchors, or the school search experience.',
        href: relatedCategoryHref,
        icon: 'network',
      },
      {
        title: 'Reusable page section',
        description: 'The same block can be reordered for admissions, curriculum, events, policy, and directory pages.',
        href: '/resources',
        icon: 'layers',
      },
    ],
    steps: [
      {
        title: 'Start with the family goal',
        description: `Clarify the school outcome, timing, location, and support needs before using this ${typeLabel} page.`,
        href: '/resources/international-family-start-here',
      },
      {
        title: 'Compare the practical constraints',
        description: 'Check fees, documents, entry rules, availability, and support services early.',
        href: '/resources/compare-schools-guide',
      },
      {
        title: 'Move into action',
        description: 'Use the linked next step to search schools, prepare documents, or contact SchoolGo.',
        href: '/search',
      },
    ],
    timeline: [
      {
        date: 'Week 1',
        title: 'Create the shortlist',
        description: 'Capture the must-have criteria and compare a small set of schools or pathways.',
        href: '/search',
      },
      {
        date: 'Week 2',
        title: 'Prepare the evidence',
        description: 'Collect reports, test evidence, fee assumptions, visas, and family context.',
        href: '/resources/application-documents-checklist',
      },
      {
        date: 'Week 3',
        title: 'Confirm the next step',
        description: 'Book a visit, send an enquiry, start the application, or review related guidance.',
        href: relatedCategoryHref,
      },
    ],
    checklist: [
      {
        label: 'Confirm timing',
        detail: 'Match school deadlines with family relocation, visa, fee, and orientation dates.',
        href: '/resources/enrolment-decision-timeline',
      },
      {
        label: 'Check the cost picture',
        detail: 'Review tuition, extras, deposits, uniforms, devices, transport, and boarding if relevant.',
        href: '/resources/school-fees-planning',
      },
      {
        label: 'Save related resources',
        detail: 'Keep the most relevant pages close so the next conversation has clear evidence.',
        href: relatedCategoryHref,
      },
    ],
    comparison: [
      { label: 'Primary question', primary: 'Fit', secondary: 'Timing', tertiary: 'Support' },
      { label: 'What to compare', primary: 'Curriculum and culture', secondary: 'Deadlines and places', tertiary: 'English, wellbeing, boarding' },
      { label: 'Best next action', primary: 'Shortlist schools', secondary: 'Check dates', tertiary: 'Ask targeted questions' },
    ],
    faqs: [
      {
        question: `How should families use ${seed.title.toLowerCase()}?`,
        answer: 'Treat this as a planning page first, then follow the links to the relevant checklist, category hub, or school search page.',
      },
      {
        question: 'Is this real production content?',
        answer: 'No. It is structured dummy content designed to prove multiple page layouts and reusable content blocks.',
      },
      {
        question: 'Where should the next page link go?',
        answer: 'Every example links either to a related resource, an in-page section, the school search experience, or a portal landing page.',
      },
    ],
    resources: [
      {
        title: category?.label ?? 'Resource hub',
        description: category?.description ?? 'Browse related SchoolGo content examples.',
        href: relatedCategoryHref,
        meta: 'Category hub',
      },
      {
        title: 'School search',
        description: 'Move from planning content into practical school discovery and comparison.',
        href: '/search',
        meta: 'Interactive tool',
      },
      {
        title: 'All resource examples',
        description: 'Browse every dummy page type and reusable layout example.',
        href: '/resources',
        meta: 'Index',
      },
    ],
    links: [
      { label: 'Browse this category', href: relatedCategoryHref },
      { label: 'Find schools', href: '/search' },
      { label: 'See all examples', href: '/resources' },
    ],
    searchSignals: [
      { label: 'Intent', value: typeEyebrows[seed.type], tone: 'brand' },
      { label: 'Audience', value: audienceLabel, tone: 'trust' },
      { label: 'Journey', value: categoryLabel, tone: 'featured' },
      { label: 'Reviewed', value: 'May 2026', tone: 'muted' },
    ],
    decisionPoints: [
      {
        title: 'Fit decision',
        summary: `Confirm whether ${categoryLabel.toLowerCase()} is the right journey for the family, agent, or school team.`,
        owner: seed.audience === 'schools' ? 'School growth lead' : 'Family success lead',
        evidence: 'Shortlist notes, priority constraints, and linked comparison pages.',
        href: '/resources/compare-schools-guide',
      },
      {
        title: 'Readiness decision',
        summary: 'Check whether the user has the documents, dates, budget, and support signals needed to move forward.',
        owner: seed.audience === 'agents' ? 'Agent operations lead' : 'Admissions operations lead',
        evidence: 'Reports, passports, fee assumptions, English evidence, and timing notes.',
        href: '/resources/application-documents-checklist',
      },
      {
        title: 'Next action decision',
        summary: 'Route the visitor into search, contact, a related policy page, or the next application step.',
        owner: 'SchoolGo content operations',
        evidence: 'CTA clicks, related pages, resource rows, and category-level navigation.',
        href: relatedCategoryHref,
      },
    ],
    aiSummary: {
      answer: `${seed.title} helps ${audienceLabel.toLowerCase()} understand the practical next step for ${categoryLabel.toLowerCase()}, including timing, evidence, ownership, and linked follow-up actions.`,
      intent: `${typeEyebrows[seed.type]} research and decision support`,
      entities: [
        seed.title,
        categoryLabel,
        typeEyebrows[seed.type],
        audienceLabel,
        'SchoolGo',
      ],
      followUps: [
        { label: 'Compare school options', href: '/resources/compare-schools-guide' },
        { label: 'Prepare documents', href: '/resources/application-documents-checklist' },
        { label: 'Find schools', href: '/search' },
      ],
    },
    proofPoints: [
      {
        label: 'Visible next step',
        detail: 'Primary and secondary CTAs are rendered near the top and repeated in the final action banner.',
        confidence: 'High',
        href: pagePath(seed.slug),
      },
      {
        label: 'Evidence path',
        detail: 'Checklist, timeline, and resource rows expose the exact documents or decisions needed before action.',
        confidence: seed.type === 'faq' ? 'Medium' : 'High',
        href: '/resources/application-documents-checklist',
      },
      {
        label: 'Internal linking',
        detail: 'Related pages, category hubs, resources, and action links make the page easy to crawl and navigate.',
        confidence: 'High',
        href: relatedCategoryHref,
      },
    ],
    stakeholders: [
      {
        name: 'Family decision maker',
        goal: 'Understand school fit, timing, budget, and support before making contact.',
        owner: 'Family success',
        metric: 'Shortlist clarity',
        href: '/parent',
      },
      {
        name: 'Agent or counsellor',
        goal: 'Translate the page into evidence, tasks, and next-step guidance for the family.',
        owner: 'Agent operations',
        metric: 'Application readiness',
        href: '/agent',
      },
      {
        name: 'School admissions team',
        goal: 'Use the same structure to explain requirements, service levels, and response expectations.',
        owner: 'School growth',
        metric: 'Response quality',
        href: '/school',
      },
    ],
    actionPaths: [
      {
        label: 'Research',
        description: `Read the ${categoryLabel.toLowerCase()} context and compare related pages before choosing a school path.`,
        href: relatedCategoryHref,
        priority: 'Support',
      },
      {
        label: 'Prepare',
        description: 'Collect evidence, clarify timing, and identify the owner for each decision point.',
        href: '/resources/application-documents-checklist',
        priority: 'Secondary',
      },
      {
        label: 'Act',
        description: 'Move from content into school search, enquiry, contact, or application readiness.',
        href: '/search',
        priority: 'Primary',
      },
    ],
    schemaKeywords: [
      seed.title,
      categoryLabel,
      typeEyebrows[seed.type],
      audienceLabel,
      'SchoolGo',
      'Australian schools',
      'international students',
      'school admissions',
    ],
    lastReviewed: '2026-05-20',
    quote: {
      quote: `A useful ${typeLabel} page should answer the immediate question and make the next click obvious.`,
      name: 'SchoolGo content team',
      role: 'Dummy content system',
    },
    cta: {
      title: `Keep exploring ${category?.label.toLowerCase() ?? 'SchoolGo resources'}`,
      description: 'Use the linked examples to test richer page structures, page-to-page journeys, and deeper resource navigation.',
      primary: { label: 'Browse related pages', href: relatedCategoryHref },
      secondary: { label: 'Find schools', href: '/search' },
    },
  };
}

export const contentPages = pageSeeds.map(createPage);

export const contentPageRegistry = Object.fromEntries(
  contentPages.map((page) => [page.slug, page]),
) as Record<string, ContentPage>;

export const contentSlugs = contentPages.map((page) => page.slug);

export const contentCategorySlugs = contentCategories.map((category) => category.slug);

export const contentTotalPages = Math.ceil(contentPages.length / CONTENT_PAGE_SIZE);

export function getContentPage(slug: string) {
  return contentPageRegistry[slug];
}

export function getContentCategory(categorySlug: string) {
  return categoryBySlug[categorySlug];
}

export function getContentPagesByCategory(categorySlug: string) {
  return contentPages.filter((page) => page.category === categorySlug);
}

export function getPaginatedContentPages(page: number) {
  const start = (page - 1) * CONTENT_PAGE_SIZE;
  return contentPages.slice(start, start + CONTENT_PAGE_SIZE);
}

export function getRelatedContentPages(page: ContentPage, limit = 3) {
  const sameCategory = contentPages.filter(
    (item) => item.category === page.category && item.slug !== page.slug,
  );
  const sameAudience = contentPages.filter(
    (item) => item.audience === page.audience && item.slug !== page.slug,
  );

  return [...sameCategory, ...sameAudience]
    .filter((item, index, all) => all.findIndex((candidate) => candidate.slug === item.slug) === index)
    .slice(0, limit);
}

export function getContentHref(page: ContentPage) {
  return pagePath(page.slug);
}
