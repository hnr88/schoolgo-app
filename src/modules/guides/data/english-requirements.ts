import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const englishRequirementsGuide: GuidePageData = {
  slug: 'english-requirements',
  meta: {
    title: 'English Entry Requirements | SchoolGo',
    description:
      'A plain-language guide to English entry requirements for international students applying to Australian schools, including tests, school-specific score rules, English preparation, and SchoolGo search filters. Free on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'English Entry Requirements',
    title: 'English entry requirements',
    subtitle:
      'A practical guide to how Australian schools assess English readiness, why accepted tests and minimum scores vary, and how to use SchoolGo to search by the exact test and score your child already has.',
    image: GUIDE_IMAGES['english-requirements'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'evidence', label: 'Evidence' },
      { id: 'variation', label: 'Why It Varies' },
      { id: 'preparation', label: 'Preparation' },
      { id: 'schoolgo-search', label: 'SchoolGo Search' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'There is no single English score for Australian schools',
      image: GUIDE_IMAGES['english-requirements'].sections[0],
      imageAlt: 'Student studying English at a desk with books',
      reverse: false,
      paragraphs: [
        'English entry requirements are one of the most confusing parts of choosing an Australian school. Different schools accept different tests, and minimum scores can change by year level, school sector, senior pathway, state, program type, and whether the student is applying for direct entry or English preparation first.',
        'For that reason, families should not rely on a general score table found online. A score that is enough for one school may not be enough for another. A score that works for junior secondary may not work for senior secondary. A test accepted by one school may not be accepted by a different school or program.',
        'SchoolGo handles this by putting the specific English requirements on each school profile and by letting parents search by test and score. If your child already has a result, you can search for schools that match that evidence instead of guessing from a broad national guide.',
      ],
      table: {
        headers: ['What parents ask', 'Better question', 'Why it matters'],
        rows: [
          [
            'What score does my child need?',
            'Which schools accept my child’s test and score for this year level?',
            'Schools set their own accepted evidence and thresholds.',
          ],
          [
            'Which test is best?',
            'Which tests are accepted by the schools on our shortlist?',
            'A familiar test is not useful if the target school does not accept it.',
          ],
          [
            'Can my child enter directly?',
            'Would direct entry or English preparation create a safer pathway?',
            'Direct entry is not always the best academic or emotional choice.',
          ],
          [
            'Is English the only requirement?',
            'Does the student also meet academic, age, year level, and welfare requirements?',
            'English is only one part of school admissions readiness.',
          ],
        ],
      },
    },
    {
      type: 'content',
      id: 'evidence',
      heading: 'Schools may accept different kinds of English evidence',
      image: GUIDE_IMAGES['english-requirements'].sections[1],
      imageAlt: 'Students preparing for English language tests',
      reverse: true,
      paragraphs: [
        'Australian schools do not all use one English assessment method. Some ask for an accepted external English test. Some accept evidence that the student has studied in English for a certain period. Some require completion of an intensive English or high school preparation program. Some may use interviews, internal placement checks, or school-specific assessments to understand readiness.',
        'The evidence required may also change with the student’s age and year level. Younger students may be assessed differently from older students, while senior secondary students often need stronger academic English because they are entering subjects that lead to graduation and university pathways.',
        'Agents should collect the student’s English evidence early and check it against the target school before recommending the school. Parents should keep copies of test results, school reports, English-medium schooling evidence, preparation program records, and any school communication about English conditions.',
      ],
      table: {
        headers: ['Evidence type', 'What it means', 'What to confirm'],
        rows: [
          [
            'External English test',
            'A formal test result from an accepted provider.',
            'Whether the school accepts that test, whether the score is high enough, and whether the result is still valid.',
          ],
          [
            'English-medium schooling',
            'Evidence that the student studied school subjects in English before applying.',
            'Whether the school accepts this evidence and what documents are required.',
          ],
          [
            'English preparation program',
            'A pathway program that builds academic English before mainstream school entry.',
            'Whether completion leads to the target school, and what level the student must reach.',
          ],
          [
            'Interview or placement check',
            'A school conversation or assessment to understand readiness.',
            'Whether it is used for support planning, admission, class placement, or subject advice.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'variation',
      heading: 'Why requirements vary so much',
      paragraphs: [
        'English requirements are not random. Schools adjust them because the language demands of a student in Year 7 are different from the demands of a student entering Year 11. A student joining mainstream classes immediately needs different readiness from a student entering a preparation pathway first.',
        'Requirements can also change because of subject choice, senior certificate rules, school support capacity, the student’s academic background, and whether the student has already studied in English. This is why SchoolGo shows requirements at the school level rather than pretending that one rule applies everywhere.',
      ],
      link: {
        label: 'Search by test and score',
        href: '/search',
      },
      features: [
        {
          emoji: '🎓',
          title: 'Year level',
          description:
            'Senior students usually need stronger academic English because assessment, subject choice, and graduation timelines are less flexible.',
        },
        {
          emoji: '📋',
          title: 'Program type',
          description:
            'Mainstream entry, English preparation, study abroad, boarding, specialist programs, and senior pathways may each have different expectations.',
        },
        {
          emoji: '🤝',
          title: 'School support',
          description:
            'A school with stronger English support may be able to accept a different readiness profile from a school with limited support capacity.',
        },
        {
          emoji: '📄',
          title: 'Evidence rules',
          description:
            'Some schools accept several types of English evidence, while others are stricter about test type, result age, or documentation.',
        },
      ],
    },
    {
      type: 'content',
      id: 'preparation',
      heading: 'English preparation can be the smarter first step',
      paragraphs: [
        'Parents often see English preparation as a delay, but it can be the safer pathway. Academic English is not just everyday conversation. Students need to understand teacher instructions, write essays, explain reasoning in mathematics and science, participate in group work, prepare presentations, complete research tasks, and ask for help confidently.',
        'A preparation pathway can help a student settle into Australian classroom routines before the pressure of mainstream assessment begins. It can also reduce the risk of entering too high a year level too quickly and then struggling with both language and content at the same time.',
        'For senior students, the decision is especially important. If a student is close to the required level but not yet ready for the academic load of Years 11 and 12, a preparation period or earlier entry year may protect the student’s university pathway.',
      ],
      callout: {
        title: 'SchoolGo tip',
        text: 'Do not treat English preparation as a failure. For many students, it is the step that makes the mainstream school placement successful.',
      },
    },
    {
      type: 'content',
      id: 'schoolgo-search',
      heading: 'Use SchoolGo to search by test and score',
      paragraphs: [
        'Because every school can set different English rules, the safest workflow is to start with the student’s actual evidence. On SchoolGo, parents can use the comprehensive school search function to search by test and score, then open each school’s specific page to confirm the accepted tests, score rules, year level requirements, English preparation pathways, and any special notes.',
        'This is especially useful for agents managing multiple families. Instead of checking PDFs manually, agents can start with a filtered SchoolGo list and then confirm the details on each school profile before sending a shortlist through WeChat and WhatsApp.',
      ],
      workflow: {
        title: 'English match workflow',
        subtitle:
          'Start with the evidence your child already has, then shortlist schools that match.',
        steps: [
          {
            title: 'Step 1: Enter the evidence',
            items: [
              'Choose the test or evidence type',
              'Add the score or result level',
              'Select the target year level',
              'Add state, city, or school type if needed',
            ],
          },
          {
            title: 'Step 2: Review matched schools',
            items: [
              'Open each school profile',
              'Check the accepted evidence',
              'Compare direct entry and preparation options',
              'Confirm year level and intake timing',
            ],
          },
          {
            title: 'Step 3: Build the shortlist',
            items: [
              'Keep schools where English matches',
              'Remove schools with uncertain requirements',
              'Compare fees and accommodation',
              'Prepare documents before applying',
            ],
          },
        ],
        footer: {
          text: 'Search by test and score before you spend time on schools your child cannot enter yet.',
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
            'Why does this guide not list every test and score?',
          paragraphs: [
            'Because a general table can quickly become misleading. Schools accept different tests, update requirements, and set different rules by year level and program. The most accurate place to check is the individual school profile on SchoolGo.',
          ],
        },
        {
          question: 'Can my child apply without an English test?',
          paragraphs: [
            'Sometimes, but it depends on the school and program. Some schools accept other evidence, such as previous study in English or completion of a preparation program. Others require a formal test result. Check the specific school page before assuming a test is optional.',
          ],
        },
        {
          question: 'Does a higher English score guarantee admission?',
          paragraphs: [
            'No. English is only one requirement. Schools may also consider academic results, year level readiness, age, available places, subject fit, welfare arrangements, accommodation, and whether the student can complete the program successfully.',
          ],
        },
        {
          question:
            'Is English preparation better than direct entry?',
          paragraphs: [
            'It depends on the student. Direct entry may be right for a student who is already ready for mainstream academic work. English preparation may be better for a student who needs time to build classroom confidence, academic vocabulary, writing skills, and study habits before joining mainstream classes.',
          ],
        },
        {
          question: 'What should agents send to parents?',
          paragraphs: [
            'Send a short explanation of which schools match the student’s current English evidence, which schools require more English preparation, and which schools should be removed from the shortlist. Include the school profile details rather than a generic national score table.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'high-school-preparation',
      title: 'Document Checklist',
      description:
        'Prepare school reports, translations, English evidence, passport details, and application documents before applying.',
      image: GUIDE_IMAGES['high-school-preparation'].card,
    },
    {
      slug: 'student-visa',
      title: 'The Application Process',
      description:
        'Understand the steps from school shortlist to application, offer, payment, visa documents, and arrival planning.',
      image: GUIDE_IMAGES['student-visa'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Compare English readiness alongside year level, fees, accommodation, subject choice, location, and pathway fit.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
  ],
  cta: {
    heading: 'Find schools that match your child’s English evidence',
    text: 'Use SchoolGo’s comprehensive school search function to search by test and score, then open each school page to confirm accepted evidence, year level rules, English preparation options, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
