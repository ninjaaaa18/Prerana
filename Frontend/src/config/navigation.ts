import type { IconName } from '@/components/ui/icon';

export type Role = 'student' | 'teacher' | 'parent' | 'admin';

export interface NavItem {
  label: string;
  route: string;
  icon: IconName;
  end?: boolean;
  roles?: Role[] | 'all';
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_VERSION = 'v0.1.0';

export const PRIMARY_NAV_SECTIONS: NavSection[] = [
  {
    label: 'Learn',
    items: [
      { label: 'Home', route: '/app', icon: 'Home', end: true },
      { label: 'Subjects', route: '/app/subjects', icon: 'BookOpen' },
      { label: 'AI Studio', route: '/app/ai-studio', icon: 'Sparkles' },
      { label: 'Library', route: '/app/library', icon: 'Library' },
      {
        label: 'Assessments',
        route: '/app/assessments',
        icon: 'ClipboardCheck',
        roles: ['student', 'teacher', 'parent', 'admin'],
      },
      { label: 'Progress', route: '/app/progress', icon: 'BarChart3' },
    ],
  },
];

export const MANAGE_NAV_SECTIONS: NavSection[] = [
  {
    label: 'Manage',
    items: [
      { label: 'Teach', route: '/app/teach', icon: 'Presentation', roles: ['teacher', 'admin'] },
      { label: 'Admin Console', route: '/app/admin', icon: 'Shield', roles: ['admin'] },
    ],
  },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', route: '/app', icon: 'Home', end: true },
  { label: 'Subjects', route: '/app/subjects', icon: 'BookOpen' },
  { label: 'AI Studio', route: '/app/ai-studio', icon: 'Sparkles' },
  { label: 'Progress', route: '/app/progress', icon: 'BarChart3' },
];

export const filterSectionsForRole = (sections: NavSection[], role?: Role): NavSection[] => {
  if (!role) return sections;
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const allowed = item.roles ?? 'all';
        return allowed === 'all' || allowed.includes(role);
      }),
    }))
    .filter((section) => section.items.length > 0);
};

export const BREADCRUMB_LABELS: Record<string, string> = {
  subjects: 'Subjects',
  chapters: 'Chapters',
  'ai-studio': 'AI Studio',
  chat: 'Chat',
  library: 'Library',
  assessments: 'Assessments',
  take: 'Take',
  results: 'Results',
  progress: 'Progress',
  teach: 'Teach',
  lessons: 'Lessons',
  new: 'New',
  edit: 'Edit',
  classes: 'Classes',
  parent: 'Parent',
  children: 'Children',
  activity: 'Activity',
  admin: 'Admin Console',
  settings: 'Settings',
  profile: 'Profile',
};
