import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const studentVisaGuide: GuidePageData = {
  slug: 'student-visa',
  meta: {
    title: 'Student Visa: What Parents Need to Know | SchoolGo',
    description:
      'A parent-friendly guide to Australian student visa planning for international school students, including enrolment, welfare for under-18 students, OSHC, guardian options, evidence, and SchoolGo application planning.',
  },
  hero: {
    breadcrumbLabel: 'Student Visa',
    title: 'Student visa: what parents need to know',
    subtitle:
      'A practical guide to how Australian student visa planning connects with school offers, under-18 welfare, health cover, guardian options, documents, and arrival timing.',
    image: GUIDE_IMAGES['student-visa'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'before-visa', label: 'Before Visa' },
      { id: 'under-18', label: 'Under 18' },
      { id: 'evidence', label: 'Evidence' },
      { id: 'schoolgo-workflow', label: 'SchoolGo Workflow' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'The visa is not the first step. The school plan is.',
      image: GUIDE_IMAGES['student-visa'].sections[0],
      imageAlt: 'Passport and travel documents for international students',
      reverse: false,
      paragraphs: [
        'For most international school students, the Australian student visa is applied for after the family has chosen a school, received the right enrolment documents, arranged health cover, and confirmed where the student will live. The visa process depends on the school plan being clear.',
        'This guide is not immigration advice. Visa rules can change, and families should always check official requirements or use a qualified migration professional when needed. The purpose of this page is to help parents understand the practical order of decisions so the school application, welfare arrangements, health cover, and visa documents do not conflict.',
        'The most common parent mistake is treating the visa as a separate form. It is better to see it as the final check that the student\'s study plan, financial support, living arrangements, health cover, consent documents, and genuine study purpose all make sense together.',
      ],
      table: {
        headers: [
          'Visa planning area',
          'Why it matters',
          'What parents should prepare',
        ],
        rows: [
          [
            'Enrolment',
            'The visa application normally depends on evidence that the student has been accepted into an eligible course.',
            'Offer acceptance, payment steps, and the enrolment document required for the visa.',
          ],
          [
            'Welfare',
            'Students under 18 must have approved living, care, and support arrangements.',
            'School-approved welfare, parent or eligible guardian details, or approved accommodation evidence.',
          ],
          [
            'Health cover',
            'Overseas students generally need health cover for their stay in Australia.',
            'OSHC policy details, dates, and any extra cover the family wants beyond basic cover.',
          ],
          [
            'Genuine study purpose',
            'The application should show that study is the main reason for coming to Australia.',
            'A clear school pathway, evidence of past study, financial support, and family context.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'before-visa',
      heading: 'What should be settled before the visa application?',
      paragraphs: [
        'Before focusing on the visa form, families should confirm the school, year level, start date, English pathway, fees, accommodation, welfare arrangements, and health cover. If any of these are uncertain, the visa application may be harder to prepare clearly.',
        'Agents should collect documents early and make sure the parent\'s story is consistent: why this school, why this year level, why Australia, who is paying, where the student will live, and how the student will be supported.',
      ],
      link: {
        label: 'Build the school shortlist first',
        href: '/guides/choose-a-school',
      },
      features: [
        {
          emoji: '🏫',
          title: 'School and course evidence',
          description:
            'The family should have the right enrolment documents and understand whether the student is entering mainstream school, preparation, or a packaged pathway.',
        },
        {
          emoji: '💰',
          title: 'Financial planning',
          description:
            'Prepare evidence that tuition, living costs, health cover, travel, and support are realistic for the student\'s planned stay.',
        },
        {
          emoji: '📚',
          title: 'English and academic fit',
          description:
            'The school pathway should make sense for the student\'s current English evidence, reports, year level, and long-term goals.',
        },
        {
          emoji: '✈️',
          title: 'Arrival timing',
          description:
            'Do not book travel too early. Under-18 welfare dates, school orientation, homestay or boarding dates, and visa grant timing all need to align.',
        },
      ],
    },
    {
      type: 'content',
      id: 'under-18',
      heading: 'Under-18 students need approved welfare arrangements',
      image: GUIDE_IMAGES['student-visa'].sections[1],
      imageAlt: 'Student preparing visa application documents',
      reverse: true,
      paragraphs: [
        'For school students under 18, welfare is one of the most important visa planning issues. The student must have suitable accommodation, care, and support arrangements. The arrangement may involve a parent, an eligible nominated relative or guardian, or school-approved welfare and accommodation.',
        'If the school approves the welfare arrangement, the school provides the relevant welfare confirmation and dates. The student must not arrive before the welfare start date. If the arrangement changes later, the family should not change it casually. Written approval may be required before the change is made.',
        'Some parents may consider a Student Guardian visa so a parent or eligible guardian can live in Australia and support the child. This can be a strong option for younger students, but it has its own requirements, costs, living arrangements, and work limitations. Families should check the official rules carefully before choosing this pathway.',
      ],
      table: {
        headers: [
          'Welfare option',
          'What it usually means',
          'What to confirm',
        ],
        rows: [
          [
            'School-approved accommodation and welfare',
            'The school or provider approves where the student will live and how the student will be supported.',
            'Start and end dates, arrival rules, holiday arrangements, emergency contacts, and change approval rules.',
          ],
          [
            'Parent or eligible guardian in Australia',
            'A parent, legal custodian, or eligible relative provides care, accommodation, and support.',
            'Relationship evidence, age and visa status of the guardian, police checks where required, and practical living costs.',
          ],
          [
            'Student Guardian visa pathway',
            'A parent or eligible guardian applies to stay in Australia to support the student.',
            'Whether the guardian is eligible, whether they can work, how long they can stay, and how the family will fund the arrangement.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Do not separate visa planning from accommodation planning. For under-18 students, where the student lives is part of the visa risk, not just a lifestyle choice.',
        link: {
          label: 'Compare accommodation options',
          href: '/guides/accommodation',
        },
      },
    },
    {
      type: 'split',
      id: 'evidence',
      heading: 'The application should tell a consistent study story',
      paragraphs: [
        'The student visa process looks at whether the applicant is a genuine student and whether studying in Australia is the main reason for the stay. For a school-aged child, the family should be ready to explain why this school, this year level, this city, this pathway, and this living arrangement make sense.',
        'Good evidence usually supports the story rather than replacing it. School reports, English evidence, offer documents, financial support, family circumstances, previous study history, and pathway goals should all fit together.',
      ],
      link: {
        label: 'Review English evidence',
        href: '/guides/english-requirements',
      },
      features: [
        {
          emoji: '🏫',
          title: 'Why this school?',
          description:
            'The answer should connect to year level, English support, subjects, location, student welfare, and the pathway from school to university and career.',
        },
        {
          emoji: '📅',
          title: 'Why this timing?',
          description:
            'The start date should make sense with school terms, preparation pathways, accommodation availability, and the student\'s academic background.',
        },
        {
          emoji: '👨‍👩‍👧',
          title: 'Who is supporting the student?',
          description:
            'The application should be consistent about who is paying, where the student will live, and who is responsible for daily care.',
        },
        {
          emoji: '🎓',
          title: 'What happens next?',
          description:
            'For older students, the pathway should make sense through senior school, graduation, university options, and the student\'s future plans.',
        },
      ],
    },
    {
      type: 'content',
      id: 'schoolgo-workflow',
      heading: 'Use SchoolGo to reduce visa-stage surprises',
      paragraphs: [
        'SchoolGo helps families and agents compare the details that affect visa readiness before the application reaches the visa stage. Parents can compare school type, fees, English requirements, accommodation options, welfare considerations, and intakes before choosing a school.',
        'For agents, the goal is to avoid a last-minute scramble. Every student, document, and application should sit in one clear workflow. When parents ask questions through WeChat and WhatsApp, the agent can explain which documents are missing, which welfare arrangement is being used, and why the school plan is coherent.',
      ],
      workflow: {
        title: 'Visa-ready school planning workflow',
        subtitle:
          'Build a school plan that makes sense before the visa application begins.',
        steps: [
          {
            title: 'Step 1: Choose the right school',
            items: [
              'Compare year level and intake',
              'Check English and preparation pathways',
              'Confirm accommodation options',
              'Review first-year cost',
            ],
          },
          {
            title: 'Step 2: Prepare the evidence',
            items: [
              'School reports and translations',
              'English evidence if required',
              'Offer and enrolment documents',
              'Financial and family support documents',
            ],
          },
          {
            title: 'Step 3: Align the arrival plan',
            items: [
              'Welfare start date',
              'OSHC cover dates',
              'Homestay or boarding arrival',
              'Orientation and first school day',
            ],
          },
        ],
        footer: {
          text: 'Start with the school plan, then prepare visa documents around that plan.',
          buttonLabel: 'Search Schools',
          buttonHref: '/search',
        },
      },
    },
    {
      type: 'accordion',
      id: 'faqs',
      heading: 'Frequently asked questions',
      items: [
        {
          question: 'Can we apply for the visa before choosing a school?',
          paragraphs: [
            'Usually, the school plan comes first. Families normally need the correct enrolment evidence, health cover, welfare arrangements, and supporting documents before lodging a strong student visa application. Check current official requirements before applying.',
          ],
        },
        {
          question:
            'What is the biggest visa issue for under-18 school students?',
          paragraphs: [
            'Welfare and accommodation are often the biggest practical issues. The student must have approved care arrangements, and the arrival date must align with those arrangements. A school offer is not enough if the living and welfare plan is unclear.',
          ],
        },
        {
          question: 'Does my child need health cover?',
          paragraphs: [
            'International students generally need Overseas Student Health Cover for their stay in Australia. Basic cover usually helps with doctor visits, some hospital treatment, ambulance, and limited medicines, but families should check what is and is not included.',
          ],
        },
        {
          question: 'Can a parent live in Australia with the child?',
          paragraphs: [
            'Sometimes. A parent or eligible guardian may be able to use the Student Guardian visa pathway to support an under-18 student, but this has its own requirements and limitations. Families should check current rules and budget for the parent\'s living costs.',
          ],
        },
        {
          question:
            'For agents: what should I check before sending parents to the visa stage?',
          paragraphs: [
            'Check that the school offer, enrolment documents, English evidence, financial support, health cover, welfare arrangement, accommodation plan, consent documents, and arrival dates all match. If the story is inconsistent, fix the school plan before the visa application is lodged.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'accommodation',
      title: 'Where Will My Child Live?',
      description:
        'Compare homestay, boarding, parent living arrangements, welfare, and practical support for under-18 students.',
      image: GUIDE_IMAGES['accommodation'].card,
    },
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'Plan for tuition, accommodation, health cover, visa-related costs, school extras, and first-year budgeting.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Choose a school that fits the student\'s English readiness, year level, accommodation, budget, and pathway goals before the visa stage.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
  ],
  cta: {
    heading: 'Start with a visa-ready school plan',
    text: 'Search and compare government-registered Australian schools accepting international students, including fees, English entry requirements, accommodation, year levels, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
