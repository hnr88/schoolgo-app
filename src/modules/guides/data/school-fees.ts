import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const schoolFeesGuide: GuidePageData = {
  slug: 'school-fees',
  meta: {
    title: 'Understanding School Fees | SchoolGo',
    description:
      'A plain-language guide to Australian school fees for international students, including tuition, application fees, uniforms, homestay, boarding, health cover, and payment timing. Free on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'School Fees',
    title: 'Understanding Australian school fees',
    subtitle:
      'A plain-language guide to tuition, deposits, uniforms, health cover, accommodation, and the other costs families should plan for before applying to an Australian school.',
    image: GUIDE_IMAGES['school-fees'].hero,
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'tuition', label: 'Tuition' },
      { id: 'extras', label: 'Extra Costs' },
      { id: 'payment', label: 'Payment Timing' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'The fee you see first is rarely the full cost',
      image: GUIDE_IMAGES['school-fees'].sections[0],
      imageAlt: 'Financial planning documents and calculator',
      reverse: false,
      paragraphs: [
        'When families compare Australian schools, the first number they usually see is annual tuition. That number matters, but it is only one part of the budget. A realistic first-year estimate also includes application and enrolment charges, uniforms, books or devices, school camps, health cover, visa costs, and accommodation if your child will not live with a parent or relative.',
        'Government school fees are usually published centrally by each state or territory. For example, 2026 annual tuition ranges from AUD 13,259 to AUD 19,760 in Victorian government schools, AUD 15,176 to AUD 18,776 in Queensland government schools, AUD 12,960 to AUD 17,440 in South Australian government schools, and AUD 14,575 to AUD 18,980 in Western Australian government schools, depending on year level and program.',
        'Non-government schools vary more widely. A Catholic system example in western Sydney lists 2026 full-fee overseas secondary annual fees from AUD 22,293 in Years 7 to 8 to AUD 25,632 in Year 12, while one Victorian independent boarding school example lists international day fees above AUD 50,000 per year in secondary years before boarding is added.',
        'The goal is not to find the cheapest school. It is to understand the whole cost clearly enough that your family can choose the right school with confidence, without surprises after the offer arrives.',
      ],
      table: {
        headers: [
          'Budget line',
          'Typical pattern',
          'When families pay',
          'What to check',
        ],
        rows: [
          [
            'Tuition',
            'Annual school fee, usually higher in senior years',
            'Before enrolment, then by semester, term, or annual invoice',
            'Whether English preparation, senior exams, or special programs are included',
          ],
          [
            'Application and enrolment',
            'One-time processing and place-confirmation charges',
            'At application or acceptance',
            'Whether fees are refundable if the visa is refused',
          ],
          [
            'School extras',
            'Uniforms, books, devices, camps, excursions, calculators, subject costs',
            'Before arrival and throughout the year',
            'Whether the school requires a specific laptop or has extra senior subject fees',
          ],
          [
            'Accommodation',
            'Homestay by week, or boarding by term, semester, or year',
            'Usually before arrival and then in advance',
            'Whether holidays, airport pickup, meals, and placement fees are included',
          ],
          [
            'Visa and health cover',
            'Student visa fee plus Overseas Student Health Cover',
            'Before visa lodgement',
            'Whether cover runs for the full visa period, not just the school year',
          ],
        ],
      },
    },
    {
      type: 'content',
      id: 'tuition',
      heading: 'Tuition depends on school type, year level, and program',
      image: GUIDE_IMAGES['school-fees'].sections[1],
      imageAlt: 'Parent reviewing school fee schedule',
      reverse: true,
      paragraphs: [
        'In most Australian school systems, senior secondary years cost more than primary and junior secondary years. This reflects more specialised subjects, senior certification requirements, smaller subject groups, exam administration, and extra academic support. Some schools also charge more for specialist arts programs, International Baccalaureate programs, English preparation, or English as an Additional Language support.',
        'Government schools usually provide the clearest published fee tables. Victoria lists standard 2026 annual fees of AUD 13,259 for primary, AUD 17,607 for Years 7 to 10, and AUD 19,760 for Years 11 to 12, while Western Australia lists AUD 14,575 for primary, AUD 17,286 for lower secondary, and AUD 18,980 for upper secondary.',
        'Catholic and independent schools set their own fee schedules. Some publish a single international fee, while others separate tuition, local school service fees, building levies, administration charges, English support, examination fees, and boarding. This makes side-by-side comparison difficult unless every line item is placed in the same budget table.',
      ],
      table: {
        headers: ['School type', 'What the research shows', 'Parent takeaway'],
        rows: [
          [
            'Government schools',
            'Published state schedules commonly sit in the low-to-high teens for annual tuition, with senior years usually highest. ACT public schools list AUD 14,500 for Years 7 to 10 and AUD 16,200 for Years 11 to 12 in 2026.',
            'Usually the easiest option to budget, but school choice, location, and welfare rules may be more constrained.',
          ],
          [
            'Catholic schools',
            'One NSW Catholic system example lists full-fee overseas annual fees from AUD 22,293 for Years 7 to 8 to AUD 25,632 for Year 12, plus a new-student enrolment fee.',
            'Often a middle budget position between government and higher-fee independent schools, but each system and school differs.',
          ],
          [
            'Independent day schools',
            'Independent examples show much wider variation. One Victorian independent school lists 2026 international day fees of AUD 52,884 in Years 7 to 9 and AUD 56,628 in Years 10 to 12, before boarding is added.',
            'Look beyond the headline tuition and ask whether levies, English support, camps, devices, and exams are included.',
          ],
          [
            'Boarding schools',
            'A Victorian independent boarding example lists 2026 international day fees of AUD 52,884 to AUD 56,628 for Years 7 to 12, with boarding adding AUD 36,788 per year.',
            'Boarding can be the most structured option, but families should compare combined tuition and boarding, not tuition alone.',
          ],
        ],
      },
      callout: {
        title: 'SchoolGo tip',
        text: 'When comparing schools, create a first-year total and an ongoing annual total. The first-year number includes one-time application, enrolment, placement, and setup costs. The ongoing number focuses on tuition, accommodation, health cover, uniforms, devices, excursions, and subject costs.',
      },
    },
    {
      type: 'split',
      id: 'extras',
      heading: 'What sits outside tuition?',
      paragraphs: [
        'Most schools are clear about tuition, but the extra costs are where family budgets often drift. Some are compulsory, some are optional, and some depend on the year level or subject choices. Agents should separate these lines clearly when explaining an offer through WeChat and WhatsApp.',
        'Victorian government schools list non-tuition estimates including AUD 300 to AUD 950 per year for uniforms, AUD 400 to AUD 900 for camps and excursions, and AUD 500 to AUD 1,250 for electronic device costs. South Australia lists examples including AUD 150 for stationery, AUD 250 to AUD 600 for uniforms, AUD 50 to AUD 100 for excursions, and calculator costs in senior years.',
      ],
      link: {
        label: 'Compare school costs on SchoolGo',
        href: '/search',
      },
      features: [
        {
          emoji: '📝',
          title: 'Application and acceptance charges',
          description:
            'Application fees are often non-refundable. ACT public schools list a AUD 265 application fee, while Victoria lists a AUD 302 application fee.',
        },
        {
          emoji: '🏠',
          title: 'Homestay and placement',
          description:
            'Queensland lists 2026 homestay at AUD 382 per week plus a AUD 476 placement fee, while Victoria lists homestay at AUD 290 to AUD 440 per week and an accommodation placement fee of AUD 319.',
        },
        {
          emoji: '🏥',
          title: 'Health cover and visa costs',
          description:
            'International students and their dependants must maintain Overseas Student Health Cover while in Australia, and Study Australia states that student visa fees are from AUD 2,000 per visa application from 1 July 2025 unless exempt.',
        },
        {
          emoji: '🎓',
          title: 'Senior certificates and specialist subjects',
          description:
            'Some senior-year subjects and certificates carry extra costs. Victoria lists possible VET tuition fees of AUD 49 to AUD 1,739 per subject per year plus material fees, while South Australia lists SACE student fees for Stage 1 and Stage 2 studies.',
        },
      ],
    },
    {
      type: 'content',
      id: 'payment',
      heading: 'Payment timing matters for the visa process',
      paragraphs: [
        'Families usually need to pay part of the school cost before the documents needed for a student visa are issued. This can feel uncomfortable, especially when the student is still waiting for visa approval, so it is important to read the refund rules before paying.',
        'NSW government school terms state that new students pay the amount specified on the invoice, capped at no more than 50% of total course tuition before starting, while students applying for the two-year senior secondary program pay tuition in three instalments. The same terms state that application fees, airport pick-up fees, and accommodation placement fees are not refundable.',
        'Victoria invoices international students in advance once per semester and warns that non-payment can lead to expulsion and reporting to the Department of Home Affairs, which may affect the student visa. Families accepting a Victorian government school offer also sign a declaration that they have sufficient funds to pay tuition for the period of enrolment.',
        'Private school timing can be stricter. One Victorian independent boarding school example requires annual international tuition to be paid in full by 31 October of the year before commencement, with new international student fees due by 15 August to qualify for a visa.',
      ],
      callout: {
        title: 'Question to ask before accepting an offer',
        text: 'If the visa is refused, what is refunded, what is retained, how quickly is the refund processed, and who receives the money? Ask this before payment, not after a problem occurs.',
      },
    },
    {
      type: 'accordion',
      id: 'faqs',
      heading: 'Frequently asked questions',
      items: [
        {
          question: 'How much should we budget for the first year?',
          paragraphs: [
            'Start with tuition, then add one-time application or enrolment fees, health cover, visa costs, accommodation, uniforms, devices, books, excursions, and flights. Government school tuition may be in the low-to-high teens depending on state and year level, while many non-government schools cost more. Boarding can add tens of thousands of dollars per year.',
            'For planning, create two numbers: first-year total and continuing annual total. The first-year total will usually be higher because of setup costs.',
          ],
        },
        {
          question: 'Are Australian government schools always cheaper?',
          paragraphs: [
            'Often, yes, especially compared with high-fee independent schools. But the lowest tuition is not always the best fit. Families should also consider location, subject availability, English support, accommodation options, welfare rules, and the pathway from school to university and career.',
          ],
        },
        {
          question: 'What costs are most often forgotten?',
          paragraphs: [
            'The most commonly missed costs are uniforms, laptops or tablets, school camps, senior subject charges, English support, homestay placement fees, holiday accommodation, health cover for the full visa period, and refund administration charges if plans change.',
          ],
        },
        {
          question: 'Will fees increase while my child is enrolled?',
          paragraphs: [
            'Usually, yes. State and school fee schedules commonly say tuition and other charges are reviewed annually and may change. Build a buffer into your budget, especially for a multi-year plan from Year 9 or Year 10 through to Year 12.',
          ],
        },
        {
          question:
            'For agents: how should I explain school fees to parents?',
          paragraphs: [
            'Do not send only the tuition number. Send a simple fee stack: tuition, application or enrolment, accommodation, health cover and visa, school extras, and optional items. Then separate the first-year total from the ongoing annual total. This prevents parents from feeling surprised later and builds trust in your advice.',
            'Use SchoolGo to compare schools side by side before recommending a shortlist. A lower-fee school may still be the wrong recommendation if the accommodation, English support, city, intake, or pathway does not fit the student.',
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
        'Homestay, boarding, and family arrangements for international students at Australian high schools.',
      image: GUIDE_IMAGES['accommodation'].card,
    },
    {
      slug: 'school-types',
      title: 'Government, Catholic & Independent Schools',
      description:
        'Understand the major school sectors and how fees, admissions, and support can differ.',
      image: GUIDE_IMAGES['school-types'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Compare year levels, English entry requirements, city, accommodation, and pathway fit before applying.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
  ],
  cta: {
    heading: 'Ready to compare real school costs?',
    text: 'Search and compare every government-registered Australian school accepting international students, including fees, boarding availability, English entry requirements, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
