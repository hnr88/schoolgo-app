import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  SVGProps,
} from 'react';

export interface DsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dark' | 'trust' | 'featured' | 'link' | null;
  size?: 'sm' | 'md' | 'lg' | 'icon' | null;
  children: ReactNode;
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'selected' | 'soft' | null;
  size?: 'sm' | 'md' | null;
  selected?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export interface CtaLinkProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'dark' | null;
  size?: 'sm' | 'md' | 'lg' | null;
  arrow?: boolean;
  justify?: boolean;
  children: ReactNode;
  className?: string;
}

export interface DsFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export interface DsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export interface DsSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'brand' | 'trust' | 'featured';
  children: ReactNode;
}

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface FeatureCardProps {
  icon: IconComponent;
  title: ReactNode;
  description: ReactNode;
  iconTone?: 'brand' | 'trust';
  size?: 'sm' | 'md';
  className?: string;
}

export interface SchoolCardProps {
  name: string;
  location: string;
  photoUrl?: string;
  href?: string;
  fee?: string;
  feeSuffix?: string;
  curriculum?: string;
  boarding?: string;
  rating?: string;
  cricosLabel?: string;
  topRatedLabel?: string;
  shortlistAddLabel?: string;
  shortlistRemoveLabel?: string;
  className?: string;
}

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'marketing' | 'wide';
  children: ReactNode;
}

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  eyebrowTone?: 'default' | 'brand' | 'trust' | 'featured';
  heading: ReactNode;
  subheading?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'md' | 'lg';
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export interface StatusBadgeProps {
  tone?: 'brand' | 'trust' | 'featured' | 'danger' | 'muted' | null;
  size?: 'sm' | 'md' | null;
  children: ReactNode;
  className?: string;
}

export type TrustVariant = 'cricos' | 'qeac' | 'claimed';

export interface TrustBadgeProps {
  variant: TrustVariant;
  label: ReactNode;
  className?: string;
}
