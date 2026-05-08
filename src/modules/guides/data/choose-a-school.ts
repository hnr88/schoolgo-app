import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const chooseASchoolGuide: GuidePageData = {
  slug: 'choose-a-school',
  meta: {
    title: 'How to Choose the Right School | SchoolGo',
    description:
      'A plain-language guide to choosing the right Australian school for an international student, covering fit, year level, English, fees, accommodation, subjects, and pathway planning. Free on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'Choose a School',
    title: 'How to choose the right Australian school',
    subtitle:
      'A practical decision guide for international families and agents comparing year levels, English readiness, fees, accommodation, subject choices, welfare, and the pathway from school to university and career.',
    image: GUIDE_IMAGES['choose-a-school'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'fit', label: 'Student Fit' },
      { id: 'pathway', label: 'Pathway' },
      { id: 'practical', label: 'Practical Fit' },
      { id: 'shortlist', label: 'Shortlist' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'The best school is the one that fits the student',
      image: GUIDE_IMAGES['choose-a-school'].sections[0],
      imageAlt: 'International students studying together at an Australian school campus',
      reverse: false,
      paragraphs: [
        'Choosing an Australian school is not a ranking exercise. A famous school can be the wrong fit if the entry year is too late, the English requirement is too high, the senior subjects do not match the student’s pathway, or the accommodation option does not suit the family.',
        'For international families, the right decision balances six things: student readiness, school type, academic pathway, English support, accommodation and welfare, and total cost. Each factor affects the others. A lower-fee school may be the wrong choice if it lacks the required senior subjects. A highly academic school may be the wrong choice if the student needs a softer landing and stronger English support.',
        'Agents can use this guide as a conversation structure with parents. Instead of sending a long list of schools, build a shortlist that explains why each school fits the student’s age, English level, subject goals, living arrangement, budget, and preferred city.',
      ],
      table: {
        headers: [
          'Decision area',
          'What to compare',
          'Why it matters',
          'Red flag',
        ],
        rows: [
          [
            'Student readiness',
            'Age, year level, school reports, English level, maturity',
            'The student must be able to participate successfully from the first term.',
            'Choosing Year 11 or Year 12 only because it seems faster.',
          ],
          [
            'School type',
            'Government, Catholic, independent, boarding, co-ed, single-sex',
            'Each sector can differ in fees, admissions, culture, subject choice, and support.',
            'Assuming one sector is always better for every child.',
          ],
          [
            'Pathway',
            'Senior subjects, ATAR pathway, IB, VET, university goals',
            'Subject choices in senior school can affect future degree options.',
            'Applying before checking whether the school offers required subjects.',
          ],
          [
            'Practical fit',
            'Fees, accommodation, welfare, location, intakes, transport',
            'A school must work in real life, not just on paper.',
            'Comparing tuition only and ignoring the first-year total.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'fit',
      heading: 'Start with the student, not the school list',
      paragraphs: [
        'The first shortlist should be built around the student’s readiness. Australian schools commonly look at recent school reports, English ability, age, year level, and whether the student has the academic background to succeed without relying too heavily on extra support.',
        'A student who is quiet, younger, or new to English-medium learning may need a school with strong pastoral care, English preparation, and a manageable entry year. A student who is academically advanced may need broader senior subject choice, extension programs, and a clear university preparation pathway.',
        'The right placement should make the student feel stretched, not overwhelmed. This is especially important before Years 11 and 12, where subject sequences and assessment expectations become harder to change.',
      ],
      features: [
        {
          emoji: '📚',
          title: 'Academic record',
          description:
            'Check whether the student has passed core subjects such as English, mathematics, and other main learning areas over the last two years.',
        },
        {
          emoji: '🗣️',
          title: 'English readiness',
          description:
            'Compare the student’s current English level with the school’s direct-entry requirement and any English preparation pathway.',
        },
        {
          emoji: '📅',
          title: 'Year level timing',
          description:
            'Earlier entry can give the student more time to adjust. Senior entry should be checked carefully because certificate rules and subject sequences can be strict.',
        },
        {
          emoji: '🧩',
          title: 'Personal fit',
          description:
            'Consider confidence, independence, living-away-from-home readiness, study habits, friendship needs, and how much structure the student needs after school.',
        },
      ],
    },
    {
      type: 'content',
      id: 'pathway',
      heading: 'Choose backwards from the pathway',
      image: GUIDE_IMAGES['choose-a-school'].sections[1],
      imageAlt: 'Students in a modern classroom preparing for university pathways',
      reverse: true,
      paragraphs: [
        'For many international families, the emotional goal is clear: the right school should lead to the right university and career. That means school choice should be made backwards from the student’s likely future pathway, even if the student is still young and undecided.',
        'In Years 11 and 12, students work toward a state or territory senior certificate and may also pursue an ATAR or International Baccalaureate pathway. The subjects available at a school can shape the student’s future options. A student aiming for engineering, medicine, business, design, law, health sciences, or computer science may need particular mathematics, science, English, arts, portfolio, or prerequisite subjects.',
        'Not every school offers every senior subject every year. Some schools also offer vocational pathways, university preparation support, careers counselling, accelerated subjects, or English support designed for international students. These details should be checked before the application is submitted.',
      ],
      table: {
        headers: [
          'If the student may want...',
          'Check before applying',
          'Why this matters',
        ],
        rows: [
          [
            'University direct entry',
            'ATAR pathway, senior certificate rules, subject scaling context, careers advice',
            'Students need the right subjects and support to compete for preferred university courses.',
          ],
          [
            'Medicine, engineering, science, or technology',
            'Higher mathematics, chemistry, physics, biology, digital technologies, extension options',
            'Missing prerequisite subjects can limit course options or require bridging study later.',
          ],
          [
            'Design, arts, media, or music',
            'Portfolio subjects, performance programs, studio facilities, specialist teachers',
            'Creative pathways may depend on portfolio preparation as much as academic results.',
          ],
          [
            'A broader international pathway',
            'International Baccalaureate, globally recognised certificates, university counselling',
            'Some students want flexibility across Australian and overseas university options.',
          ],
          [
            'A more practical pathway',
            'VET subjects, applied learning, work-related learning, TAFE or pathway partners',
            'Not every strong pathway is purely academic. Practical options can still lead to further study.',
          ],
        ],
      },
      callout: {
        title: 'Question to ask every school',
        text: 'If my child starts in this year level, what senior subjects and university pathway options will realistically be available by Year 11 and Year 12?',
      },
    },
    {
      type: 'split',
      id: 'practical',
      heading: 'A good school also has to work in real life',
      paragraphs: [
        'Families often compare academic reputation first, but practical fit can decide whether the placement succeeds. The student needs a safe living arrangement, a manageable commute, a clear welfare contact, realistic entry timing, and a budget the family can sustain for the full enrolment.',
        'For under-18 students, accommodation and welfare are not afterthoughts. A school may be academically suitable but still unsuitable if it cannot support the required homestay, boarding, parent, or approved relative arrangement.',
      ],
      link: {
        label: 'Read the fees guide',
        href: '/guides/school-fees',
      },
      features: [
        {
          emoji: '💰',
          title: 'Total cost',
          description:
            'Compare tuition, application fees, health cover, uniforms, devices, excursions, accommodation, airport pickup, and first-year setup costs.',
        },
        {
          emoji: '🏠',
          title: 'Accommodation',
          description:
            'Confirm whether the student can live with a parent, approved relative, homestay family, or in school boarding, and who monitors the arrangement.',
        },
        {
          emoji: '🚌',
          title: 'Location and transport',
          description:
            'Check the commute from homestay or boarding, access to public transport, airport access, and whether the city fits the family’s lifestyle and budget.',
        },
        {
          emoji: '📆',
          title: 'Intake timing',
          description:
            'Some year levels and programs allow more flexible entry. Senior years, specialist programs, and boarding places may require earlier applications.',
        },
      ],
    },
    {
      type: 'content',
      id: 'shortlist',
      heading: 'Build a shortlist in three rounds',
      paragraphs: [
        'A strong shortlist should be narrow enough to act on and broad enough to protect the student’s options. For most families, three to five schools is a sensible working range. More than that becomes difficult to compare. Fewer than that can create risk if places, subjects, English entry, or accommodation are not available.',
        'Agents should explain why each school is included. Parents need to see the reasoning, not just the brand names. A good shortlist should make the trade-offs visible: one school may be stronger for subject choice, another for boarding, another for fees, and another for English support.',
      ],
      workflow: {
        title: 'SchoolGo shortlist builder',
        subtitle:
          'Use these filters to move from hundreds of schools to a clear comparison set.',
        steps: [
          {
            title: 'Round 1: eligibility',
            items: [
              'Year level available',
              'English entry pathway',
              'Student age and academic record',
              'Places open for the intake',
            ],
          },
          {
            title: 'Round 2: fit',
            items: [
              'School type and culture',
              'Subject and pathway match',
              'Welfare and accommodation',
              'Location and transport',
            ],
          },
          {
            title: 'Round 3: decision',
            items: [
              'Total first-year cost',
              'Ongoing annual cost',
              'Offer conditions',
              'Backup school if the first choice is full',
            ],
          },
        ],
        footer: {
          text: 'Compare schools side by side before sending applications.',
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
          question:
            'Should we choose the highest-ranked school we can afford?',
          paragraphs: [
            'Not automatically. Reputation can matter, but fit matters more. A school should match the student’s English level, year level, learning style, accommodation needs, subject goals, and budget. A better-known school can still be the wrong placement if the student is likely to struggle or feel unsupported.',
          ],
        },
        {
          question: 'How many schools should we shortlist?',
          paragraphs: [
            'Three to five schools is usually enough for a serious comparison. Include a preferred school, one or two close alternatives, and at least one safer option where the student is likely to meet entry, English, accommodation, and timing requirements.',
          ],
        },
        {
          question: 'Is Year 11 too late to start in Australia?',
          paragraphs: [
            'Year 11 entry can work for students with strong academic records, suitable English, and clear subject goals. It is less forgiving than earlier entry because the student begins senior certificate study quickly. Families should ask whether Year 10, English preparation, or an earlier intake would create a safer pathway.',
          ],
        },
        {
          question:
            'Should agents show parents the cheapest schools first?',
          paragraphs: [
            'Fees should be transparent, but price should not be the only sorting rule. Agents build more trust when they show the full first-year cost and explain what the family gains or gives up across pathway, location, English support, welfare, accommodation, and subject choice.',
          ],
        },
        {
          question: 'What is the biggest mistake families make?',
          paragraphs: [
            'The biggest mistake is treating school choice as a single decision. It is really a chain of connected decisions: year level, English, school type, city, accommodation, fees, senior subjects, and university pathway. A weakness in any one link can affect the whole plan.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'school-types',
      title: 'Government, Catholic & Independent Schools',
      description:
        'Understand the major school sectors and how fees, admissions, culture, and support can differ.',
      image: GUIDE_IMAGES['school-types'].card,
    },
    {
      slug: 'english-requirements',
      title: 'English Entry Requirements',
      description:
        'Learn how schools assess English readiness and when English preparation may be the better first step.',
      image: GUIDE_IMAGES['english-requirements'].card,
    },
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'Compare tuition, application fees, health cover, accommodation, uniforms, devices, and first-year costs.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
  ],
  cta: {
    heading: 'Ready to build a school shortlist?',
    text: 'Search and compare every government-registered Australian school accepting international students, including fees, year levels, boarding availability, English entry requirements, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
