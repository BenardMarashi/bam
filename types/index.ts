export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  category: 'ecommerce' | 'webapp' | 'ai';
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Locale = 'sq' | 'en';