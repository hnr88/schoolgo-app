export interface MarketingNavLabels {
  findSchools: string;
  howItWorks: string;
  forAgents: string;
  forSchools: string;
  logIn: string;
  getStarted: string;
  openMenu: string;
  closeMenu: string;
}

export interface MarketingNavProps {
  labels: MarketingNavLabels;
}

export interface NavbarProps {
  variant?: 'dashboard' | 'marketing';
}
