import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const healthCoverGuide: GuidePageData = {
  slug: 'health-cover',
  meta: {
    title: 'Overseas Student Health Cover (OSHC) | SchoolGo',
    description:
      'A parent-friendly guide to Overseas Student Health Cover for international school students in Australia, including what OSHC covers, what it may not cover, family policies, dates, and visa planning.',
  },
  hero: {
    breadcrumbLabel: 'Health Cover',
    title: 'Overseas Student Health Cover (OSHC)',
    subtitle:
      'A practical guide for parents planning health cover for an international school student in Australia, including cover dates, family policies, what basic cover usually includes, and what to check before arrival.',
    image: GUIDE_IMAGES['health-cover'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'coverage', label: 'What It Covers' },
      { id: 'not-covered', label: 'Limits' },
      { id: 'dates', label: 'Dates' },
      { id: 'schoolgo-workflow', label: 'SchoolGo Workflow' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'OSHC is part of the student visa plan',
      image: GUIDE_IMAGES['health-cover'].sections[0],
      imageAlt: 'Healthcare professional providing medical consultation',
      reverse: false,
      paragraphs: [
        'Overseas Student Health Cover, usually called OSHC, is health insurance for international students studying in Australia. For most school students on a student visa, OSHC is required before arrival and must be maintained while the student is in Australia.',
        'Parents should not treat OSHC as a small add-on at the end of the application. The cover dates should match the student visa plan, school start date, arrival date, accommodation date, and any family members included on the visa.',
        'This guide is general information, not insurance or migration advice. Policy benefits, waiting periods, exclusions, and visa rules can change, so families should check the policy wording and current requirements before buying cover.',
      ],
      table: {
        headers: [
          'OSHC decision',
          'Why it matters',
          'What parents should check',
        ],
        rows: [
          [
            'Start date',
            'The student should be covered when they arrive in Australia, not only when school begins.',
            'Arrival date, orientation date, homestay or boarding move-in date, and visa timing.',
          ],
          [
            'End date',
            'Coverage should continue for the required stay, including time after the final school day if the visa allows it.',
            'Course length, expected visa length, holiday periods, and whether the family may extend later.',
          ],
          [
            'Policy type',
            'A student travelling alone needs different cover from a family with a parent or sibling included.',
            'Single, couple, single-parent, or family cover depending on who is included.',
          ],
          [
            'Extras',
            'Basic cover may not include services parents expect, such as dental, optical, or physiotherapy.',
            'What is included, what is excluded, waiting periods, claim process, and out-of-pocket costs.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'coverage',
      heading: 'What does basic OSHC usually help with?',
      paragraphs: [
        'Basic OSHC is designed to help students access essential healthcare while studying in Australia. It usually supports doctor visits, some hospital treatment, emergency ambulance, and limited medicine costs.',
        'Parents should still expect that not every medical cost will be paid in full. Gap fees, limits, waiting periods, provider rules, and policy exclusions can apply. The safest approach is to read the policy schedule before the student travels.',
      ],
      link: {
        label: 'Connect OSHC with the visa plan',
        href: '/guides/student-visa',
      },
      features: [
        {
          emoji: '🩺',
          title: 'Doctor visits',
          description:
            'Students can usually see a general practitioner for everyday illness, medical certificates, referrals, and basic care.',
        },
        {
          emoji: '🏥',
          title: 'Hospital and emergency care',
          description:
            'Basic policies usually help with some public or private hospital treatment and emergency ambulance services.',
        },
        {
          emoji: '💊',
          title: 'Some medicines',
          description:
            'Prescription support is usually limited. Families should check how much the policy contributes and whether regular medicines are covered.',
        },
        {
          emoji: '🧪',
          title: 'Specialist and tests',
          description:
            'Specialist appointments, blood tests, scans, and other services may be partly covered, but students can still face out-of-pocket costs.',
        },
      ],
    },
    {
      type: 'content',
      id: 'not-covered',
      heading: 'What may not be included in basic cover?',
      image: GUIDE_IMAGES['health-cover'].sections[1],
      imageAlt: 'Medical facilities and health services',
      reverse: true,
      paragraphs: [
        'Families often assume OSHC works like full private health insurance. It does not always work that way. Basic cover is mainly for essential medical and hospital care, not every health-related service a child may need while living overseas.',
        'Dental, optical, physiotherapy, private psychology, counselling, and some allied health services may require additional cover or separate payment. Students with ongoing medical needs should check the exact policy wording before choosing a school start date.',
      ],
      table: {
        headers: ['Service area', 'Parent question', 'Why to check early'],
        rows: [
          [
            'Dental',
            'Does the policy help with routine dental care, braces, or emergency dental treatment?',
            'Teenagers may need dental work during the school year, and costs can be high without extras.',
          ],
          [
            'Optical',
            'Are eye tests, glasses, or contact lenses included?',
            'Students who already wear glasses should bring prescriptions and plan for replacements.',
          ],
          [
            'Mental health and counselling',
            'What support is available if the student is homesick, stressed, or struggling to adjust?',
            'International school adjustment is emotional, especially for younger students living away from parents.',
          ],
          [
            'Pre-existing conditions',
            'Are waiting periods, exclusions, or documents required?',
            'A student with regular treatment needs should not arrive without a clear healthcare plan.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Ask two separate questions: Does this policy satisfy the visa requirement, and does it meet my child’s real health needs? A policy can be suitable for visa purposes but still leave gaps for a particular student.',
        link: {
          label: 'Add OSHC to the school budget',
          href: '/guides/school-fees',
        },
      },
    },
    {
      type: 'split',
      id: 'dates',
      heading: 'The dates matter more than parents expect',
      paragraphs: [
        'OSHC should be active for the whole period the student needs cover in Australia. Families should avoid any gap between arrival, orientation, school start, holiday periods, and the visa end date.',
        'If the student changes school, extends their study, changes visa timing, or adds a family member to the visa, the OSHC policy may also need to change. Agents should keep policy dates visible in the student file so renewals are not missed.',
      ],
      link: {
        label: 'Align cover with accommodation',
        href: '/guides/accommodation',
      },
      features: [
        {
          emoji: '✈️',
          title: 'Before arrival',
          description:
            'The student should not arrive before the cover starts. Under-18 students should also align cover with welfare and accommodation dates.',
        },
        {
          emoji: '📚',
          title: 'During school',
          description:
            'Parents should know how the student finds a doctor, claims benefits, accesses emergency care, and contacts the insurer.',
        },
        {
          emoji: '☀️',
          title: 'During holidays',
          description:
            'Cover should continue during Australian school holidays if the student remains in Australia.',
        },
        {
          emoji: '🔄',
          title: 'If plans change',
          description:
            'Changing insurers may be possible, but families should avoid any break in cover and keep confirmation documents.',
        },
      ],
    },
    {
      type: 'content',
      id: 'schoolgo-workflow',
      heading: 'Use SchoolGo to plan OSHC alongside the school choice',
      paragraphs: [
        'SchoolGo helps parents and agents compare the school details that affect OSHC planning: intake date, accommodation option, welfare arrangement, location, year level, likely arrival timing, and first-year budget.',
        'For agents, OSHC should sit in the same workflow as the school application, visa documents, accommodation, and parent communication. When parents ask questions through WeChat and WhatsApp, the agent can explain whether the cover dates match the school plan and whether any family members need to be included.',
      ],
      workflow: {
        title: 'OSHC planning workflow',
        subtitle:
          'Keep health cover connected to school, visa, accommodation, and arrival decisions.',
        steps: [
          {
            title: 'Step 1: Confirm the school plan',
            items: [
              'School start date',
              'Orientation timing',
              'Year level and pathway',
              'Expected course length',
            ],
          },
          {
            title: 'Step 2: Match the living plan',
            items: [
              'Arrival date',
              'Homestay or boarding start',
              'Guardian or parent location',
              'Holiday care plan',
            ],
          },
          {
            title: 'Step 3: Check the policy',
            items: [
              'Student or family cover type',
              'Start and end dates',
              'Basic cover and extras',
              'Claims and emergency instructions',
            ],
          },
        ],
        footer: {
          text: 'Compare schools first, then align cover with the real study and arrival plan.',
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
          question: 'Does every international school student need OSHC?',
          paragraphs: [
            'Most international students on a student visa need OSHC. Some exemptions may apply under specific arrangements, but families should not assume an exemption applies without checking current requirements.',
          ],
        },
        {
          question:
            'Should OSHC start on the first school day or the arrival day?',
          paragraphs: [
            'Parents should plan for cover from arrival, not only from the first class. Students may arrive for orientation, homestay placement, boarding move-in, or school preparation before the official school start date.',
          ],
        },
        {
          question: 'Can the school arrange OSHC for us?',
          paragraphs: [
            'Some schools can help students arrange OSHC or recommend a provider. Families may still be able to compare options and choose cover that suits the student’s needs, as long as the policy meets the required conditions.',
          ],
        },
        {
          question:
            'Does OSHC include dental, glasses, and physiotherapy?',
          paragraphs: [
            'Not always. Basic OSHC usually focuses on essential medical and hospital care. Dental, optical, physiotherapy, and other extras may require additional cover or separate payment.',
          ],
        },
        {
          question: 'For agents: what OSHC details should I track?',
          paragraphs: [
            'Track the provider, policy number, student name, family members included, start date, end date, visa dates, renewal deadline, and whether the family understands the cover limits. Keep the confirmation document with the visa file.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'student-visa',
      title: 'Student Visa: What Parents Need to Know',
      description:
        'Understand how OSHC fits with enrolment documents, welfare, evidence, arrival timing, and the student visa plan.',
      image: GUIDE_IMAGES['student-visa'].card,
    },
    {
      slug: 'accommodation',
      title: 'Where Will My Child Live?',
      description:
        'Connect health cover with homestay, boarding, parent living arrangements, welfare dates, and arrival planning.',
      image: GUIDE_IMAGES['accommodation'].card,
    },
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'Add OSHC, visa-related costs, accommodation, uniforms, devices, activities, and school extras into the first-year budget.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
  ],
  cta: {
    heading: 'Plan health cover with the school journey',
    text: 'Search and compare government-registered Australian schools accepting international students, including fees, accommodation, year levels, English requirements, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
