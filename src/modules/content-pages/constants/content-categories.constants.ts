import type { ContentCategory } from '@/modules/content-pages/types/content-pages.types';

export const contentCategories: ContentCategory[] = [
  { slug: 'admissions', label: 'Admissions', description: 'Application steps, documents, interviews, decisions, and enrolment timing.' },
  { slug: 'fees', label: 'Fees and funding', description: 'Tuition, first-year costs, scholarships, refunds, and payment planning.' },
  { slug: 'international', label: 'International families', description: 'Visa, English, relocation, health cover, and arrival support.' },
  { slug: 'curriculum', label: 'Curriculum', description: 'Australian curriculum, IB pathways, subject choices, and language support.' },
  { slug: 'student-life', label: 'Student life', description: 'Activities, wellbeing, parent community, transport, meals, and daily routines.' },
  { slug: 'boarding', label: 'Boarding', description: 'Boarding, homestay, weekend routines, safety, and accommodation fit.' },
  { slug: 'agents', label: 'Agents', description: 'Partner workflows, training, compliance, and application pipeline examples.' },
  { slug: 'schools', label: 'Schools', description: 'School profile quality, admissions workflows, pricing, and growth content.' },
  { slug: 'pathways', label: 'Pathways', description: 'High school, university, careers, prerequisites, and outcomes.' },
  { slug: 'events', label: 'Events', description: 'Open days, virtual tours, webinars, orientation, and family briefings.' },
  { slug: 'company', label: 'Company', description: 'About SchoolGo, contact, data quality, safety, and partnerships.' },
  { slug: 'school-search', label: 'School search', description: 'Search, compare, filters, sectors, specialist programs, and enrolment status.' },
];
