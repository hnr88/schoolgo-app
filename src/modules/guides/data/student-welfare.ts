import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const studentWelfareGuide: GuidePageData = {
  slug: 'student-welfare',
  meta: {
    title: 'Student Welfare & Safeguarding | SchoolGo',
    description:
      'A parent-friendly guide to welfare and safeguarding for under-18 international school students in Australia, including approved care arrangements, CAAW dates, homestay monitoring, emergency contacts, and what happens if plans change.',
  },
  hero: {
    breadcrumbLabel: 'Student Welfare & Safeguarding',
    title: 'Student welfare & safeguarding',
    subtitle:
      'A practical guide to the care system around under-18 international school students in Australia, including approved welfare arrangements, safeguarding checks, monitoring, emergency contacts, and what parents should confirm before arrival.',
    image: GUIDE_IMAGES['student-welfare'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'responsibility', label: 'Responsibility' },
      { id: 'arrangements', label: 'Arrangements' },
      { id: 'monitoring', label: 'Monitoring' },
      { id: 'changes', label: 'Changes' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'Welfare is the care system around the student',
      image: GUIDE_IMAGES['student-welfare'].sections[0],
      imageAlt: 'Students enjoying social activities and building friendships',
      reverse: false,
      paragraphs: [
        'For an under-18 international student, welfare means more than having a place to sleep. It covers safe accommodation, responsible adults, emergency support, school wellbeing processes, arrival timing, holiday planning, and clear rules for what happens if something changes.',
        'Parents usually focus on the school offer and accommodation option first. That is understandable, but the welfare arrangement is what connects the school, visa, accommodation, health cover, and daily support into one approved plan.',
        'This guide is general information, not legal or migration advice. Welfare rules can change, and each school or state program may have its own process. Parents and agents should confirm the school-specific requirements before paying fees, booking flights, or changing accommodation.',
      ],
      table: {
        headers: [
          'Welfare area',
          'What it means',
          'What parents should confirm',
        ],
        rows: [
          [
            'Approved care',
            'The student must have a parent, eligible guardian, approved relative, or school-approved welfare arrangement.',
            'Who is responsible for the child each day, and which documents prove the arrangement.',
          ],
          [
            'Safe accommodation',
            'The place where the student lives must be suitable for their age, needs, and school routine.',
            'Address, host or boarding contact, house rules, transport, meals, and holiday arrangements.',
          ],
          [
            'Monitoring',
            'The school or approved provider must keep checking that the arrangement remains appropriate.',
            'How often checks occur, who the student can speak to, and how parents are updated.',
          ],
          [
            'Change control',
            'Welfare arrangements cannot be changed casually once approved.',
            'What approval is needed before changing homestay, guardian, school, or arrival date.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'responsibility',
      heading: 'Who is responsible for welfare?',
      paragraphs: [
        'There are two broad pathways. The first is parent or guardian care, where a parent, legal custodian, or eligible nominated relative is responsible for the student. The second is school-approved welfare, where the education provider approves the accommodation, support, and general welfare arrangements.',
        'When the school accepts responsibility, it issues a Confirmation of Appropriate Accommodation and Welfare, often called a CAAW. The CAAW has start and end dates, and the student must not arrive in Australia before the approved welfare start date.',
      ],
      link: {
        label: 'Connect welfare with the visa plan',
        href: '/guides/student-visa',
      },
      features: [
        {
          emoji: '👨‍👩‍👧',
          title: 'Parent or legal custodian',
          description:
            'A parent or legal custodian can care for the child in Australia if their visa and living arrangements support that role.',
        },
        {
          emoji: '👪',
          title: 'Eligible nominated relative',
          description:
            'A close relative may be nominated if they meet age, relationship, residency, and character requirements.',
        },
        {
          emoji: '🏫',
          title: 'School-approved welfare',
          description:
            'The school or provider approves the accommodation and welfare arrangement, then confirms the dates for visa purposes.',
        },
        {
          emoji: '🏠',
          title: 'Third-party homestay support',
          description:
            'Schools may use homestay agencies to help arrange or monitor placements, but the school remains responsible for approving the arrangement it accepts.',
        },
      ],
    },
    {
      type: 'content',
      id: 'arrangements',
      heading: 'The main welfare arrangement options',
      image: GUIDE_IMAGES['student-welfare'].sections[1],
      imageAlt: 'Student support group meeting in a school setting',
      reverse: true,
      paragraphs: [
        'The right welfare arrangement depends on the student’s age, year level, maturity, location, school rules, accommodation availability, and whether a parent or eligible relative can be in Australia. The key point is that the arrangement must be approved before the child relies on it.',
        'Parents should ask the school or agent to explain the exact approval pathway before committing to flights or private accommodation. A family friend, relative, or host family may feel suitable to the parent, but the arrangement still needs to satisfy the relevant approval process.',
      ],
      table: {
        headers: ['Arrangement', 'Best fit', 'What to check'],
        rows: [
          [
            'Parent living in Australia',
            'Younger students or families wanting direct parental care.',
            'Parent visa pathway, accommodation cost, school commute, and whether the parent can meet daily care obligations.',
          ],
          [
            'Eligible nominated relative',
            'Students with close family already living in Australia.',
            'Relationship evidence, guardian age, residency status, police checks if required, and practical capacity to care for the student.',
          ],
          [
            'School-approved homestay',
            'Students who need a family-style living environment with school-approved oversight.',
            'Host screening, adult clearances, meals, transport, bedroom, internet, holiday arrangements, and emergency contacts.',
          ],
          [
            'School boarding',
            'Students who need a structured residential environment on or near campus.',
            'Boarding supervision, weekend care, holiday closure rules, medical support, pastoral care, and total cost.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Do not separate the welfare decision from the accommodation decision. For an under-18 student, where the child lives, who is responsible, and what happens in an emergency are all part of the same approval story.',
        link: {
          label: 'Compare accommodation options',
          href: '/guides/accommodation',
        },
      },
    },
    {
      type: 'split',
      id: 'monitoring',
      heading: 'Safeguarding continues after arrival',
      paragraphs: [
        'A good welfare system is not a one-time approval. Schools and approved providers need processes to check that accommodation is suitable before the student arrives and to keep monitoring the arrangement after placement.',
        'In practice, this can include home visits, adult screening or Working with Children Checks, student interviews, parent updates, emergency contact procedures, homestay provider training, and critical incident reporting. The details vary by state and school, but the principle is the same: the child should have safe adults and clear support pathways.',
      ],
      link: {
        label: 'Plan health cover alongside welfare',
        href: '/guides/health-cover',
      },
      features: [
        {
          emoji: '✅',
          title: 'Before approval',
          description:
            'The accommodation should be checked for suitability before it is approved for the student.',
        },
        {
          emoji: '🔍',
          title: 'Adult screening',
          description:
            'Adults involved in accommodation or welfare should meet the child safety checks required in the relevant state or territory.',
        },
        {
          emoji: '📋',
          title: 'Ongoing checks',
          description:
            'Where the school has accepted welfare responsibility, accommodation should be reviewed regularly, including at least every six months for provider-approved accommodation.',
        },
        {
          emoji: '🚨',
          title: 'Emergency process',
          description:
            'Parents should know who the student contacts after hours, how urgent incidents are reported, and what happens if a placement becomes unsafe.',
        },
      ],
    },
    {
      type: 'content',
      id: 'changes',
      heading: 'Changing welfare arrangements needs approval',
      paragraphs: [
        'Families should not change homestay, boarding, guardian, school, or arrival timing without checking the welfare approval pathway first. A change that seems practical to the family can create a visa or safeguarding problem if the approved welfare arrangement no longer matches the student’s real situation.',
        'If a guardian needs to leave Australia, if a homestay placement breaks down, if a student changes school, or if a student is moving between providers, the welfare dates must remain continuous. There should be no gap where the student is under 18 and no approved person or provider is responsible.',
        'Agents should treat welfare as a live file, not a one-time document. Keep the CAAW dates, guardian evidence, accommodation address, school contact, emergency contact, and parent communication record together so the student’s care plan is easy to audit.',
      ],
      table: {
        headers: ['Change', 'Why it is sensitive', 'Agent checklist'],
        rows: [
          [
            'New homestay or boarding plan',
            'The previous address may be the one attached to the approved welfare arrangement.',
            'Get approval before moving, update parent, school, and emergency contacts.',
          ],
          [
            'Guardian leaving Australia',
            'The student may be left without an approved responsible adult.',
            'Confirm alternative care, evidence, school approval, and visa-related requirements before departure.',
          ],
          [
            'Changing school or packaged course',
            'The receiving provider needs to ensure there is no gap in welfare coverage.',
            'Align old and new dates, confirm new welfare documents, and avoid unsupported transition periods.',
          ],
          [
            'Early arrival or late arrival',
            'The student cannot rely on welfare before the approved start date.',
            'Check flight date, welfare start date, accommodation start date, and orientation date together.',
          ],
        ],
      },
      workflow: {
        title: 'Welfare-ready placement workflow',
        subtitle:
          'Build the school plan around age, accommodation, approval dates, and support.',
        steps: [
          {
            title: 'Step 1: Confirm the student profile',
            items: [
              'Age and date of birth',
              'Year level and start date',
              'English and academic pathway',
              'Likely arrival window',
            ],
          },
          {
            title: 'Step 2: Match the care pathway',
            items: [
              'Parent or eligible guardian',
              'School-approved homestay',
              'Boarding option',
              'Holiday and emergency plan',
            ],
          },
          {
            title: 'Step 3: Track the approvals',
            items: [
              'CAAW or guardian evidence',
              'Accommodation address',
              'Emergency contacts',
              'Change approval record',
            ],
          },
        ],
        footer: {
          text: 'Start with schools that can support the student’s age, accommodation, and welfare needs.',
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
          question: 'Is welfare the same as accommodation?',
          paragraphs: [
            'No. Accommodation is where the student lives. Welfare is the broader approved care arrangement, including who is responsible, how the student is monitored, what emergency process applies, and how changes are approved.',
          ],
        },
        {
          question: 'What is a CAAW?',
          paragraphs: [
            'A CAAW is a confirmation that the education provider has approved appropriate accommodation and welfare arrangements for an under-18 student. It includes start and end dates, and those dates matter for travel and visa planning.',
          ],
        },
        {
          question: 'Can my child arrive before the welfare start date?',
          paragraphs: [
            'No. Parents should not book flights that arrive before the approved welfare arrangement begins. Arrival date, accommodation date, orientation date, and visa conditions need to be checked together.',
          ],
        },
        {
          question: 'What happens if the homestay does not work out?',
          paragraphs: [
            'The student should speak to the school welfare contact or homestay provider immediately. The arrangement may need to be reviewed, and a new placement may need approval before the student moves. Emergency accommodation should be handled through the approved process.',
          ],
        },
        {
          question: 'For agents: what should be in the welfare file?',
          paragraphs: [
            'Track the student’s age, welfare pathway, CAAW or guardian documents, start and end dates, accommodation address, emergency contacts, school welfare contact, OSHC dates, parent consent documents, and any approved changes.',
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
        'Compare homestay, boarding, parent living arrangements, approved relatives, and accommodation timing.',
      image: GUIDE_IMAGES['accommodation'].card,
    },
    {
      slug: 'student-visa',
      title: 'Student Visa: What Parents Need to Know',
      description:
        'Understand how welfare dates, health cover, enrolment documents, and arrival timing fit into the visa plan.',
      image: GUIDE_IMAGES['student-visa'].card,
    },
    {
      slug: 'health-cover',
      title: 'Overseas Student Health Cover',
      description:
        'Plan OSHC dates, basic cover, emergency care, exclusions, family policies, and arrival timing.',
      image: GUIDE_IMAGES['health-cover'].card,
    },
  ],
  cta: {
    heading: 'Choose a school that can support the whole child',
    text: 'Search and compare government-registered Australian schools accepting international students, including accommodation, fees, English requirements, year levels, intake dates, and support. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
