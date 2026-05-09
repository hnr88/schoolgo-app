import type { GuidePageData } from '@/modules/guides/types/guides.types';
import { GUIDE_IMAGES } from '@/modules/guides/constants/guide-images.constants';

export const accommodationGuide: GuidePageData = {
  slug: 'accommodation',
  meta: {
    title: 'Where Will My Child Live? — Accommodation Guide | SchoolGo',
    description:
      'A plain-language guide to homestay, school boarding, and family arrangements for international students at Australian high schools. Free on SchoolGo.',
  },
  hero: {
    breadcrumbLabel: 'Accommodation',
    image: GUIDE_IMAGES['accommodation'].hero,
    title: 'Where will my child live in Australia?',
    subtitle:
      'A plain-language guide to homestay, school boarding, and family arrangements — the most common options for international students at Australian high schools.',
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'homestay', label: 'Homestay' },
      { id: 'boarding', label: 'School Boarding' },
      { id: 'faqs', label: 'FAQs' },
    ],
  },
  sections: [
    {
      type: 'content',
      id: 'overview',
      heading: 'Your options at a glance',
      image: GUIDE_IMAGES['accommodation'].sections[0],
      imageAlt: 'Student accommodation building with modern facilities',
      reverse: false,
      paragraphs: [
        'Most international students at Australian high schools live in one of two ways: with a carefully screened Australian host family (called homestay), or in a residential boarding house at their school. A smaller number live with a parent, grandparent, or eligible relative who is already in Australia.',
        'Whichever arrangement you choose, it must be formally approved before your child’s student visa is issued. Australia’s national education laws require your child’s government-registered school to confirm that a safe, supervised living arrangement is in place — every host family, every boarding house, and every nominated carer is checked before your child arrives. This protects your child and gives you peace of mind from day one.',
        'The right accommodation arrangement affects more than just where your child sleeps. It shapes how quickly they improve their English, how well they settle in socially, and how supported they feel day to day. This guide walks through each option so you can make a confident, informed choice.',
      ],
      table: {
        headers: ['Option', 'Who it suits', 'Typical cost (per week)', 'Availability'],
        rows: [
          [
            'Homestay',
            'Most students — immersive, flexible',
            'AUD 370–440 (3 meals/day)',
            'All major cities; Years 9–12 in NSW',
          ],
          [
            'School Boarding',
            'Students wanting structure and full-school care',
            'AUD 1,100–1,800+ (incl. in fees)',
            'Private schools only; limited places',
          ],
          [
            'Living with a parent',
            'Families who can relocate together',
            'Varies (parent’s living costs)',
            'Any year level; all states',
          ],
          [
            'Approved relative',
            'Students with family already in Australia',
            'Varies (private arrangement)',
            'Subject to school and visa approval',
          ],
        ],
      },
    },
    {
      type: 'content',
      id: 'homestay',
      heading: 'Homestay — living with an Australian family',
      image: GUIDE_IMAGES['accommodation'].sections[1],
      imageAlt: 'Comfortable student dormitory room setup',
      reverse: true,
      paragraphs: [
        'Homestay is the most common accommodation choice for international high school students in Australia. Your child lives as part of an Australian family — with their own private bedroom, meals provided, and the rhythms of everyday family life around them. It is the most natural way to improve English outside the classroom and to understand Australian culture firsthand.',
        'Every homestay family is screened before they can host a student. This includes a home inspection, a background check for all adults in the household, and a Working With Children clearance. Your child’s school or an accredited homestay agency manages the placement, monitors the arrangement throughout the year, and is your first point of contact if anything needs attention. No student is placed without this oversight in place.',
        'A standard full-board homestay package — which is required for most under-18 students — includes a furnished private bedroom, breakfast, a packed lunch or dinner, internet, laundry, and guidance on getting to school when they first arrive. Weekly fees typically run between AUD 370 and AUD 440 depending on the city, plus a one-time placement fee (usually around AUD 350–390) paid to the agency. This is separate from your child’s school tuition fees.',
        'If you have a trusted family friend already living in Australia who is willing to host your child, many schools allow parents to nominate their own host family. The school will still vet and approve them before the arrangement is confirmed — the safeguards apply to every placement, not just agency-sourced ones.',
      ],
      callout: {
        title: 'Note for NSW families',
        text: 'In New South Wales, students in Years 7 and 8 are not eligible for school-arranged homestay. Students in these year levels must live with a parent, legal guardian, or an approved direct relative. From Year 9 onwards, all standard options — including homestay — are available.',
      },
    },
    {
      type: 'split',
      heading: 'Arranged by your school — or by a national agency',
      paragraphs: [
        'Most government-registered schools use an accredited homestay agency — the largest in Australia is the Australian Homestay Network (AHN), which provides 24/7 student support, placement insurance, and welfare monitoring. Some schools manage their own homestay programs directly, with dedicated international welfare coordinators who know their student families personally.',
        'SchoolGo school profiles show whether a school offers school-managed homestay, uses an external agency, or requires school boarding. Compare options side by side before you apply.',
      ],
      link: {
        label: 'Compare schools with homestay →',
        href: '/search',
      },
      features: [
        {
          emoji: '🏠',
          title: 'School-managed homestay',
          description:
            'The school selects, screens, and monitors host families directly. Your welfare contact is the school’s own international coordinator.',
        },
        {
          emoji: '🤝',
          title: 'Agency-managed homestay',
          description:
            'A national accredited agency (e.g. AHN) matches and monitors placements. Offers 24/7 support lines and placement continuity if a family situation changes.',
        },
        {
          emoji: '👨‍👩‍👧',
          title: 'Parent-nominated homestay',
          description:
            'You nominate a trusted family friend in Australia to host your child. The school vets and approves them before the placement begins.',
        },
      ],
    },
    {
      type: 'content',
      id: 'boarding',
      heading: 'School boarding — living on campus',
      paragraphs: [
        'Some of Australia’s most respected private schools offer on-campus residential boarding — a fully structured environment where your child lives, studies, eats, and takes part in school life all in one place. For families who want the highest level of oversight and care, boarding is the most comprehensive option available.',
        'In a boarding house, your child lives with other students under the supervision of resident houseparents and dedicated boarding staff. Structured study sessions, all meals, transport, weekend activities, and pastoral care are part of the boarding program. During term time, the school is fully responsible for your child’s welfare — there is always a qualified adult present. Many boarding students describe the friendships they form in the boarding house as among the most important of their lives.',
        'Boarding fees are charged in addition to tuition fees and vary considerably between schools. At premium independent schools in capital cities, combined international tuition and boarding can range from AUD 60,000 to over AUD 90,000 per year. More affordable options exist at regional schools, where combined costs may start from around AUD 45,000–55,000 per year. Boarding places at popular schools can be competitive — enquire early, particularly for entry in Year 7 or Year 10.',
        'Not all schools offer boarding. Use SchoolGo’s search filters to find government-registered schools with boarding available and compare fees side by side before making an enquiry.',
      ],
    },
    {
      type: 'accordion',
      id: 'faqs',
      heading: 'Frequently asked questions',
      items: [
        {
          question:
            'What happens to my child’s accommodation during school holidays?',
          paragraphs: [
            'Homestay families typically do not host students during long school holiday breaks. Most agencies offer a “holiday hold” arrangement that reserves your child’s placement while they travel home or take a holiday. This usually costs around 50% of the normal weekly fee. You’ll need to confirm holiday plans with your homestay agency well in advance — most require at least four weeks’ notice.',
            'Boarding schools close during holidays and students are expected to return home or arrange separate accommodation. Some schools or agencies can help coordinate short-term holiday stays. Discuss holiday arrangements with your school or agent before your child departs so nothing is left to the last minute.',
          ],
        },
        {
          question: 'Who checks on my child while they are in Australia?',
          paragraphs: [
            'Your child’s school is legally required to monitor their welfare and accommodation throughout their enrolment — not just at the start. This includes regular welfare check-ins at least twice per school term. Every government-registered school with international students must have a designated welfare contact your child can approach at any time.',
            'If your child is in homestay managed by an agency, the agency also conducts its own monitoring visits and is available 24/7 for emergencies. You can contact both the school and the agency directly at any time. You will be informed of any welfare concerns — you are always kept in the loop.',
          ],
        },
        {
          question:
            'Can my child live with a relative who is already in Australia?',
          paragraphs: [
            'Yes, in many cases. If your child has a parent, grandparent, aunt, uncle, or sibling who is already legally residing in Australia and is willing to provide accommodation and care, this arrangement can be formally approved. The relative must be at least 21 years old and hold a valid Australian visa for the full duration of your child’s stay.',
            'The school must formally document and approve this arrangement — it is not enough to simply have a relative nearby. Note that cousins do not qualify under Australian regulations. If you are unsure whether a specific relative is eligible, speak with your education agent or the school’s international admissions team.',
          ],
        },
        {
          question:
            'Can a parent travel to Australia and live with their child?',
          paragraphs: [
            'Yes. A parent or legal guardian can apply for a Student Guardian visa (subclass 590), which allows them to live in Australia to provide accommodation and welfare support for their child throughout the schooling period. This visa can be valid for up to five years and is renewable. The guardian is generally not permitted to work in Australia, though limited exceptions apply.',
            'This option is particularly popular for families with younger secondary students (Years 7–8) where homestay may not be available, and for families who want direct parental oversight throughout high school. Factor in the additional cost of the parent’s rent and living expenses — typically AUD 20,000–40,000+ per year depending on the city. Your education agent can advise on the visa application process.',
          ],
        },
        {
          question:
            'For agents: how do I match the right accommodation option to each family?',
          paragraphs: [
            'Start with three questions: How old is the student and what year level are they entering? (NSW Years 7–8 rules out school-arranged homestay.) Does the family have any eligible relatives already in Australia? And is the family’s budget aligned with boarding, or are they expecting homestay-level costs?',
            'For families prioritising English immersion and cultural experience, school-managed or agency homestay is the right fit. For families wanting maximum structure, supervision, and a premium brand name, boarding at a well-known private school is the strongest recommendation. Confirm accommodation availability before lodging an application — homestay supply in Sydney and Melbourne is constrained, and popular boarding schools have waitlists. Use SchoolGo’s school profiles to filter by boarding availability and confirm details before you advise.',
          ],
        },
      ],
    },
  ],
  relatedGuides: [
    {
      slug: 'student-visa',
      title: 'Student Visa Basics',
      description:
        'What parents need to know about the student visa process for children under 18 — welfare letters, health cover, and what happens if your child turns 18 mid-enrolment.',
      image: GUIDE_IMAGES['student-visa'].card,
    },
    {
      slug: 'school-fees',
      title: 'Understanding School Fees',
      description:
        'A clear breakdown of tuition fees, application fees, uniforms, and extras — and how to compare the true cost of different schools side by side on SchoolGo.',
      image: GUIDE_IMAGES['school-fees'].card,
    },
    {
      slug: 'choose-a-school',
      title: 'How to Choose the Right School',
      description:
        'Year levels, English entry requirements, VCE vs IB, boarding availability, and location — compare up to five schools side by side on SchoolGo to find the right fit.',
      image: GUIDE_IMAGES['choose-a-school'].card,
    },
  ],
  cta: {
    heading: 'Ready to find the right school?',
    text: 'Search and compare every government-registered Australian school accepting international students — including boarding availability, fees, English entry requirements, and intake dates. Free, in seven languages.',
    buttonLabel: 'Search Schools',
    buttonHref: '/search',
  },
};
