import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const highSchoolPreparationGuide: GuidePageData = {
  slug: 'high-school-preparation',
  meta: {
    title: 'High School Preparation Programs | SchoolGo',
    description:
      'A plain-language guide to High School Preparation programs for international students applying to Australian schools, including when HSP helps, what students study, timing, pathway planning, and SchoolGo search filters. Free on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'High School Preparation Programs',
    title: 'High School Preparation Programs',
    subtitle:
      'A practical guide to when international students should enter a High School Preparation pathway before mainstream Australian school, what they study, and how families can use SchoolGo to find schools with the right preparation options.',
    image: GUIDE_IMAGES['high-school-preparation'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'who-needs-hsp', label: 'Who Needs HSP' },
      { id: 'what-students-study', label: 'What Students Study' },
      { id: 'timing', label: 'Timing' },
      { id: 'schoolgo-search', label: 'SchoolGo Search' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'HSP is a bridge into mainstream Australian school',
      image: GUIDE_IMAGES['high-school-preparation'].sections[0],
      imageAlt: 'Students engaged in classroom activities',
      reverse: false,
      paragraphs: [
        'High School Preparation, often shortened to HSP, is an English and academic transition pathway for international students who are not yet ready to enter mainstream Australian high school directly. It is not just general English. A good HSP pathway helps students learn the language, classroom routines, study habits, subject vocabulary, and confidence they need before they join regular classes.',
        'Parents sometimes feel disappointed when a school recommends preparation first. In many cases, it is the safer pathway. A student who enters mainstream school too early may struggle with assessment, subject content, friendships, teacher instructions, and the speed of classroom discussion all at the same time.',
        'HSP should be considered as part of the school placement plan, not as a separate afterthought. The key question is not only whether the student can enter school. The better question is whether the student can succeed once they arrive.',
      ],
      table: {
        headers: ['Pathway', 'Best for', 'Main benefit', 'What to confirm'],
        rows: [
          [
            'Direct entry',
            'Students already ready for mainstream academic English.',
            'A faster start in the target school and year level.',
            'Accepted English evidence, academic record, year level, subjects, and available places.',
          ],
          [
            'HSP first',
            'Students who need a safer academic and language transition.',
            'More time to build classroom English before mainstream assessment begins.',
            'Whether completion leads to the intended school, program, year level, and intake.',
          ],
          [
            'English evidence review',
            'Students with a test result, English-medium schooling, or previous preparation.',
            'A school can decide whether direct entry, HSP, or another pathway is appropriate.',
            'Use the individual school page because accepted evidence varies by school.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'who-needs-hsp',
      heading: 'Who should consider HSP before mainstream entry?',
      paragraphs: [
        'HSP is usually worth considering when the student is below the direct-entry English requirement, has not studied school subjects in English before, or needs time to understand Australian classroom expectations before moving into mainstream assessment.',
        'It can also help students who are academically capable but quiet, anxious, younger for their year level, or unfamiliar with discussion-based learning. The student may know the content in their first language but still need the academic English needed to show that knowledge in an Australian classroom.',
      ],
      link: {
        label: 'Read the English requirements guide',
        href: '/guides/english-requirements',
      },
      features: [
        {
          emoji: '🗣️',
          title: 'Language readiness',
          description:
            'The student can communicate socially but is not yet ready for essays, reports, presentations, science explanations, or fast classroom discussion.',
        },
        {
          emoji: '📚',
          title: 'Academic transition',
          description:
            'The student needs vocabulary and study routines across subjects such as English, mathematics, science, humanities, arts, and Australian studies.',
        },
        {
          emoji: '🌏',
          title: 'Cultural adjustment',
          description:
            'The student needs time to understand classroom behaviour, teacher expectations, group work, feedback, wellbeing support, and school communication.',
        },
        {
          emoji: '🎓',
          title: 'Senior pathway protection',
          description:
            'For students close to Years 11 and 12, preparation can protect subject choice, confidence, assessment performance, and the pathway from school to university and career.',
        },
      ],
    },
    {
      type: 'content',
      id: 'what-students-study',
      heading: 'What students usually learn in HSP',
      image: GUIDE_IMAGES['high-school-preparation'].sections[1],
      imageAlt: 'Group of international students collaborating on a project',
      reverse: true,
      paragraphs: [
        'HSP usually combines English language development with preparation for real high school tasks. Students practise reading, writing, speaking, listening, grammar, vocabulary, research, note-taking, presentations, group work, and subject-style assessment. The goal is to help students use English to learn, not only learn English as a separate subject.',
        'Many programs introduce language through school subject contexts. A student may learn the vocabulary and text types used in mathematics, science, social studies, literature, Australian studies, health, arts, or technology. This matters because mainstream high school success depends on understanding subject instructions, not simply passing a conversation test.',
        'HSP can also include orientation, wellbeing support, cultural activities, progress checks, reports, and transition planning. These features help schools and families decide when the student is ready to move into mainstream classes.',
      ],
      table: {
        headers: [
          'Learning area',
          'What it helps students do',
          'Why parents should care',
        ],
        rows: [
          [
            'Academic writing',
            'Write paragraphs, essays, reports, explanations, and referenced work.',
            'Writing is central to assessment across English, humanities, science, and senior subjects.',
          ],
          [
            'Classroom communication',
            'Ask questions, follow teacher instructions, join group work, and explain ideas aloud.',
            'A quiet student may understand content but still lose confidence if they cannot participate.',
          ],
          [
            'Subject vocabulary',
            'Use language from mathematics, science, literature, social studies, and Australian school topics.',
            'Subject words can block learning even when the student is strong academically.',
          ],
          [
            'Study routines',
            'Manage homework, assessment dates, feedback, revision, and independent study.',
            'Students need routines before the pressure of mainstream reports and senior subjects begins.',
          ],
          [
            'School life',
            'Understand rules, wellbeing support, friendships, safety, excursions, and school communication.',
            'Settling socially and emotionally can be just as important as language progress.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Do not judge HSP only by duration. Ask what the student will study, how progress is reported, how readiness is assessed, and whether the pathway connects clearly to the target school.',
      },
    },
    {
      type: 'split',
      id: 'timing',
      heading: 'Timing matters, especially before senior school',
      paragraphs: [
        'Families should plan HSP timing early because preparation can affect the student’s mainstream entry date, year level, subject availability, accommodation, visa planning, and total budget. A later start may look faster on paper but can reduce flexibility when the student is close to senior school.',
        'The safest plan is usually to check the student’s current English evidence, shortlist schools that fit the student’s year level and pathway, then confirm whether each school recommends direct entry, HSP first, or another preparation option.',
      ],
      link: {
        label: 'Compare school fit',
        href: '/guides/choose-a-school',
      },
      features: [
        {
          emoji: '📗',
          title: 'Junior secondary',
          description:
            'Students often have more time to adjust before senior subject choices and graduation pathways become urgent.',
        },
        {
          emoji: '📘',
          title: 'Middle secondary',
          description:
            'Preparation can help students enter mainstream classes with stronger study habits before Year 10 or senior planning begins.',
        },
        {
          emoji: '📕',
          title: 'Senior secondary',
          description:
            'Families should be careful. Entry timing, subject sequences, certificate rules, and assessment pressure can make senior entry less flexible.',
        },
        {
          emoji: '📋',
          title: 'Application planning',
          description:
            'Build time for school review, English pathway advice, documents, accommodation, payment dates, and arrival preparation.',
        },
      ],
    },
    {
      type: 'content',
      id: 'schoolgo-search',
      heading: 'Use SchoolGo to find schools with preparation pathways',
      paragraphs: [
        'Because every school can treat English evidence and preparation pathways differently, parents should avoid relying on a single national rule. Use SchoolGo’s comprehensive school search function to search by test and score, then open each school page to check whether the student may enter directly or should complete preparation first.',
        'This is especially useful for agents managing several families at once. Agents can shortlist schools that match the student’s current evidence, explain the pathway clearly through WeChat and WhatsApp, and show parents why HSP may protect the student’s longer-term school, university, and career pathway.',
      ],
      workflow: {
        title: 'HSP placement workflow',
        subtitle:
          'Start with the student’s readiness, then compare direct entry and preparation pathways school by school.',
        steps: [
          {
            title: 'Step 1: Enter what you know',
            items: [
              'Current English evidence',
              'Target year level',
              'Academic reports',
              'Preferred city, state, or school type',
            ],
          },
          {
            title: 'Step 2: Compare pathways',
            items: [
              'Direct entry requirements',
              'HSP or intensive English options',
              'Transition rules into mainstream school',
              'Intake timing and accommodation fit',
            ],
          },
          {
            title: 'Step 3: Build the plan',
            items: [
              'Choose the safest entry pathway',
              'Prepare documents early',
              'Confirm budget and living arrangements',
              'Apply with the right expectations',
            ],
          },
        ],
        footer: {
          text: 'Search by test and score, then confirm the preparation pathway on each school page.',
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
          question: 'Is HSP only for students with weak English?',
          paragraphs: [
            'No. HSP is also useful for students who can communicate in everyday English but are not yet ready for mainstream academic work. The student may need more practice with essays, reports, subject vocabulary, presentations, classroom discussion, or Australian school routines.',
          ],
        },
        {
          question: 'Does completing HSP guarantee entry to a school?',
          paragraphs: [
            'Not always. Some preparation programs are linked to a school or school system, while others prepare students for applications to different schools. Families should confirm the pathway on the specific school page and check whether the student must reach a particular readiness level before moving into mainstream classes.',
          ],
        },
        {
          question: 'Should my child choose HSP or direct entry?',
          paragraphs: [
            'It depends on the student’s English evidence, academic background, age, target year level, confidence, and the schools being considered. Direct entry may suit a student who is ready now. HSP may be better when a safer transition will protect confidence, assessment results, and long-term pathway options.',
          ],
        },
        {
          question: 'Why does this page not list exact test scores?',
          paragraphs: [
            'Because accepted tests and minimum levels vary by school, year level, program type, and pathway. A general table can mislead families. The safer method is to use SchoolGo to search by test and score, then open the school profile to confirm that school’s current rule.',
          ],
        },
        {
          question: 'For agents: how should I explain HSP to parents?',
          paragraphs: [
            'Frame HSP as a pathway decision, not a rejection. Explain that the goal is a successful mainstream placement, not simply the fastest start date. Show parents the student’s current evidence, the target school’s direct-entry expectation, the preparation option, and the likely benefits for confidence, assessment, subject readiness, and longer-term university planning.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'english-requirements',
      title: 'English Entry Requirements',
      description:
        'Understand English evidence, school-specific requirements, preparation pathways, and SchoolGo search by test and score.',
      image: GUIDE_IMAGES['english-requirements'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Compare English readiness alongside year level, fees, accommodation, subject choice, location, and pathway fit.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'Plan for tuition, accommodation, health cover, extras, preparation costs, and first-year budgeting.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
  ],
  cta: {
    heading: 'Find schools that match your child’s readiness',
    text: 'Use SchoolGo’s comprehensive school search function to search by test and score, then open each school page to confirm direct entry rules, preparation pathways, year level timing, accommodation, and fees. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
