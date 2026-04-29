export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
}

export interface StepData {
  key: string;
  stepLabel: string;
  title: string;
  description: string;
  comingSoon?: string;
  visual: { title: string; subtitle: string };
}

export interface ParentsFourStepsClientProps {
  steps: StepData[];
  ctaBrowseLabel: string;
  ctaLearnLabel: string;
  ctaBrowseHref: string;
  ctaLearnHref: string;
  badgeTitle: string;
  badgeSubtitle: string;
}

export interface ParentsHeroSearchProps {
  ariaLabel: string;
  buttonLabel: string;
  fields: {
    where: { label: string; value: string };
    yearLevel: { label: string; value: string };
    fees: { label: string; value: string };
  };
}
