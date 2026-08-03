import type { IconName } from '@/components/ui/icon';

export interface NavItem {
  label: string;
  route: string;
  icon: IconName;
  end?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const PRIMARY_NAV_SECTIONS: NavSection[] = [
  {
    label: 'Learn',
    items: [
      { label: 'Home', route: '/app', icon: 'Home', end: true },
      { label: 'Subjects', route: '/app/subjects', icon: 'BookOpen' },
      { label: 'AI Studio', route: '/app/ai-studio', icon: 'Sparkles' },
      { label: 'Library', route: '/app/library', icon: 'Library' },
      { label: 'Progress', route: '/app/progress', icon: 'BarChart3' },
    ],
  },
];

export const SECONDARY_NAV_SECTIONS: NavSection[] = [
  {
    label: 'Account',
    items: [{ label: 'Settings', route: '/app/settings', icon: 'Settings' }],
  },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', route: '/app', icon: 'Home', end: true },
  { label: 'Subjects', route: '/app/subjects', icon: 'BookOpen' },
  { label: 'AI Studio', route: '/app/ai-studio', icon: 'Sparkles' },
  { label: 'Progress', route: '/app/progress', icon: 'BarChart3' },
];
