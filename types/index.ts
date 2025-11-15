// Type definitions for website components

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroSection {
  title: string | React.ReactNode;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  video?: string; // Add this line
  videoPoster?: string; // Optional poster image for video
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Section {
  id: string;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  className?: string;
}

export interface FooterLink {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
