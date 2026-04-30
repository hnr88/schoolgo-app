import type {
  ActionItem,
  ActivityEvent,
  Deadline,
  PipelineCard,
} from '@/modules/dashboard/types/dashboard.types';

export const DEMO_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'documents-requested',
    text: '3 applications need documents uploaded',
    href: '/dashboard/applications',
    priority: 'high',
  },
  {
    id: 'offers-ready',
    text: '2 schools have responded - review offers',
    href: '/dashboard/applications',
    priority: 'high',
  },
  {
    id: 'acceptance-expiring',
    text: '1 offer acceptance expires in 2 days',
    href: '/dashboard/applications',
    priority: 'urgent',
  },
];

export const DEMO_PIPELINE_CARDS: PipelineCard[] = [
  { labelKey: 'activeStudents', count: 24, change: 2, href: '/dashboard/students' },
  { labelKey: 'appsInProgress', count: 38, change: -1, href: '/dashboard/applications' },
  { labelKey: 'offersReceived', count: 5, change: 3, href: '/dashboard/applications' },
  { labelKey: 'enrolledThisTerm', count: 3, change: 1, href: '/dashboard/applications' },
];

export const DEMO_ACTIVITY: ActivityEvent[] = [
  {
    id: 'status-change',
    type: 'status_change',
    text: "Scotch College updated Park Min-ho to 'Under Review'",
    timestamp: '2 hours ago',
    href: '/dashboard/applications',
  },
  {
    id: 'test-results',
    type: 'test_results',
    text: 'AEAS results received for Kim Soo-jin - Score: 78',
    timestamp: '5 hours ago',
    href: '/dashboard/students',
  },
  {
    id: 'message',
    type: 'message',
    text: 'New message from Brighton Secondary re: Tanaka Yuki',
    timestamp: 'yesterday',
    href: '/dashboard/messages',
  },
  {
    id: 'submitted',
    type: 'application_submitted',
    text: 'Application submitted: Nguyen Duc to Doncaster SC',
    timestamp: 'yesterday',
    href: '/dashboard/applications',
  },
  {
    id: 'offer-made',
    type: 'offer_made',
    text: 'Brisbane Grammar made an offer to Park Min-ho',
    timestamp: '2 days ago',
    href: '/dashboard/applications',
  },
  {
    id: 'documents',
    type: 'document_requested',
    text: 'Melbourne Grammar requested documents for Park Min-ho',
    timestamp: '3 days ago',
    href: '/dashboard/applications',
  },
  {
    id: 'offer-accepted',
    type: 'offer_accepted',
    text: 'Offer accepted: Li Wei at Caulfield Grammar',
    timestamp: '4 days ago',
    href: '/dashboard/applications',
  },
];

export const DEMO_DEADLINES: Deadline[] = [
  {
    id: 'offer-acceptance',
    date: '25 Apr',
    label: 'Offer acceptance: Park Min-ho',
    description: 'at Brisbane Grammar',
    urgency: 'urgent',
    href: '/dashboard/applications',
  },
  {
    id: 'oshc-payment',
    date: '30 Apr',
    label: 'OSHC payment: Kim Soo-jin',
    description: '',
    urgency: 'high',
    href: '/dashboard/students',
  },
  {
    id: 'term-deadline',
    date: '1 Jun',
    label: 'Term 3 intake deadline',
    description: '(VIC government)',
    urgency: 'normal',
    href: '/dashboard/applications',
  },
  {
    id: 'passport-renewal',
    date: '15 Jun',
    label: 'Passport renewal: Tanaka Yuki',
    description: '',
    urgency: 'normal',
    href: '/dashboard/students',
  },
];
