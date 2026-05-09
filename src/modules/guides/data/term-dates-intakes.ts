import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const termDatesIntakesGuide: GuidePageData = {
  slug: 'term-dates-intakes',
  meta: {
    title: 'Term Dates, Intakes & Year Levels | SchoolGo',
    description:
      'A parent-friendly guide to Australian school term dates, international student intakes, year level placement, senior school timing, and how to plan the right start date.',
  },
  hero: {
    breadcrumbLabel: 'Term Dates, Intakes & Year Levels',
    title: 'Term dates, intakes & year levels',
    subtitle:
      'A practical planning guide for choosing the right Australian school start date, matching the correct year level, and avoiding rushed applications around visa, English, accommodation, and welfare timelines.',
    image: GUIDE_IMAGES['term-dates-intakes'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'intakes', label: 'Intakes' },
      { id: 'placement', label: 'Year levels' },
      { id: 'senior', label: 'Senior years' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'The best start date is not always the next start date',
      image: GUIDE_IMAGES['term-dates-intakes'].sections[0],
      imageAlt: 'Calendar and planning tools for academic year',
      reverse: false,
      paragraphs: [
        'Australian schools usually run on a four-term calendar, but international student intake rules are not the same at every school. Some schools may accept students into several terms. Others may prefer Term 1 or Term 3. Senior year entry, boarding availability, English preparation, and welfare arrangements can make the real start date more limited than the calendar suggests.',
        'For parents, timing affects the whole pathway: the year level, the subject choices, the amount of time before senior certificates, the visa timeline, accommodation availability, health cover dates, and how easily the child can settle. For agents, timing is often where a good application becomes a rushed one.',
        'This guide gives a broad planning framework. Exact term dates, application closing dates, and available intakes should always be checked on the school-specific page, because dates change each year and places can close early.',
      ],
      table: {
        headers: ['Question', 'Why it matters', 'What to confirm'],
        rows: [
          [
            'Which term can the student start?',
            'The school calendar may allow a term, but the school may not accept that year level or program at that point.',
            'Available intake, application deadline, orientation date, and whether places remain open.',
          ],
          [
            'Which year level fits?',
            'Age, previous schooling, English readiness, and curriculum stage all affect placement.',
            'School recommendation, report comparison, English pathway, and whether repeating or bridging is sensible.',
          ],
          [
            'Is senior school involved?',
            'Year 11 and Year 12 are much less flexible because subject sequences and assessment programs are already underway.',
            'Senior certificate rules, subject availability, prerequisite study, English readiness, and whether an earlier entry is safer.',
          ],
          [
            'Can the family meet the timeline?',
            'A student may have a school place but still be delayed by documents, welfare, accommodation, OSHC, or visa processing.',
            'School offer, payment timing, welfare dates, visa evidence, flight date, and first day of school.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'calendar',
      heading: 'How the Australian school calendar usually works',
      paragraphs: [
        'Most Australian schools divide the year into four terms. Term 1 usually begins in late January or early February. Term 2 usually begins around April. Term 3 usually begins around July. Term 4 usually begins around October and finishes in December.',
        'That simple pattern hides several practical details. States and territories publish their own term dates, independent and Catholic schools may set slightly different dates, student-free days can shift the first day for students, and boarding houses or homestays may have separate arrival windows.',
      ],
      link: {
        label: 'Understand the school system',
        href: '/guides/school-types',
      },
      features: [
        {
          emoji: '📅',
          title: 'Term 1: main school-year start',
          description:
            'The cleanest entry point for most students, especially when starting a new year level or senior study sequence.',
        },
        {
          emoji: '📆',
          title: 'Term 2: possible, but more selective',
          description:
            'Can work for some year levels, but students may enter after classmates have already begun assessment and routines.',
        },
        {
          emoji: '🗓️',
          title: 'Term 3: common mid-year option',
          description:
            'Often useful for students coming from northern hemisphere calendars, English preparation pathways, or mid-year family plans.',
        },
        {
          emoji: '🔚',
          title: 'Term 4: usually the hardest entry point',
          description:
            'The year is nearly complete, so many schools treat Term 4 as unsuitable for meaningful entry into mainstream classes.',
        },
      ],
    },
    {
      type: 'content',
      id: 'intakes',
      heading:
        'Intake availability depends on year level, program, and school capacity',
      image: GUIDE_IMAGES['term-dates-intakes'].sections[1],
      imageAlt: 'School academic calendar with important dates highlighted',
      reverse: true,
      paragraphs: [
        'Parents often ask, “Can my child start in July?” The better question is, “Can my child start this year level, at this school, in this program, with this English profile, at this point in the year?” Intake planning is specific because each school manages places, subject timetables, welfare capacity, accommodation, English preparation, and senior curriculum differently.',
        'Junior and middle years are usually more flexible than senior years. Primary and lower secondary students may be able to enter at more points in the year if the school has places and the welfare arrangements are ready. Older students need more careful planning because subject choices, assessment timelines, and graduation pathways are already forming.',
      ],
      table: {
        headers: ['Entry point', 'When it can work', 'Main risk to check'],
        rows: [
          [
            'Term 1 intake',
            'Best for a full school-year start, new year level, new subject sequence, or senior pathway planning.',
            'Application deadlines can close many months earlier, especially for popular schools and accommodation.',
          ],
          [
            'Term 2 intake',
            'Can suit a student who is ready academically and can catch up on early-year routines.',
            'The student may enter after initial teaching, assessment, friendship groups, and activity selection have begun.',
          ],
          [
            'Term 3 intake',
            'Often useful for mid-year entry, English preparation progress, or families planning from a different academic calendar.',
            'Subject choice and accommodation may be limited, and senior entry may be restricted.',
          ],
          [
            'Term 4 intake',
            'Sometimes useful for orientation, short transition, or preparation for the following year.',
            'Many schools may not treat Term 4 as a practical mainstream start because the academic year is ending.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Use SchoolGo search to filter by year levels and intake timing, then open each school profile to confirm the exact start dates, application deadlines, and whether the school can support the student’s English and accommodation needs.',
        link: {
          label: 'Search schools by intake',
          href: '/search',
        },
      },
    },
    {
      type: 'split',
      id: 'placement',
      heading:
        'Year level placement is a fit decision, not just an age calculation',
      paragraphs: [
        'Australian schools consider age, previous school reports, completed curriculum, English readiness, subject background, maturity, and available places when placing international students. A student may be the right age for one year level but still need preparation, repetition, or a different pathway to succeed.',
        'This is especially important when students move between countries with different academic calendars. A student may have completed part of a year overseas but still need to align with the Australian school year, assessment cycle, and senior certificate pathway.',
      ],
      link: {
        label: 'Check English readiness',
        href: '/guides/english-requirements',
      },
      features: [
        {
          emoji: '🎂',
          title: 'Age and birthday',
          description:
            'The school will check whether the student’s age is appropriate for the requested year level and peer group.',
        },
        {
          emoji: '📚',
          title: 'Previous curriculum',
          description:
            'Reports, subject history, grading scale, and completed units help the school compare overseas study with local expectations.',
        },
        {
          emoji: '🗣️',
          title: 'English readiness',
          description:
            'A student may be academically strong but still need English preparation before mainstream academic study.',
        },
        {
          emoji: '⏳',
          title: 'Pathway pressure',
          description:
            'The later the entry point, the less time the student has to settle before senior assessment and university pathway decisions.',
        },
      ],
    },
    {
      type: 'content',
      id: 'senior',
      heading: 'Senior years need the most careful timing',
      paragraphs: [
        'For many international families, the goal is a strong pathway from Australian school to university and career. That goal makes senior-year timing critical. Year 11 is often the beginning of a two-year senior certificate journey, and Year 12 is usually not a flexible entry point because students are already deep in assessed study.',
        'Starting too late can affect subject choice, assessment preparation, English confidence, friendships, wellbeing, and the student’s ability to perform under pressure. For a student who is not quite ready, an earlier year level, English preparation, or a January start may create a better pathway than forcing a late senior entry.',
        'Agents should explain this carefully through WeChat and WhatsApp. Parents may want the fastest route to graduation, but the safer route is the one that gives the student enough time to succeed.',
      ],
      table: {
        headers: ['Stage', 'Planning approach', 'SchoolGo search use'],
        rows: [
          [
            'Years 7-9',
            'Usually the most forgiving stage for settling, English growth, and subject exploration.',
            'Compare year level availability, welfare, accommodation, school type, and support programs.',
          ],
          [
            'Year 10',
            'Often a strong preparation year before senior certificate subjects and higher-stakes decisions.',
            'Look for schools that match English readiness, senior pathway options, and subject direction.',
          ],
          [
            'Year 11',
            'Best planned early, preferably before the senior program is underway.',
            'Confirm accepted intakes, subject availability, English evidence, and whether preparation is recommended.',
          ],
          [
            'Year 12',
            'Usually difficult for new international entry because assessment sequences and graduation rules are already active.',
            'Check the specific school page and ask whether an alternative pathway would be more realistic.',
          ],
        ],
      },
      workflow: {
        title: 'Start-date planning workflow',
        subtitle:
          'Match the student, the school, and the timeline before applying.',
        steps: [
          {
            title: 'Step 1: Set the target',
            items: [
              'Preferred state or city',
              'Target year level',
              'Preferred intake term',
              'Direct entry or preparation pathway',
            ],
          },
          {
            title: 'Step 2: Check feasibility',
            items: [
              'School places and deadlines',
              'English and academic evidence',
              'Accommodation and welfare timing',
              'First-year cost and payment dates',
            ],
          },
          {
            title: 'Step 3: Build the timeline',
            items: [
              'Application submission date',
              'Offer and acceptance window',
              'Visa and OSHC dates',
              'Arrival, orientation, and first day',
            ],
          },
        ],
        footer: {
          text: 'Search by year level, intake, English pathway, and accommodation before the timeline gets tight.',
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
          question: 'Can my child start school in any term?',
          paragraphs: [
            'Not always. Some year levels and schools are flexible, but others restrict entry to particular terms. Senior school, boarding, English preparation, and welfare arrangements can all limit the practical intake options.',
          ],
        },
        {
          question: 'Is Term 1 the best intake?',
          paragraphs: [
            'Often, yes, especially for students starting a new year level or senior pathway. But Term 3 can be a good option for some students, particularly when it lines up with family timing, English preparation, or a different academic calendar.',
          ],
        },
        {
          question: 'Can my child enter Year 11 mid-year?',
          paragraphs: [
            'Sometimes, but it is school-specific and should be checked carefully. Year 11 is the start of senior study in many systems, so the student may miss important subject foundations if they start too late.',
          ],
        },
        {
          question: 'Should my child repeat a year in Australia?',
          paragraphs: [
            'It can be sensible for some students, especially if it gives them time to build English, adjust to the curriculum, and enter senior years with confidence. It should not be treated as failure. It is a pathway decision.',
          ],
        },
        {
          question:
            'For agents: what timing details should I send parents?',
          paragraphs: [
            'Send the target year level, preferred intake, application deadline, English evidence required, expected offer timing, welfare and accommodation dates, OSHC start date, visa planning window, arrival date, orientation date, and backup intake if the first option is not realistic.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Compare timing alongside school type, fees, accommodation, subject choice, English readiness, and pathway fit.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
    {
      slug: 'english-requirements',
      title: 'English Entry Requirements',
      description:
        'Check whether the student is ready for direct entry or needs English preparation before the target intake.',
      image: GUIDE_IMAGES['english-requirements'].card,
    },
  ],
  cta: {
    heading: 'Find schools that match the right start date',
    text: 'Search and compare government-registered Australian schools accepting international students, including year levels, intake dates, English requirements, accommodation, fees, and support. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
