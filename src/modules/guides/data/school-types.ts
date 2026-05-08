import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const schoolTypesGuide: GuidePageData = {
  slug: 'school-types',
  meta: {
    title: 'Government, Catholic & Independent Schools | SchoolGo',
    description:
      'A plain-language guide to government, Catholic, and independent Australian schools for international families, including fees, admissions, culture, support, accommodation, and how to compare school sectors on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'Government, Catholic & Independent Schools',
    title: 'Government, Catholic & independent schools',
    subtitle:
      'A practical guide to the three main Australian school sectors, how they differ for international students, and how parents and agents can compare sector fit on SchoolGo before building a shortlist.',
    image: GUIDE_IMAGES['school-types'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'government', label: 'Government' },
      { id: 'catholic', label: 'Catholic' },
      { id: 'independent', label: 'Independent' },
      { id: 'compare', label: 'Compare' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'School sector is not a ranking system',
      image: GUIDE_IMAGES['school-types'].sections[0],
      imageAlt: 'Australian school building with students in the courtyard',
      reverse: false,
      paragraphs: [
        'International families often ask which sector is best: government, Catholic, or independent. The better question is which sector, and which individual school, fits the student’s English level, year level, budget, accommodation needs, subject goals, personality, and long-term pathway.',
        'Australia has strong schools across all three sectors. Sector can affect fees, admissions process, school culture, religious identity, subject choice, international student support, homestay or boarding options, and how much flexibility a school has in designing programs for different students.',
        'Parents should compare sectors as part of the shortlist, not as a simple hierarchy. A government school may be the right choice for one student because of location and value. A Catholic school may suit another because of community and values. An independent school may suit another because of boarding, specialist programs, subject choice, or a particular educational philosophy.',
      ],
      table: {
        headers: ['Sector', 'What it means', 'Often attractive for', 'What to confirm'],
        rows: [
          [
            'Government',
            'Public schools managed through state or territory education systems.',
            'Families seeking value, local community, state curriculum, and a broad school network.',
            'Which schools accept international students, approved accommodation, year levels, intakes, and English pathway rules.',
          ],
          [
            'Catholic',
            'Non-government schools connected to Catholic education systems or Catholic communities.',
            'Families seeking values-based education, community structure, and often moderate private-school fees.',
            'Religious education expectations, fees, international places, support, accommodation, and school culture.',
          ],
          [
            'Independent',
            'Non-government schools with more autonomous governance and diverse missions.',
            'Families seeking boarding, specialist programs, particular philosophies, single-sex options, or wider co-curricular choice.',
            'Total cost, entry selectivity, boarding or homestay, English support, subject range, and senior pathway fit.',
          ],
        ],
      },
    },
    {
      type: 'split',
      id: 'government',
      heading: 'Government schools: public education with state-based rules',
      paragraphs: [
        'Government schools are public schools run through state or territory education systems. For international students, the application process may be centralised through a state international education program, and not every public school will be available to every international applicant.',
        'Government schools can be attractive because they often provide strong value, local community experience, and access to a wide network of schools across cities and regional areas. They may also have specific rules around year level, English evidence, approved carers, homestay, and which schools can accept international students.',
      ],
      link: {
        label: 'Read the school system guide',
        href: '/guides/choose-a-school',
      },
      features: [
        {
          emoji: '🏛️',
          title: 'Centralised process',
          description:
            'Some government programs manage international applications through a state-level process rather than through each school separately.',
        },
        {
          emoji: '🏫',
          title: 'School availability',
          description:
            'Families should check which government schools are available for international students, which year levels are open, and whether places are available.',
        },
        {
          emoji: '🏠',
          title: 'Accommodation rules',
          description:
            'Younger students may have stricter living arrangement rules. Homestay and welfare arrangements should be checked before applying.',
        },
        {
          emoji: '🛤️',
          title: 'Pathway fit',
          description:
            'Check senior subjects, English support, intakes, specialist programs, and whether the school fits the student’s university direction.',
        },
      ],
    },
    {
      type: 'content',
      id: 'catholic',
      heading: 'Catholic schools: values-based communities with their own culture',
      image: GUIDE_IMAGES['school-types'].sections[1],
      imageAlt: 'University campus showcasing different educational pathways',
      reverse: true,
      paragraphs: [
        'Catholic schools are part of the non-government sector. Many are connected to Catholic education systems, dioceses, or religious traditions, and they often combine academic learning with a strong focus on community, values, service, and student care.',
        'Families do not always need to be Catholic to consider a Catholic school, but they should understand the school’s identity. Religious education, school liturgies, service activities, and community expectations may be part of school life. The level of formality and religious practice can vary by school.',
        'For international students, Catholic schools may offer a balance between community feel, private-school structure, and fees that may be lower than some independent schools. As always, the individual school matters more than the label. Parents should compare English support, subject choice, accommodation, welfare, and how comfortable the student will feel in the community.',
      ],
      table: {
        headers: ['Question', 'Why it matters', 'What to ask'],
        rows: [
          [
            'Is the school a good cultural fit?',
            'A values-based school community can be supportive, but families should understand the expectations.',
            'What role does religious education and community service play in daily school life?',
          ],
          [
            'Does the school accept international students?',
            'Not every Catholic school has the same international capacity, processes, or support.',
            'Which year levels, intakes, English evidence, and accommodation options are available?',
          ],
          [
            'How does the total cost compare?',
            'Fees can sit between government and independent options, but extras still matter.',
            'What is the first-year total including application, tuition, levies, uniform, device, activities, and accommodation?',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'Do not assume every Catholic school has the same admissions rules or school culture. Compare the individual school profile, not only the sector label.',
      },
    },
    {
      type: 'split',
      id: 'independent',
      heading: 'Independent schools: diverse missions, programs, and price points',
      paragraphs: [
        'Independent schools are highly diverse. Some are faith-based, some are boarding schools, some are single-sex, some are co-educational, some follow a particular educational philosophy, and some have specialist strengths in areas such as music, sport, leadership, technology, languages, or university preparation.',
        'This diversity is useful for international families because the right independent school may offer the exact combination a student needs: boarding, a particular senior pathway, strong co-curricular programs, English support, subject choice, or a more structured school environment.',
      ],
      link: {
        label: 'Compare accommodation options',
        href: '/guides/accommodation',
      },
      features: [
        {
          emoji: '🏡',
          title: 'Boarding and homestay',
          description:
            'Many families consider independent schools because they may offer boarding or established accommodation pathways for international students.',
        },
        {
          emoji: '🎯',
          title: 'Specialist identity',
          description:
            'Some schools have a clear academic, religious, creative, sporting, leadership, or educational philosophy that shapes the student experience.',
        },
        {
          emoji: '📝',
          title: 'Admissions selectivity',
          description:
            'Entry can depend on English evidence, academic reports, interviews, available places, year level timing, and whether the student fits the school program.',
        },
        {
          emoji: '💰',
          title: 'Total cost',
          description:
            'Tuition can vary widely, and boarding, levies, uniforms, devices, activities, trips, and English preparation can change the first-year budget.',
        },
      ],
    },
    {
      type: 'content',
      id: 'compare',
      heading: 'Use SchoolGo to compare sector fit, not just sector name',
      paragraphs: [
        'The safest shortlist compares individual schools across the same decision areas: English requirements, academic fit, year level timing, fees, accommodation, welfare, subject choice, location, and pathway to university. Sector is one filter, but it should not replace the full comparison.',
        'Agents can use SchoolGo to explain the trade-offs clearly to parents. Instead of saying one sector is better, show how each shortlisted school fits the student’s profile, then send a simple comparison through WeChat and WhatsApp.',
      ],
      workflow: {
        title: 'School type comparison workflow',
        subtitle:
          'Filter by sector, then compare the practical details that determine whether the placement will work.',
        steps: [
          {
            title: 'Step 1: Filter the field',
            items: [
              'Choose government, Catholic, or independent',
              'Add state, city, or region',
              'Select year level and school type',
              'Add boarding or homestay needs',
            ],
          },
          {
            title: 'Step 2: Compare real fit',
            items: [
              'English evidence and preparation options',
              'Subject range and senior pathway',
              'Total first-year cost',
              'Welfare, support, and accommodation',
            ],
          },
          {
            title: 'Step 3: Explain the shortlist',
            items: [
              'Show why each school is included',
              'Remove schools with unclear requirements',
              'Confirm documents before applying',
              'Keep a backup option in a different sector',
            ],
          },
        ],
        footer: {
          text: 'Compare sector, fees, English, accommodation, and pathway details before recommending a school.',
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
          question: 'Which school sector is best for international students?',
          paragraphs: [
            'There is no single best sector. The right choice depends on the student’s English level, year level, academic goals, budget, personality, accommodation needs, and preferred city. Compare individual schools rather than assuming one sector is always better.',
          ],
        },
        {
          question: 'Are independent schools always the most expensive?',
          paragraphs: [
            'Independent school fees vary widely, and the total cost depends on more than tuition. Boarding, homestay, uniforms, devices, levies, trips, activities, health cover, and English preparation can all change the budget. Compare the full first-year cost before deciding.',
          ],
        },
        {
          question: 'Can non-Catholic students attend Catholic schools?',
          paragraphs: [
            'Often, yes, but it depends on the school and available places. Families should understand the school’s Catholic identity, religious education expectations, community life, and whether the student would feel comfortable participating respectfully.',
          ],
        },
        {
          question: 'Do government schools offer boarding?',
          paragraphs: [
            'Some government pathways may use homestay or approved welfare arrangements rather than school boarding. Families should check the school profile and state program rules. If boarding is essential, many families also compare independent boarding schools.',
          ],
        },
        {
          question: 'For agents: how should I present school sectors to parents?',
          paragraphs: [
            'Explain sectors as trade-offs, not rankings. Show parents what each shortlisted school gives the student across entry requirements, fees, accommodation, English support, subject choice, welfare, and pathway fit. This builds more trust than recommending a sector label alone.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'Compare tuition, application fees, accommodation, health cover, uniforms, devices, and first-year costs by school.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Build a shortlist around student fit, pathway, location, English readiness, accommodation, and budget.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
    {
      slug: 'term-dates-intakes',
      title: 'The Australian School System Explained',
      description:
        'Understand year levels, school stages, senior certificates, curriculum, and pathway planning before choosing a sector.',
      image: GUIDE_IMAGES['term-dates-intakes'].card,
    },
  ],
  cta: {
    heading: 'Ready to compare school sectors?',
    text: 'Search and compare every government-registered Australian school accepting international students, including school type, fees, English entry requirements, accommodation, year levels, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
